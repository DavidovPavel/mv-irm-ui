import * as _moment from 'moment';
import { Moment } from 'moment';

const moment = _moment;

type optionType = {
  [key: string]: string | number;
};

export const getOptionsFromDictionary = (dict: optionType) =>
  Object.keys(dict)
    .filter((k) => typeof dict[k] === 'string')
    .map((k) => ({ Id: +k, Name: `${dict[k]}` }));

export const clearEmpty = <T>(value: any, source: T): T => {
  return Object.keys(value).reduce<T>(
    (p, c) =>
      Array.isArray(value[c])
        ? value[c].length
          ? { ...p, [c]: value[c] }
          : { ...p }
        : value[c]
        ? { ...p, [c]: value[c] }
        : { ...p },
    source
  );
};

export const dateToString = (value: Moment | string): string | null => {
  const dateMmnt = moment(value);
  return dateMmnt.isValid() ? dateMmnt.format() : null;
};
