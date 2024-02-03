import { buildGrid } from "./buildGrid";
import "./styles.css"

const playerGrid = document.querySelector("#playerGrid");
const computerGrid = document.querySelector("#computerGrid");

buildGrid(playerGrid);
buildGrid(computerGrid);