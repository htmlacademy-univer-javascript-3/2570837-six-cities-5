import { City } from './city';
import {Location} from './location';

export type Offer = {
  id: string;
  title: string;
  price: number;
  type: string;
  previewImage: string;
  isPremium: boolean;
  rating: number;
  isFavorite: boolean;
  city: City;
  location: Location;
};

export type Offers = Offer[];
