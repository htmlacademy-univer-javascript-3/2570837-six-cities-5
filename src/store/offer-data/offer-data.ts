import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '@const';
import { OfferData } from '../../types/state';
import { FullOffer } from '../../types/fullOffer';
import { Review, Reviews } from '../../types/review';
import { Offers } from '../../types/offer';


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
    setFullOffer: (state, action: PayloadAction<FullOffer>) => {
      state.offer = action.payload;
    },
    setComments: (state, action: PayloadAction<Reviews>) => {
      state.reviews = action.payload;
    },
    addComment: (state, action: PayloadAction<Review>) => {
      state.reviews.push(action.payload);
    },
    setLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setNearbyOffers: (state, action: PayloadAction<Offers>) => {
      state.nearbyOffers = action.payload;
    }
  },
});

export const { setFullOffer, setComments, addComment, setLoadingStatus, setNearbyOffers } = offerData.actions;
export const offerDataReducer = offerData.reducer;

