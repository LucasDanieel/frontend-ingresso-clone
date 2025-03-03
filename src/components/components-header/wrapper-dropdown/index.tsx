import { ReactNode } from "react";
import "./styles.scss";

type WrapperDropdownProps = {
  left: number;
  children: ReactNode;
};

const WrapperDropdown = ({ left, children }: WrapperDropdownProps) => {
  return (
    <div className="container-dropdown" data-testid="dropdown-component" style={{ left: left }}>
      <div className="dropdown">
        {children}
        <span className="icon-arrow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            className="bi bi-caret-up-fill"
            viewBox="0 0 16 16"
          >
            <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default WrapperDropdown;
