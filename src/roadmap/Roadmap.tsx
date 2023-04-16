import { useContext } from "react";
import FeedbackList from "./FeedbackList";
import { FeedbackContext } from "../context/FeedbackContextProvider";
import { FeedbackAtom } from "../Atoms";
import { useAtom } from "jotai";

export default function Roadmap() {
  //const { feedbacks } = useContext(FeedbackContext);
  const [feedbacks] = useAtom(FeedbackAtom);

  //console.log(data);
  return (
    <div className="bg:gray-50">
      <div className="flex flex:row jc:space-between ai:center">
        <div>
          <a href="/">Go Back</a>
          <h1>Roadmap</h1>
        </div>
        <button
          className=""
          key={""}
          onClick={(): void => {
            //onClickHandler("");
          }}
        >
          {" "}
          + Add Feedback{" "}
        </button>
      </div>
      <div className="flex flex:row jc:space-between ">
        <div>
          <FeedbackList
            selectSort="Most Upvotes"
            category="all"
            status="planned"
          />
        </div>
        <div>
          <FeedbackList
            selectSort="Most Upvotes"
            category="all"
            status="in-progress"
          />
        </div>
        <div>
          <FeedbackList
            selectSort="Most Upvotes"
            category="all"
            status="live"
          />
        </div>
        <div></div>
      </div>
    </div>
  );
}
