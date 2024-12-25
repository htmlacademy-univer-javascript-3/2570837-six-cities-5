import {State} from '../../types/state';
import { Offers} from '../../types/offer';
import { FullOffer } from 'src/types/fullOffer';
import {NameSpace} from '@const';
import { Reviews } from '../../types/review';

export const getFullOffer = (state: State): FullOffer | null => state[NameSpace.Offer].offer;
export const getNearbyOffers = (state: State): Offers => state[NameSpace.Offer].nearbyOffers;
export const getReviews = (state: State): Reviews => state[NameSpace.Offer].reviews;
export const getOfferLoadingStatus = (state: State): boolean => state[NameSpace.Offer].isLoading;
