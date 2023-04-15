import React, { useState } from "react";
import DropDown2 from "./DropDown2";

type MenuProps = {
  defaultValue: string;
  options: string[];
  selectOption: string;
  changeSelectOption: Function;
};

const Menu2: React.FC<MenuProps> = ({
  defaultValue,
  selectOption,
  options,
  changeSelectOption
}): JSX.Element => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  //const [selectSort, setSelectSort] = useState<string>("Most Upvotes");
  // const sorts = () => {
  //   return ["Most Upvotes", "Least Upvotes", "Most Comments", "Least Comments"];
  // };

  /**
   * Toggle the drop down menu
   */
  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  /**
   * Hide the drop down menu if click occurs
   * outside of the drop-down element.
   *
   * @param event  The mouse event
   */
  const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
    if (event.currentTarget === event.target) {
      setShowDropDown(false);
    }
  };

  /**
   * Callback function to consume the
   * sort type from the child component
   *
   * @param sort  The selected sort type
   */
  // const sortSelection = (sort: string): void => {
  //   setSelectSort(sort);
  // };

  return (
    <>
      <button
        className={showDropDown ? "active" : undefined}
        onClick={(): void => toggleDropDown()}
        onBlur={(e: React.FocusEvent<HTMLButtonElement>): void =>
          dismissHandler(e)
        }
      >
        <div className="capitalize">
          {selectOption
            ? selectOption
            : defaultValue
            ? defaultValue
            : "Select.."}{" "}
        </div>
        {showDropDown && (
          <DropDown2
            options={options}
            showDropDown={false}
            toggleDropDown={(): void => toggleDropDown()}
            changeSelectOption={changeSelectOption}
            selectOption={selectOption}
          />
        )}
        {showDropDown ? (
          <img
            src="/assets/shared/icon-arrow-up.svg"
            alt="test"
            className="h:10 w:10"
          />
        ) : (
          <img
            src="/assets/shared/icon-arrow-down.svg"
            alt="test"
            className="h:10 w:10"
          />
        )}
      </button>
    </>
  );
};

export default Menu2;
