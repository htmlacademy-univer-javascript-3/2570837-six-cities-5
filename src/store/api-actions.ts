import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Offers, Offer } from '../types/offer';
import {saveToken, dropToken} from '@services/token';
import {APIRoute, AuthorizationStatus, AppRoute} from '@const';
import {AuthData} from '../types/auth-data';
import { UserData } from '../types/user-data';
import { Review, Reviews } from '../types/review';
import { FullOffer } from '../types/fullOffer';
import {setFullOffer, setComments, addComment, setLoadingStatus, setNearbyOffers} from './offer-data/offer-data';
import {loadOffers, setOffersLoadingStatus, updateFavorites} from './offers-data/offers-data';
import {setAuthorizationStatus, setUserData, setFavoriteOffers, setFavoritesCount,} from './user-info/user-info';
import { redirectToRoute } from './action';


export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_, { dispatch, extra: api }) => {
    dispatch(setOffersLoadingStatus(true));
    try {
      const response = await api.get<Offers>(APIRoute.Offers);
      dispatch(loadOffers(response.data));
    } finally {
      dispatch(setOffersLoadingStatus(false));
    }
  }
);

export const fetchReviewsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (offerId, { dispatch, extra: api }) => {
    const { data } = await api.get<Reviews>(`${APIRoute.Comments}/${offerId}`);
    dispatch(setComments(data));
  },
);

export const fetchNearbyOffersAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchNearbyOffers',
  async (offerId, { dispatch, extra: api }) => {
    const { data } = await api.get<Offers>(`${APIRoute.Offers}/${offerId}/nearby`);
    dispatch(setNearbyOffers(data.slice(0, 3)));
  },
);

export const fetchFullOfferAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffer',
  async (offerId, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<FullOffer>(`${APIRoute.Offers}/${offerId}`);
      dispatch(setFullOffer(data));
      dispatch(fetchNearbyOffersAction(offerId));
      dispatch(fetchReviewsAction(offerId));
    } catch (error) {
      dispatch(redirectToRoute(AppRoute.NotFound));
    } finally {
      dispatch(setLoadingStatus(false));
    }
  },
);

export const fetchFavoriteOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavorites',
  async (_, {dispatch, extra: api}) => {
    const {data} = await api.get<Offers>(`${APIRoute.Favorite}`);
    dispatch(setFavoriteOffers(data));
    dispatch(setFavoritesCount(data.length));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_, { dispatch, extra: api }) => {
    try {
      const {data} = await api.get<UserData>(APIRoute.Login);
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      dispatch(setUserData(data));
      dispatch(fetchFavoriteOffersAction());
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
  async ({ email, password }, { dispatch, extra: api }) => {
    const response = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(response.data.token);
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(setUserData(response.data));
    dispatch(fetchOffersAction());
    dispatch(fetchFavoriteOffersAction());
    dispatch(redirectToRoute(AppRoute.Root));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    dispatch(setUserData(null));
    dispatch(setFavoriteOffers([]));
    dispatch(fetchOffersAction());
    dispatch(redirectToRoute(AppRoute.Root));
  },
);

export const postReviewAction = createAsyncThunk<void, { offerId: string; comment: string; rating: number }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postReview',
  async ({ offerId, comment, rating }, { dispatch, extra: api }) => {
    const { data } = await api.post<Review>(`${APIRoute.Comments}/${offerId}`, { comment, rating });
    dispatch(addComment(data));
  },
);

export const changeFavoriteOffersAction = createAsyncThunk<void,
  { id: string; status: number }, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'data/changeFavorite',
    async ({ id, status }, { dispatch, extra: api }) => {
      const { data } = await api.post<Offer>(`${APIRoute.Favorite}/${id}/${status}`);
      dispatch(updateFavorites({ id: data.id, isFavorite: data.isFavorite }));
      dispatch(fetchFavoriteOffersAction());
    }
  );
