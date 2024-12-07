import { useCallback, useState } from 'react';
import { SortOptions } from '@const';

type SortOptionsProps = {
  onSortChange: (option: SortOptions) => void;
};

export default function SortingOptions({ onSortChange }: SortOptionsProps): JSX.Element {
  const [selectedOption, setSelectedOption] = useState(SortOptions.Popular);
  const [isOpen, setIsOpen] = useState(false);

  const handleSortChange = useCallback((option: SortOptions) => {
    setSelectedOption(option);
    onSortChange(option);
    setIsOpen(false);
  }, [onSortChange]);

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
        {Object.values(SortOptions).map((option) => (
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
