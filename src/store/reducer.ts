import { createReducer } from '@reduxjs/toolkit';
import { setOffersList, changeCity, setReviews, setFullOffers, setSortOption, setError, setOffersDataLoadingStatus, setAuthorizationStatus } from './action';
import { Offers } from '../types/offer';
import { Reviews } from '../types/review';
import { FullOffers } from '../types/fullOffer';
import { AuthorizationStatus, SortOptions } from '@const';


type StateType = {
  city: string;
  offersList: Offers;
  reviews: Reviews;
  fullOffers: FullOffers;
  sortOption: SortOptions;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  isOffersDataLoading: boolean;
};

const initialState: StateType = {
  city: 'Paris',
  offersList: [],
  reviews: [],
  fullOffers: [],
  sortOption: SortOptions.Popular,
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: false,
  error: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, { payload }) => {
      state.city = payload;
    })
    .addCase(setOffersList, (state, action) => {
      state.offersList = action.payload;
    })
    .addCase(setReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(setFullOffers, (state, action) => {
      state.fullOffers = action.payload;
    })
    .addCase(setSortOption, (state, { payload }) => {
      state.sortOption = payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    });
});
