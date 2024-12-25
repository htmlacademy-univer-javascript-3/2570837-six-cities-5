import { memo, useCallback, useMemo, useState } from 'react';
import { SortOptions } from '@const';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { getSortOption } from '@store/app-data/selector';
import { setSortOption } from '@store/app-data/app-data';

function SortingOptions(): JSX.Element {
  const dispatch = useAppDispatch();
  const selectedOption = useAppSelector(getSortOption);
  const [isOpen, setIsOpen] = useState(false);

  const handleSortChange = useCallback((option: SortOptions) => {
    dispatch(setSortOption(option));
    setIsOpen(false);
  }, [dispatch]);

  const sortOptions = useMemo(() => Object.values(SortOptions), []);

  const toggleDropdown = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={toggleDropdown}
      >
        {selectedOption}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
        {sortOptions.map((option) => (
          <li
            key={option}
            className={`places__option ${option === selectedOption ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => handleSortChange(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
}

const MemoizedSortingOptions = memo(SortingOptions);
export default MemoizedSortingOptions;
