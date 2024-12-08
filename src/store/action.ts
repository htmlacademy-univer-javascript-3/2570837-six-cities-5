import { createAction } from '@reduxjs/toolkit';
import { Offers } from '../types/offer';
import { Reviews } from '../types/review';
import { FullOffers } from '../types/fullOffer';
import { SortOptions, AuthorizationStatus } from '@const';


export const setOffersList = createAction<Offers>('offers/setOffersList');
export const setReviews = createAction<Reviews>('reviews/setReviews');
export const setFullOffers = createAction<FullOffers>('offers/setFullOffers');
export const changeCity = createAction<string>('city/changeCity');
export const setSortOption = createAction<SortOptions>('setSortOption');
export const setAuthorizationStatus = createAction<AuthorizationStatus>('auth/setStatus');
export const setError = createAction<string | null>('setError');
export const setUserEmail = createAction<string>('setUserEmail');
export const setOffersDataLoadingStatus = createAction<boolean>('setOffersDataLoadingStatus');
