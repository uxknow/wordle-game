// export const encodedWord = (word: string) => {
//   const hexString = [...word]
//     .map((char) => char.charCodeAt(0).toString(16))
//     .join('');
    
//     return btoa(hexString)
//   }
  
//   export const decodedWord = (encWord: string) => {
//     const hexString = atob(encWord)
    
//     const matches = hexString.match(/.{1,2}/g);
//     const hexPairs = matches !== null ? matches : ''
//     return [...hexPairs]
//      .map((hex) => String.fromCharCode(parseInt(hex, 16)))
//      .join('')
//   }

export const encodedWord = (word: string) => {
  const encodedString = encodeURIComponent(word);
  return btoa(encodedString);
}

export const decodedWord = (encWord: string) => {
  const decodedString = atob(encWord);
  const decodedWord = decodeURIComponent(decodedString);
  return decodedWord;
}
