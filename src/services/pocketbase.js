import PocketBase from "pocketbase";

const pocketbase = new PocketBase("https://ipfx.onrender.com"); //TODO

pocketbase.autoCancellation(false);

export default pocketbase;
