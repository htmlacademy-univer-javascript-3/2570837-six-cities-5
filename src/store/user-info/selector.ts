import {State} from '../../types/state';
import {Offers} from '../../types/offer';
import {AuthorizationStatus, NameSpace} from '@const';
import { UserData } from '../../types/user-data';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getUserInfo = (state: State): UserData | null => state[NameSpace.User].userData;
export const getFavoriteOffers = (state: State): Offers => state[NameSpace.User].favoriteOffers;
export const getFavoriteOffersCount = (state: State): number => state[NameSpace.User].favoriteOffersCount;
