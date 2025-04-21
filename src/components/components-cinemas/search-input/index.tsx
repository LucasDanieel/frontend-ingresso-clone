import "./styles.scss";
import { IconSearch } from "../../../icons";
import { ChangeEvent, forwardRef, RefObject } from "react";

type searchCinemasProps = {
  placeholder: string;
  value: string;
  hiddenIcon?: boolean;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  handleBlur?: () => void;
  ref?: RefObject<HTMLInputElement>;
};

const SearchInput = forwardRef<HTMLInputElement, searchCinemasProps>(
  ({ placeholder, value, hiddenIcon = false, handleChange, handleBlur }, ref) => {
    return (
      <div className="wrapper-search-input">
        <div className="search-input">
          <input type="text" value={value} placeholder={placeholder} onChange={handleChange} onBlur={handleBlur} ref={ref} />
        </div>
        {!hiddenIcon && (
          <div className="search-icon">
            <IconSearch />
          </div>
        )}
      </div>
    );
  }
);

export default SearchInput;
