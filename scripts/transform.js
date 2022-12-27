import fs from "fs";

const content = fs.readFileSync("scripts/data/wordle-eng.txt", "utf-8");
const arrayData = content.split(/\r?\n/);

fs.writeFileSync("src/data/wordle-eng.json", JSON.stringify(arrayData));
