import dictionary from "../data/wordle-eng.json";

export const isWord = (word) => {
  return dictionary.some((elem) => elem.toLowerCase().indexOf(word) >= 0);
};

export const getRandomWord = () => {
  const index = Math.floor(Math.random() * dictionary.length);
  return dictionary.find((_, wordIndex) => wordIndex === index); // dictionary[index]
};
