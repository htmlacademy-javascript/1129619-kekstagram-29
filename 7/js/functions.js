// const getStringLength = (text, maxLength) => text.length <= maxLength;

// const checkPalindrome = (text) => {
//   const firsText = text.replaceAll(' ', '').toLowerCase();
//   let secondText = '';
//   for (let i = firsText.length - 1; i >= 0; i--) {
//     secondText += firsText[i];
//   }
//   return firsText === secondText;
// };

// const getNumber = (material) => {
//   let result = '';
//   for (const el of material.toString()) {
//     if (!Number.isNaN(parseInt(el, 10))) {
//       result += el;
//     }
//   }
//   return +result !== 0 ? +result : NaN;
// };

// getNumber();
// checkPalindrome();
// getStringLength();


// const getConvertToMinutes = (time) => {
//   const result = parseInt(time.split(':')[0], 10) * 60 + parseInt(time.split(':')[1], 10);
//   return result;
// };

// const getMeetResult = (starDay, endDay, startMeet, meetTime) => {
//   const minutesMeeting = getConvertToMinutes(startMeet) + meetTime;
//   const minutesEndDay = getConvertToMinutes(endDay);
//   const minutesStartDay = getConvertToMinutes(starDay);

//   return minutesEndDay - minutesMeeting >= 0 && minutesStartDay < minutesMeeting;
// };

// getMeetResult();

