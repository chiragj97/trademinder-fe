import { atom } from 'recoil';

export const mortgageState = atom({
    key: 'mortgageState', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (if this key is not in the Recoil store)
  });
  