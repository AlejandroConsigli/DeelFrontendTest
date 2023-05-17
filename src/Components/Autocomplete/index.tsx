import { FunctionComponent, ChangeEvent } from "react";
import "./styles.css";

interface Props {
  search: string;
  options: string[];
  setSearch: (search: string) => void;
}

const Autocomplete: FunctionComponent<Props> = ({ options, setSearch }) => {
  // updating search input
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value);
  };

  return (
    <div className="autocomplete">
      <input
        type="text"
        name=""
        placeholder="Search here"
        onChange={handleInputChange}
        className="input"
      />
      {options.length > 0 && (
        <ul className="options">
          {options.map((option, key) => (
            <li key={key} className="option">
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
