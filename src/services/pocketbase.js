import PocketBase from "pocketbase";

const pocketbase = new PocketBase(
  process.env.NODE_ENV === "development"
    ? "http://localhost:8090"
    : window.location.origin,
);

pocketbase.autoCancellation(false);

export default pocketbase;
