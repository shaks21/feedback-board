import React, { useContext, useEffect } from "react";
import FeedbackDetailPanel from "./FeedbackDetailPanel";
import { FeedbackContext } from "./context/FeedbackContextProvider";
import { useAtom } from "jotai";
import { useLocation } from "react-router-dom";
import { useParams, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FeedbackAtom, DetailAtom, PrevPageAtom } from "../Atoms";
//import LimitedTextarea from "./LimitedTextarea";

export default function FeedbackDetail() {
  const [searchParams] = useSearchParams();
  const idParam = searchParams.get("id"); // "1234"

  //const { feedbacks } = useContext(FeedbackContext);
  const [feedbacks] = useAtom(FeedbackAtom);
  const [detailAtom, setDetailAtom] = useAtom(DetailAtom);
  const [prevPageAtom, setPrevPageAtom] = useAtom(PrevPageAtom);

  let navigate = useNavigate();
  const editFeedbackClick = () => {
    //setDetailAtom(productRequest.id);
    setPrevPageAtom("/feedback-details/");
    let path = `/edit-feedback/`;
    navigate(path);
  };

  const LimitedTextarea = ({ rows, cols, value, limit }) => {
    const [content, setContent] = React.useState(value.slice(0, limit));

    const setFormattedContent = React.useCallback(
      (text) => {
        setContent(text.slice(0, limit));
      },
      [limit, setContent]
    );

    return (
      <>
        <textarea
          rows={rows}
          cols={cols}
          onChange={(event) => setFormattedContent(event.target.value)}
          value={content}
          placeholder="Type your comment here"
        />
        <div className="flex flex:row jc:space-between ai:center">
          <p>{limit - content.length} Characters left</p>
          <button
            className=""
            key={"post"}
            onClick={(): void => {
              //onClickHandler("");
            }}
          >
            {" "}
            Post Comment{" "}
          </button>
        </div>
      </>
    );
  };

  //export default LimitedTextarea;

  // console.log(prevPageAtom);
  return (
    <div className="bg:gray-50">
      <div className="flex flex:row jc:space-between ai:center">
        <div>
          {/* <a href="/roadmap/">Go Back</a> */}
          <a href={prevPageAtom}>Go Back</a>
        </div>
        <button
          className=""
          key={""}
          onClick={(): void => {
            editFeedbackClick();
          }}
        >
          {" "}
          Edit Feedback{" "}
        </button>
      </div>
      <div className="flex flex:row jc:space-between ">
        <div>
          <FeedbackDetailPanel
            selectSort="Most Upvotes"
            category="all"
            status="planned"
          />
        </div>
      </div>
      <div>
        <p className="heading">Add Comment</p>
        <div>
          <LimitedTextarea rows="3" cols="50" limit={250} value="" />
        </div>
      </div>
    </div>
  );
}
