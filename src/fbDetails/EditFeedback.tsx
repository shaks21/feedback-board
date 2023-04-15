import EditFeedbackPanel from "./EditFeedbackPanel";
import { useAtom } from "jotai";
import { FeedbackAtom, DetailAtom, PrevPageAtom } from "../Atoms";

export default function EditFeedback() {
  const [prevPageAtom, setPrevPageAtom] = useAtom(PrevPageAtom);

  // console.log(prevPageAtom);
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
          src="/assets/shared/icon-edit-feedback.svg"
          alt="test"
          className="h:56 w:56"
        />
      </div>

      <div className="flex flex:row jc:space-between ">
        <div>
          <EditFeedbackPanel
            selectSort="Most Upvotes"
            category="all"
            status="planned"
          />
          <div></div>
        </div>
      </div>
      <div className="flex flex:row jc:space-between ai:center">
        <button
          className=""
          key={"delete"}
          onClick={(): void => {
            //onClickHandler("");
          }}
        >
          {" "}
          Delete{" "}
        </button>
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
            key={"save"}
            onClick={(): void => {
              //onClickHandler("");
            }}
          >
            {" "}
            Save Changes{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
