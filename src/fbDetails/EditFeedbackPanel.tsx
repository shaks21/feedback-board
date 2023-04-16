import { useContext, useState } from "react";
//import { ReactComponent as UpArrow } from "/public/assets/shared/icon-arrow-up.svg";
import { FeedbackContext } from "../context/FeedbackContextProvider";
import { ProductRequests } from "../models/productRequests.model";
import { FeedbackAtom, DetailAtom } from "../Atoms";
import { useAtom } from "jotai";
import Menu2 from "./Menu2";

function EditFeedbackPanel({ selectSort, category, status }:any): JSX.Element {
  //const { feedbacks } = useContext(FeedbackContext);
  const [feedbacks] = useAtom(FeedbackAtom);
  const [detailAtom] = useAtom(DetailAtom);
  const [selectOption, setSelectOption] = useState<string>();
  const [selectCategory, setSelectCategory] = useState<string>();
  const [selectStatus, setSelectStatus] = useState<string>();

  const changeSelectOption = (option: string): void => {
    setSelectOption(option);
  };
  const changeSelectCategory = (cat: string): void => {
    setSelectCategory(cat);
  };
  const changeSelectStatus = (status: string): void => {
    setSelectStatus(status);
  };

  function countComments(productRequests: any): number {
    let commentsCount = 0;
    if (productRequests.comments != null) {
      for (let i = 0; i < productRequests.comments.length; i++) {
        //console.log(productRequests.comments.length);
        commentsCount++;
        if (productRequests.comments[i].replies != null) {
          //console.log(productRequest.comments[i].replies.length)
          commentsCount += productRequests.comments[i].replies.length;
          //console.log(productRequests.comments[i].replies[0].content);
        }
      }
    }
    //console.log(commentsCount);
    return commentsCount;
  }

  function getFeedbackCount(productRequests: any, status: string, cat: string) {
    let suggCount: number = 0;
    feedbacks.productRequests?.forEach((feedback:any) => {
      if (feedback.status === status) {
        if (category === "all") {
          suggCount++;
        } else if (feedback.category === cat) {
          suggCount++;
        }
      }
    });
    //console.log(suggCount);
    return suggCount;
  }

  function NoFeedback(): JSX.Element {
    return (
      <div>
        <img src="/assets/suggestions/illustration-empty.svg" alt="test" />

        <p>There is no feedback yet.</p>
        <p>
          Got a suggestion? Found a bug that needs to be squashed? We love
          hearing about new ideas to improve our app.
        </p>
        <button
          className=""
          key={""}
          // onClick={(): void => {
          //   //onClickHandler("");
          // }}
        >
          {" "}
          + Add Feedback{" "}
        </button>
      </div>
    );
  }

  const UpVoteBtnClicked = (props:any) => {
    const { item } = props;
    //console.log(item);
    const [isClicked, setIsClicked] = useState(false);
    const handleClick = () => {
      setIsClicked(!isClicked);
    };

    return (
      <div>
        <button
          onClick={handleClick}
          className={isClicked ? "active" : undefined}
        >
          {/* {isClicked ? <UpArrow stroke="white" /> : <UpArrow stroke="blue" />} */}
          {isClicked ? item + 1 : item}
        </button>
        <br />
        <br />
      </div>
    );
  };

  // We declare the return type of the function which is a JSX (html + js) element
  function FeedbackCard({
    productRequest
  }: {
    productRequest: ProductRequests;
  }): JSX.Element {
    const commentCount: number = countComments(productRequest);

    return (
      <div>
        <div>
          <p>Editing '{productRequest.title}'</p>
        </div>
        <div className={` jc:center ai:center bg-color:grey b:2|solid|blue-40`}>
          <div className={`flex flex:col `}>
            <p className="heading">Feedback Title</p>
            <p>Add a short, descriptive headline</p>
            <input type="text" defaultValue={productRequest.title} />
          </div>
          <div className={`flex flex:col `}>
            <p className="heading">Category</p>
            <p>Choose a category for your feedback</p>
            <Menu2
              defaultValue={productRequest.category}
              options={["feature", "UI", "UX", "enhancement", "bug"]}
              selectOption={selectCategory?selectCategory:""}
              changeSelectOption={changeSelectCategory}
            />
          </div>
          <div className={`flex flex:col `}>
            <p className="heading">Update Status</p>
            <p>Change feature state</p>
            <Menu2
              defaultValue={productRequest.status}
              options={["suggestion", "planned", "in-progress", "live"]}
              selectOption={selectCategory?selectCategory:""}
              changeSelectOption={changeSelectStatus}
            />
          </div>
          <div className={`flex flex:col `}>
            <p className="heading">Feedback Detail</p>
            <p>
              Include any specific comments on what should be improved, added,
              etc.
            </p>
            <textarea
              id="detail"
              name="detail"
              rows={4}
              cols={50}
              defaultValue={productRequest.description}
            />
          </div>
        </div>
      </div>
    );
  }

  const getFeedback = () => {
    let myData = [];
    // copy your state.data to a new array and sort it by itemM in ascending order
    // and then map
    //if (feedbacks.productRequest !== null) {
    if (feedbacks.productRequests !== null) {
      myData = [].concat(feedbacks.productRequests);

      // Starts function body instead of single expression-v
      let feedbackCard = myData.map((feedback:any) => {
        if (feedback === undefined) {
          //console.log("nothing here");
          return null;
        } else {
          //console.log(detailAtom);
          // if (feedback.id == id) {
          if (feedback.id === detailAtom) {
            //console.log(feedback.title);
            return (
              // <div key="">test</div>
              <div key="">
                <FeedbackCard key={feedback.id} productRequest={feedback} />
              </div>
            );
          }
        }
      });
      //console.log(feedbackCard);
      if (getFeedbackCount(feedbacks, status, category) !== 0) {
        return feedbackCard;
      } else {
        return <NoFeedback />;
      }
    } else return null;
  };

  //console.log(feedbacks);
  return <div className="flex flex:col jc:center">{getFeedback()}</div>;
}

export default EditFeedbackPanel;
