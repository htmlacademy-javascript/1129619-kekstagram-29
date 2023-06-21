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
    if (!Number.isNaN(parseInt(el, 10))) {
      result += el;
    }
  }
  return +result !== 0 ? +result : NaN;
};

getNumber();
checkPalindrome();
getStringLength();


const getTimeFromMins = (meetTime) => {
  const hours = Math.trunc(meetTime / 60);
  const minutes = meetTime % 60;
  return `${hours}:${minutes}`;
};

const getMeetResult = (starDay, endDay, startMeet, meetTime) => {
  const meetHours = getTimeFromMins(meetTime);

  const timeEndMeet = `${Number(startMeet.split(':')[0]) + Number(meetHours.split(':')[0])}:${Number(startMeet.split(':')[1]) + Number(meetHours.split(':')[1])}`;

  const minutesMeeting = timeEndMeet.split(':')[0] * 60 + timeEndMeet.split(':')[1] * 1;
  const minutesEndDay = endDay.split(':')[0] * 60 + endDay.split(':')[1] * 1;

  return minutesEndDay - minutesMeeting > 0;


};

getMeetResult('08:00', '13:20', '12:00', 90);
