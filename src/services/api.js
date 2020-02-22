import axios from "axios";
// axios é biblioteca ausxililar mais completa para consumir api
// em relação ao que já vem por padrão no navegador que se chama 'fetch'
// que serve para consumir um recurso externo via REST
// o fatch, por exemplo, não permite definir uma baseURL

const api = axios.create({
  baseURL: "https://api.github.com",
});

export default api;
