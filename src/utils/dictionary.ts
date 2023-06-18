import enDictionary from "../data/wordle-eng.json";
import uaDictionary from '../data/wordle-ua.json';

export const isWord = (word: string, lang: string) => {
  const dictionary = lang === 'en' ? enDictionary : uaDictionary

  return dictionary.some((elem) => elem.toLowerCase().indexOf(word) >= 0);
};

export const getRandomWord = (lang: string) => {
  const dictionary = lang === 'en' ? enDictionary : uaDictionary

  const index = Math.floor(Math.random() * dictionary.length);
  return dictionary.find((_, wordIndex) => wordIndex === index); // dictionary[index]
};
