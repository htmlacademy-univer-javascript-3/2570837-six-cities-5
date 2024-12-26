import { store } from '@store/index';
import {Reviews} from './review';
import {Offers} from './offer';
import { FullOffer } from './fullOffer';
import {AuthorizationStatus, SortOptions} from '@const';
import {UserData} from './user-data';

export type AppData = {
  city: string;
  sortOption: SortOptions;
}

export type OfferData = {
  offer: FullOffer | null;
  nearbyOffers: Offers;
  reviews: Reviews;
  isLoading: boolean;
}

export type OffersData = {
  offers: Offers;
  isLoading: boolean;
}

export type UserInfo = {
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
  favoriteOffers: Offers;
  favoriteOffersCount: number;
}

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
