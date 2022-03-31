function timeDiffCalc(date) {
  const timeDiff = parseInt(new Date().getTime() - date.getTime());
  const oneMin = 1000 * 60;
  const oneHour = oneMin * 60;
  const oneDay = oneHour * 24;
  const oneWeek = oneDay * 7;
  if (timeDiff < oneMin) {
    return Math.floor(timeDiff / 1000) + '초 전';
  } else if (timeDiff > oneMin && timeDiff < oneHour) {
    return Math.floor(timeDiff / oneMin) + '분 전';
  } else if (timeDiff > oneHour && timeDiff < oneDay) {
    return Math.floor(timeDiff / oneHour) + '시간 전';
  } else if (timeDiff > oneDay && timeDiff < oneWeek) {
    return Math.floor(timeDiff / oneDay) + '일 전';
  } else {
    return date.toISOString().replace('T', ' ').replace(/ ..*/, '');
  }
}

export default timeDiffCalc;
