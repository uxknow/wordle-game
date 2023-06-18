import fs from "fs";

const uaContent = fs.readFileSync('scripts/data/wordle-ua.txt', 'utf-8')
const uaData = uaContent.split(/\r?\n/)

fs.writeFileSync('src/data/wordle-ua.json', JSON.stringify(uaData))

const enContent = fs.readFileSync("scripts/data/wordle-eng.txt", "utf-8");
const enData = enContent.split(/\r?\n/);

fs.writeFileSync("src/data/wordle-eng.json", JSON.stringify(enData));
