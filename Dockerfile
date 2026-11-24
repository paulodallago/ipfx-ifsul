# Stage 1: Build the React frontend
FROM node:24-alpine AS frontend-builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY jsconfig.json ./
COPY public ./public
COPY src ./src

RUN npx react-scripts build

# Stage 2: Build the Go / PocketBase backend binary
FROM golang:1.27-alpine AS backend-builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY main.go ./
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o /app/ipfx-server .

# Stage 3: Minimal production runtime
FROM alpine:latest

RUN apk add --no-cache ca-certificates tzdata

WORKDIR /app

COPY --from=backend-builder /app/ipfx-server /app/ipfx-server
COPY --from=frontend-builder /app/build /app/build

RUN mkdir -p /app/pb_data

EXPOSE 8090

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:8090/api/health || exit 1

ENTRYPOINT ["/app/ipfx-server"]
CMD ["serve", "--http=0.0.0.0:8090", "--dir=/app/pb_data"]
