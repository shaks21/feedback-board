import { useContext, useEffect, useState } from "react";
import { atom, useAtom } from "jotai";
//import FeedbackList from "./feedback/FeedbackList";
import Sidebar from "./Sidebar";
import { FeedbackContext } from "../context/FeedbackContextProvider";
import FilterToolbar from "./FilterToolbar";
import FeedbackPanel from "./FeedbackPanel";

export default function Dashboard() {
  // Here we access the function to update the todos directly from the react context
  // const { feedbacks, updateFeedbacks } = useContext(FeedbackContext);
  // const [feedbacksAtom, setFeedback] = useAtom(FeedbackAtom);

  const [selectSort, setSelectSort] = useState<string>("Most Upvotes");
  const [category, setCategory] = useState<string>("all");
  const [suggestionCount, setSuggestionCount] = useState<number>(0);

  const suggCountSelection = (count: number): void => {
    setSuggestionCount(count);
  };

  const sortSelection = (sort: string): void => {
    setSelectSort(sort);
  };

  const changeCategory = (cat: string): void => {
    setCategory(cat);
  };

  // useEffect(() => {
  //   const fetchFeedbacks = async () => {
  //     try {
  //       const response = await fetch("/data.json");
  //       const data = await response.json();
  //       //console.log(data);
  //       // Updates the todos globally since the useState variable is inside the react context now.
  //       // This means our todos data is not attached to a particular component thus making it
  //       // globally accessible throughout the app with ease.

  //       updateFeedbacks(data);

  //       //jotai atom
  //       setFeedback(data);
  //     } catch (error) {
  //       console.error("[App::fetchFeedbacks]", error);
  //     }
  //   };

  //   fetchFeedbacks();
  // }, []);

  // console.log("dashboard usecontext");
  // console.log(feedbacks);
  // console.log("dashboard useatom");
  // console.log(feedbacksAtom);

  return (
    <div className="p:4 bg:gray-50 flex flex:row justify-content:center	">
      <Sidebar category={category} changeCategory={changeCategory} />
      <img
        src="/assets/shared/icon-arrow-down.svg"
        alt="test"
        className="h:10 w:10"
      />

      <div className="rightPanel p:4 bg:gray-60">
        <div className="topPanel"></div>
        {
          <FilterToolbar
            selectSort={selectSort}
            sortSelection={sortSelection}
            category={category}
            suggestionCount={suggestionCount}
            suggCountSelection={suggCountSelection}
          />
        }
        <div className="bottomPanel"></div>
        {
          <FeedbackPanel
            selectSort={selectSort}
            category={category}
            suggestionCount={suggestionCount}
          />
          // <FeedbackList
          //   selectSort="Most Upvotes"
          //   category="all"
          //   suggestionCount="6"
          // />
        }
      </div>
    </div>
  );
}
