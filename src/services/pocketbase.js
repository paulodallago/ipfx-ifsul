import PocketBase from "pocketbase";

const pocketbase = new PocketBase("http://127.0.0.1:8090");

pocketbase.autoCancellation(false);

export default pocketbase;
