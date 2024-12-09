import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Offers, Offer } from '../types/offer';
import { setOffersList, setAuthorizationStatus, setOffersDataLoadingStatus, setError, setUserEmail, setFavoriteOffers, addFavoriteOffer, removeFavoriteOffer } from '@store/action';
import {saveToken, dropToken} from '@services/token';
import {APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR} from '@const';
import {AuthData} from '../types/auth-data';
import { UserData } from '../types/user-data';
import { store } from './index';


export const clearError = createAsyncThunk(
  'clearError',
  () => {
    setTimeout(() => store.dispatch(setError(null)), TIMEOUT_SHOW_ERROR);
  }
);

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoadingStatus(true));
    const {data} = await api.get<Offers>(APIRoute.Offers);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(setOffersList(data));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const response = await api.get(APIRoute.Login);
      const data = response.data as { email: string };
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      dispatch(setUserEmail(data.email));
    } catch {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({email: email, password}, {dispatch, extra: api}) => {
    const response = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(response.data.token);
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(setUserEmail(email));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
  },
);

export const fetchFavoriteOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavoriteOffers',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Offers>(APIRoute.Favorite);
    dispatch(setFavoriteOffers(data));
  },
);

export const changeFavoriteAction = createAsyncThunk<{ offerId: string; status: number }, { offerId: string; status: number }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/changeFavorite',
  async ({ offerId, status }, {dispatch, extra: api }) => {
    const {data} = await api.post<Offer>(`${APIRoute.Favorite}/${offerId}/${status}`);
    if (status === 1) {
      dispatch(addFavoriteOffer(data));
    } else {
      dispatch(removeFavoriteOffer(data.id));
    }
    return { offerId, status };
  },
);
