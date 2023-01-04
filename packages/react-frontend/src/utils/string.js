import moment from 'moment';
import * as packet from 'dns-packet';

export function truncateString(str, num) {
  if (str) {
    if (str.length > num) {
      return str.slice(0, num) + '...';
    } else {
      return str;
    }
  }

  return;
}

export function getQueryString(obj) {
  let str = '';

  Object.keys(obj).forEach((key, id) => {
    if (id === 0) {
      str += `?${key}=${obj[key]}`;
    } else {
      str += `&${key}=${obj[key]}`;
    }
  });

  return str;
}

/*
  @param: date (epoch time)
*/
export const getMintString = (date) => {
  const daysGap = moment.unix(date).diff(moment(), 'days');

  if (daysGap < 0) {
    return `(Minted ${moment.unix(date).startOf('day').fromNow()})`;
  } else {
    return `(Mint D-${daysGap})`;
  }
};

/*
  @param: text : text to wrap
  @param: limit : number of characters limit for each line
*/
export const textWrap = (text, limit) => {
  let txt = '';
  let splittedText = text.split(' ');

  let line = 1;
  splittedText.forEach((chunk, id) => {
    if (txt.length > line * limit) {
      txt += chunk + '\r\n';
      line += 1;
    } else {
      txt += chunk + ' ';
    }
  });

  return txt;
};

export function encodeName(name) {
  return '0x' + packet.name.encode(name).toString('hex');
}
