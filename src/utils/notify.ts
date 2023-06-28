import {toast} from 'react-toastify'

export const notify = (word, wordLength, isWord, isRepeatedWord, words) => {
  let msg: string | number = ''
  const lang = localStorage.getItem('i18nextLng')

  if (word.length < wordLength) {
    msg = toast(lang === 'en' ? 'Not enough letters' : "Недостатньо букв")
  } else if (isRepeatedWord(word, words)) {
    msg = toast(lang === 'en' ? "This word already exists, try another" : "Це слово вже є, спробуйте інше");
  } else if (!isWord(word)) {
    msg = toast(lang === 'en' ? "There is no such word in the dictionary, try another" : "У словнику такого слова немає, спробуйте інше")
  }
  return msg
};
