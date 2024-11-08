import { City } from './city';
import {Location} from './location';

export type Offer = {
  id: string;
  title: string;
  price: number;
  type: string;
  imgPath: string;
  isPremium: boolean;
  starsCount: number;
  isBookmarked: boolean;
  city: City;
  location: Location;
};

export type Offers = Offer[];
