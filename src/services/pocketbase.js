import PocketBase from "pocketbase";

const pocketbase = new PocketBase("http://localhost:8090");

pocketbase.autoCancellation(false);

export default pocketbase;
