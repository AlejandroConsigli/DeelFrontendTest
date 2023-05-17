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

  // highlighting search coincidence
  const highlightingOption = (option: string) => {
    const regex = new RegExp(search, "gi");
    return option.replace(regex, (result) => `<strong>${result}</strong>`);
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
                dangerouslySetInnerHTML={{ __html: highlightingOption(option) }}
              />
            ))}
          </ul>
        )
      )}
    </div>
  );
};

export default Autocomplete;
