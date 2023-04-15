import React, { useEffect, useState } from "react";

type DropDownProps = {
  sorts: string[];
  showDropDown: boolean;
  toggleDropDown: Function;
  sortSelection: Function;
  selectSort: String;
};

const DropDown: React.FC<DropDownProps> = ({
  sorts,
  sortSelection,
  selectSort
}: DropDownProps): JSX.Element => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  /**
   * Handle passing the sort type
   * back to the parent component
   *
   * @param sort  The selected sort type
   */
  const onClickHandler = (sort: string): void => {
    sortSelection(sort);
  };

  useEffect(() => {
    setShowDropDown(showDropDown);
  }, [showDropDown]);

  return (
    <>
      <div className={showDropDown ? "dropdown" : "dropdown active"}>
        {sorts.map(
          (sort: string, index: number): JSX.Element => {
            return (
              <p
                key={index}
                onClick={(): void => {
                  onClickHandler(sort);
                }}
              >
                {sort}
                {selectSort !== null ? (
                  sort === selectSort ? (
                    <img
                      src="/assets/shared/icon-check.svg"
                      alt="test"
                      className="h:10 w:10"
                    />
                  ) : null
                ) : null}
              </p>
            );
          }
        )}
      </div>
    </>
  );
};

export default DropDown;
