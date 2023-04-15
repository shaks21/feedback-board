import "@master/css";
import { FeedbackContext } from "../context/FeedbackContextProvider";
import { useContext, useEffect } from "react";
import Menu from "./Menu";
import { FeedbackAtom, PrevPageAtom } from "../Atoms";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

export default function FilterToolbar({
  selectSort,
  sortSelection,
  category,
  suggestionCount,
  suggCountSelection
}): JSX.Element {
  const { feedbacks } = useContext(FeedbackContext);
  //const [feedbacks] = useAtom(FeedbackAtom);
  let suggCount: number = 0;

  const [prevPageAtom, setPrevPageAtom] = useAtom(PrevPageAtom);

  let navigate = useNavigate();
  const createFeedbackClick = () => {
    //setDetailAtom(productRequest.id);
    setPrevPageAtom("/");
    let path = `/create-feedback/`;
    navigate(path);
  };

  feedbacks.productRequests?.map((feedback) => {
    if (feedback.status === "suggestion") {
      if (category === "all") {
        suggCount++;
      } else if (feedback.category === category) {
        suggCount++;
      }
    }
  });
  // console.log("filtertoolbar");
  // console.log(feedbacks);
  // console.log(suggCount);

  useEffect(() => {
    suggCountSelection(suggCount);
  }, [suggCount]);

  return (
    <div className="flex flex:row ai:center jc:space-between">
      <img src="/assets/suggestions/icon-suggestions.svg" alt="test" />

      <p>{suggestionCount} Suggestions</p>

      <Menu selectSort={selectSort} sortSelection={sortSelection} />

      <button
        className=""
        key={""}
        onClick={(): void => {
          createFeedbackClick();
        }}
      >
        {" "}
        + Add Feedback{" "}
      </button>
    </div>
  );
}
