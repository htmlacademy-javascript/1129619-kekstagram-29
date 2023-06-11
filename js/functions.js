const getStringLength = (text, maxLength) => text.length <= maxLength;

const checkPalindrome = (text) => {
  const firsText = text.replaceAll(' ', '').toLowerCase();
  let secondText = '';
  for (let i = firsText.length - 1; i >= 0; i--) {
    secondText += firsText[i];
  }
  return firsText === secondText;
};

const getNumber = (material) => {
  let result = '';
  for (const el of material.toString()) {
    // !Number.isNaN(parseInt(el, 10)) ? result += el : null;
    if (!Number.isNaN(parseInt(el, 10))) {
      result += el;
    }
  }
  return +result !== 0 ? +result : NaN;
};
