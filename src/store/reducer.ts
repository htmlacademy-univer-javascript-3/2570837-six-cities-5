import { createReducer } from '@reduxjs/toolkit';
import { setOffersList, changeCity, setReviews, setFullOffers, setSortOption } from './action';
import { Offers } from '../types/offer';
import { Reviews } from '../types/review';
import { FullOffers } from '../types/fullOffer';
import { offers } from '@mocks/offers';
import { reviews } from '@mocks/reviews';
import { fullOffers } from '@mocks/fullOffers';
import { SortOptions } from '@const';


type StateType = {
  city: string;
  offersList: Offers;
  reviews: Reviews;
  fullOffers: FullOffers;
  sortOption: SortOptions;
};

const initialState: StateType = {
  city: 'Amsterdam',
  offersList: [],
  reviews: [],
  fullOffers: [],
  sortOption: SortOptions.Popular,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, { payload }) => {
      state.city = payload;
    })
    .addCase(setOffersList, (state) => {
      state.offersList = offers;
    })
    .addCase(setReviews, (state) => {
      state.reviews = reviews;
    })
    .addCase(setFullOffers, (state) => {
      state.fullOffers = fullOffers;
    })
    .addCase(setSortOption, (state, { payload }) => {
      state.sortOption = payload;
    });
});
