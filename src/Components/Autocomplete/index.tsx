import { FunctionComponent, ChangeEvent } from "react";
import "./styles.css";

interface Props {
  search: string;
  options: string[];
  loading: boolean;
  setSearch: (search: string) => void;
}

const Autocomplete: FunctionComponent<Props> = ({
  search,
  options,
  loading,
  setSearch,
}) => {
  // updating search input
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value);
  };

  // selecting option on click
  const handleClickOption = (option: string) => {
    setSearch(option);
  };

  return (
    <div className="autocomplete">
      <input
        type="text"
        value={search}
        placeholder="Search here"
        onChange={handleInputChange}
        className="input"
      />
      {loading ? (
        <div className="loader" />
      ) : (
        options.length > 0 && (
          <ul className="options">
            {options.map((option, key) => (
              <li
                key={key}
                onClick={() => handleClickOption(option)}
                className="option"
              >
                {option}
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
};

export default Autocomplete;
