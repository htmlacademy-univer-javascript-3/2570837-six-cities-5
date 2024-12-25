import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '@const';
import { offerDataReducer } from './offer-data/offer-data.ts';
import { offersDataReducer } from './offers-data/offers-data.ts';
import { userReducer } from './user-info/user-info';
import { appDataReducer } from './app-data/app-data.ts';

export const rootReducer = combineReducers({
  [NameSpace.Offer]: offerDataReducer,
  [NameSpace.Offers]: offersDataReducer,
  [NameSpace.User]: userReducer,
  [NameSpace.App]: appDataReducer,
});
