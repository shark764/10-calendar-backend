import { getDisplayN } from '@/utilities/any';
import { getCapitalizeName } from '@/utils';

export const getRoute = (name: string) =>
  `Your route is /auth/login/${getCapitalizeName(name)}`;

export const getRouteN = (n: number) => `route: ${getDisplayN(n)}`;
