const padZero = (str, len) => {
  len = len || 2;
  var zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
}

const dateFormat = (date) => {
  const d = new Date(date)
  return `${padZero(d.getHours(), 2)}:${padZero(d.getMinutes(), 2)} ${padZero(d.getDate(), 2)}.${padZero(d.getMonth() + 1, 2)}.${d.getFullYear()}`
}

export { dateFormat }