import axios from "axios";

export const STRAPI_URL = "http://localhost:1337/api"; //TODO env
export const STRAPI_MEDIA_URL = "http://localhost:1337";

const Axios = axios.create({
  baseURL: STRAPI_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const getSobre = async () => {
  try {
    const response = await Axios.get(`/sobre`);
    return response.data.data;
  } catch (error) {
    let body = { texto: "Erro ao carregar conteúdo: " + error };
    return body;
  }
};

export const getNoticias = async () => {
  try {
    const response = await Axios.get(`/noticias?populate=imagem`);
    return response.data.data;
  } catch (error) {
    let body = { texto: "Erro ao carregar conteúdo: " + error };
    return body;
  }
};
