import {toast} from 'react-toastify'

export const notify = (word, wordLength, isWord) => {
  const message =
    word.length < wordLength
      ?toast("Not enough letters")
      : !isWord(word)
      ? toast("There is no such word in the dictionary, try another")
      : toast("This word already exists, try another");
      return message
};
