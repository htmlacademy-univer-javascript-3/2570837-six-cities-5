import { NameSpace } from '@const';
import { State } from '../../types/state';
import { Offers } from '../../types/offer';

export const getOffers = (state: State): Offers => state[NameSpace.Offers].offers;
export const getOffersLoadingStatus = (state: State): boolean => state[NameSpace.Offers].isLoading;
