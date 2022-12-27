import dictionary from "../data/wordle-eng.json";

export const isWord = (word) => {
  return dictionary.map((elem) => elem.toLowerCase().indexOf(word) !== -1);
};

export const getRandomWord = () => {
  const index = Math.floor(Math.random() * dictionary.length);
  return dictionary.find((_, wordIndex) => wordIndex === index); // dictionary[index]
};
