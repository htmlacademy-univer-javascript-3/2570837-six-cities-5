import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeCity } from '../../store/action.ts';

type CitiesListProps = {
  cities: string[];
};

export default function CitiesList({ cities }: CitiesListProps): JSX.Element {
  const dispatch = useAppDispatch();
  const selectedCity = useAppSelector((state) => state.city);
  const handleCityChange = (city: string) => {
    dispatch(changeCity(city));
  };


  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li
          key={city}
          className="locations__item"
          onClick={() => handleCityChange(city)}
        >
          <a className={`locations__item-link tabs__item ${selectedCity === city ? 'tabs__item--active' : ''}`} href="#">
            <span>{city}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
