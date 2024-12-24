import { createAction } from '@reduxjs/toolkit';
import { Offers, Offer } from '../types/offer';
import { Reviews, Review } from '../types/review';
import { FullOffers, FullOffer } from '../types/fullOffer';
import { SortOptions, AuthorizationStatus, AppRoute } from '@const';


export const setOffersList = createAction<Offers>('offers/setOffersList');
export const setReviews = createAction<Reviews>('reviews/setReviews');
export const setFullOffers = createAction<FullOffers>('offers/setFullOffers');
export const changeCity = createAction<string>('city/changeCity');
export const setSortOption = createAction<SortOptions>('setSortOption');
export const setAuthorizationStatus = createAction<AuthorizationStatus>('auth/setStatus');
export const setError = createAction<string | null>('setError');
export const setUserEmail = createAction<string>('setUserEmail');
export const setOffersDataLoadingStatus = createAction<boolean>('setOffersDataLoadingStatus');
export const setFavoriteOffers = createAction<Offers>('favorites/setFavoriteOffers');
export const addFavoriteOffer = createAction<Offer>('favorites/addFavoriteOffer');
export const removeFavoriteOffer = createAction<string>('favorites/removeFavoriteOffer');
export const redirectToRoute = createAction<AppRoute>('auth/redirectToRoute');
export const setDetailedOffer = createAction<FullOffer>('offer/setDetailedOffer');
export const setNearbyOffers = createAction<Offers>('offers/setNearbyOffers');
export const addComment = createAction<Review>('comments/addComment');
