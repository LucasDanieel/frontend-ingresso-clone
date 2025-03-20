import { IconSearch } from "../../../icons";
import WrapperDropdown from "../wrapper-dropdown";
import "./styles.scss";

type DropdownSearchProps = {
  left: number;
};

const DropdownSearch = ({ left }: DropdownSearchProps) => {
  return (
    <WrapperDropdown left={left}>
      <div className="container-search" data-testid="search-component">
        <h3>O que você procura?</h3>
        <div className="search-input">
          <input type="text" placeholder="O que você procura?" name="search" />
          <IconSearch />
        </div>
      </div>
    </WrapperDropdown>
  );
};

export default DropdownSearch;
