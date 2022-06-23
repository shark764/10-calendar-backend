import { capitalize } from '@2600hz/commio-native-utilities';

export const getName = (name: string) =>
  `Hello world, I'm ${getCapitalizeName(name)}`;

export const getCapitalizeName = (name: string) => capitalize(name);
