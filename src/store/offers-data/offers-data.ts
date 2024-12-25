import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { OffersData } from '../../types/state.ts';
import { Offers, Offer } from '../../types/offer';

const initialState: OffersData = {
  offers: [],
  isLoading: false,
};

export const offersData = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    loadOffers: (state, action: PayloadAction<Offers>) => {
      state.offers = action.payload;
    },
    setOffersLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    updateOffers: (state, action: PayloadAction<Offer>) => {
      state.offers = state.offers.map((offer) =>
        offer.id === action.payload.id ? action.payload : offer
      );
    },
  },
});

export const { loadOffers, setOffersLoadingStatus, updateOffers } = offersData.actions;
export const offersDataReducer = offersData.reducer;
