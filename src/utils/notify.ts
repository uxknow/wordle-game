import {toast} from 'react-toastify'

export const notify = (word, wordLength, isWord, isRepeatedWord, words) => {
  let msg: string | number = ''

  if (word.length < wordLength) {
    msg = toast('Not enough letters')
  } else if (isRepeatedWord(word, words)) {
    msg = toast("This word already exists, try another");
  } else if (!isWord(word)) {
    msg = toast("There is no such word in the dictionary, try another")
  }
  return msg
};
