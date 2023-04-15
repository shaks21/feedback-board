import React, { useState } from "react";
import DropDown from "./DropDown";

type MenuProps = {
  selectSort: string;
  sortSelection: Function;
};

const Menu: React.FC<MenuProps> = ({
  selectSort,
  sortSelection
}): JSX.Element => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  //const [selectSort, setSelectSort] = useState<string>("Most Upvotes");
  const sorts = () => {
    return ["Most Upvotes", "Least Upvotes", "Most Comments", "Least Comments"];
  };

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
        <div>{selectSort ? "Sort by: " + selectSort : "Select ..."} </div>
        {showDropDown && (
          <DropDown
            sorts={sorts()}
            showDropDown={false}
            toggleDropDown={(): void => toggleDropDown()}
            sortSelection={sortSelection}
            selectSort={selectSort}
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

export default Menu;
