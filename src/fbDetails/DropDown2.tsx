import React, { useEffect, useState } from "react";

type DropDownProps = {
  options: string[];
  showDropDown: boolean;
  toggleDropDown: Function;
  changeSelectOption: Function;
  selectOption: String;
};

const DropDown2: React.FC<DropDownProps> = ({
  options,
  changeSelectOption,
  selectOption
}: DropDownProps): JSX.Element => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  /**
   * Handle passing the sort type
   * back to the parent component
   *
   * @param sort  The selected sort type
   */
  const onClickHandler = (option: string): void => {
    changeSelectOption(option);
  };

  useEffect(() => {
    setShowDropDown(showDropDown);
  }, [showDropDown]);

  return (
    <>
      <div className={showDropDown ? "dropdown" : "dropdown active"}>
        {options.map(
          (sort: string, index: number): JSX.Element => {
            return (
              <p
                className="capitalize"
                key={index}
                onClick={(): void => {
                  onClickHandler(sort);
                }}
              >
                {sort}{" "}
                {selectOption !== null ? (
                  sort === selectOption ? (
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

export default DropDown2;
