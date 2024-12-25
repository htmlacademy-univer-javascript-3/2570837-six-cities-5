import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { OfferData } from '../../types/state';
import { FullOffer } from '../../types/fullOffer';
import { Review, Reviews } from '../../types/review';
import { Offer, Offers } from '../../types/offer.ts';


const initialState: OfferData = {
  offer: null,
  nearbyOffers: [],
  reviews: [],
  isLoading: false,
};

export const offerData = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {
    setFullOffer: (state, action: PayloadAction<{ fullOffer: FullOffer; nearbyOffers: Offers; reviews: Reviews }>) => {
      state.offer = action.payload.fullOffer;
      state.nearbyOffers = action.payload.nearbyOffers;
      state.reviews = action.payload.reviews;
    },
    addComment: (state, action: PayloadAction<Review>) => {
      state.reviews.push(action.payload);
    },
    setLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    // updateNearbyOffer: (state, action: PayloadAction<Offer>) => {
    //   const index = state.nearbyOffers.findIndex((offer) => offer.id === action.payload.id);
    //   if (index !== -1) {
    //     state.nearbyOffers[index] = action.payload;
    //   }
    // }
    setNearbyOffers: (state, action: PayloadAction<Offer[]>) => {
      state.nearbyOffers = action.payload;
    }
  },
});

export const { setFullOffer, addComment, setLoadingStatus, setNearbyOffers } = offerData.actions;
export const offerDataReducer = offerData.reducer;

