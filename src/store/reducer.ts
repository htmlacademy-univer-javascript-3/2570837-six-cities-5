import { createReducer } from '@reduxjs/toolkit';
import { setOffersList, changeCity, setReviews, setFullOffers } from './action';
import { Offers } from '../types/offer';
import { Reviews } from '../types/review';
import { FullOffers } from '../types/fullOffer';
import { offers } from '@mocks/offers';
import { reviews } from '@mocks/reviews';
import { fullOffers } from '@mocks/fullOffers';


type StateType = {
  city: string;
  offersList: Offers;
  reviews: Reviews;
  fullOffers: FullOffers;
};

const initialState: StateType = {
  city: 'Paris',
  offersList: [],
  reviews: [],
  fullOffers: []
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
    });
});
