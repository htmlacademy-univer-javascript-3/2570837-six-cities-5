import { State } from '../../types/state';
import { SortOptions, NameSpace } from '@const';

export const getCity = (state: State): string => state[NameSpace.App].city;
export const getSortOption = (state: State): SortOptions => state[NameSpace.App].sortOption;
