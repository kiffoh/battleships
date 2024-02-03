import { buildGrid } from "./buildGrid";


const playerGrid = document.querySelector("#playerGrid");
const computerGrid = document.querySelector("#computerGrid");

buildGrid(playerGrid);
buildGrid(computerGrid);