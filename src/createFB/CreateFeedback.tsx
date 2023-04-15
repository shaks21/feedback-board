import { useAtom } from "jotai";
import { FeedbackAtom, DetailAtom, PrevPageAtom } from "../Atoms";
import Menu2 from "../fbDetails/Menu2";
import { useState } from "react";

export default function CreateFeedback() {
  const [prevPageAtom, setPrevPageAtom] = useAtom(PrevPageAtom);
  const [selectCategory, setSelectCategory] = useState<string>();

  const changeSelectCategory = (cat: string): void => {
    setSelectCategory(cat);
  };
  return (
    <div className="bg:gray-50">
      <div>
        <img
          src="/assets/shared/icon-arrow-left.svg"
          alt="test"
          className="h:4 w:8"
        />
        <a href={prevPageAtom}>Go Back</a>
      </div>
      <div>
        <img
          src="/assets/shared/icon-new-feedback.svg"
          alt="test"
          className="h:56 w:56"
        />
      </div>

      <div className="flex flex:row jc:space-between ">
        <div>Create New Feedback</div>
      </div>
      <div className={`flex flex:col `}>
        <p className="heading">Feedback Title</p>
        <p>Add a short, descriptive headline</p>
        <input type="text" />
      </div>
      <div className={`flex flex:col `}>
        <p className="heading">Category</p>
        <p>Choose a category for your feedback</p>
        <Menu2
          defaultValue=""
          options={["feature", "UI", "UX", "enhancement", "bug"]}
          selectOption={selectCategory}
          changeSelectOption={changeSelectCategory}
        />
      </div>

      <div className={`flex flex:col `}>
        <p className="heading">Feedback Detail</p>
        <p>
          Include any specific comments on what should be improved, added, etc.
        </p>
        <textarea
          id="detail"
          name="detail"
          rows="4"
          cols="50"
          defaultValue=""
        />
      </div>
      <div className="flex flex:row jc:space-between ai:center">
        <div>
          {" "}
          <button
            className=""
            key={"cancel"}
            onClick={(): void => {
              //onClickHandler("");
            }}
          >
            {" "}
            Cancel{" "}
          </button>{" "}
          <button
            className=""
            key={"add"}
            onClick={(): void => {
              //onClickHandler("");
            }}
          >
            {" "}
            Add Feedback{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
