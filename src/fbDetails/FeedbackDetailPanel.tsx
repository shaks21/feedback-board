import { useContext, useState } from "react";
import { ReactComponent as UpArrow } from "/public/assets/shared/icon-arrow-up.svg";
import { FeedbackContext } from "../context/FeedbackContextProvider";
import { ProductRequests } from "../models/productRequests.model";
import { FeedbackAtom, DetailAtom } from "../Atoms";
import { useAtom } from "jotai";

import DropDown2 from "./DropDown2";

function FeedbackDetailPanel({ selectSort, category, status }): JSX.Element {
  //const { feedbacks } = useContext(FeedbackContext);
  const [feedbacks] = useAtom(FeedbackAtom);
  const [detailAtom] = useAtom(DetailAtom);
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
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
    feedbacks.productRequests?.forEach((feedback) => {
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
          key={"add"}
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

  const UpVoteBtnClicked = (props) => {
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
          {isClicked ? <UpArrow stroke="white" /> : <UpArrow stroke="blue" />}
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
        <div
          className={`flex flex:row jc:center ai:center bg-color:grey b:2|solid|blue-40`}
        >
          <div>
            <UpVoteBtnClicked
              item={productRequest.upvotes}
              //key={productRequest.id}
              //index={productRequest.id}
            />
          </div>
          <div className={`flex flex:col `}>
            <p>{productRequest.title}</p>
            <p>{productRequest.description}</p>
            <p>{productRequest.category}</p>

            <div className={`flex flex:row ai:center jc:space-between`}></div>
          </div>
          <div>
            <img src="/assets/shared/icon-comments.svg" alt="test" />
            <> {commentCount}</>
          </div>
        </div>
        <div>
          {commentCount} {""} {commentCount === 1 ? "Comment" : "Comments"}{" "}
        </div>
      </div>
    );
  }

  const getComments = (feedback) => {
    let myData = [];

    if (feedback.comments !== null) {
      myData = [].concat(feedback.comments);
      //console.log(feedback.comments.length);
      // Starts function body instead of single expression-v
      let commentCard = myData.map((comment) => {
        if (comment === undefined) {
          console.log("nothing here comment");
          return null;
        } else {
          //console.log("something here comment");
          //console.log(comment);
          let replyCard = comment.replies?.map((reply) => {
            //console.log(reply);
            if (reply === undefined) {
              //console.log("nothing here");
              return null;
            } else {
              //console.log("something here");
              //console.log(reply);

              return (
                <div>
                  <div className="flex flex:row ai:center jc:space-between">
                    <img
                      src={reply.user.image}
                      alt=""
                      className="round w:3rem"
                    ></img>
                    <div>
                      <p>{reply.user.name}</p>
                      <p>@{reply.user.username}</p>
                    </div>
                    <div
                      className="reply"
                      onClick={(): void => toggleDropDown()}
                    >
                      Reply{" "}
                      {showDropDown && (
                        <textarea placeholder="Type your comment here" />
                      )}
                    </div>
                  </div>

                  <div>
                    <>@{reply.replyingTo}</> {reply.content}
                  </div>
                </div>
              );
            }
          });

          return (
            <div className="bb:solid">
              <div>
                <div className="flex flex:row ai:center jc:space-between">
                  <img
                    src={comment.user.image}
                    alt=""
                    className="round w:3rem"
                  ></img>
                  <div>
                    <p>{comment.user.name}</p>
                    <p>@{comment.user.username}</p>
                  </div>
                  <div className="reply" onClick={(): void => toggleDropDown()}>
                    Reply{" "}
                    {showDropDown && (
                      <DropDown2
                        options={["options", "two"]}
                        showDropDown={false}
                        toggleDropDown={(): void => toggleDropDown()}
                        changeSelectOption={null}
                        selectOption={"test"}
                      />
                    )}
                  </div>
                </div>

                <div>{comment.content}</div>
              </div>
              <div>{replyCard}</div>
            </div>
          );
        }
      });
      //console.log(feedbackCard);

      return commentCard; //the problem of the child warning is here
    } else return null;
  };

  const getFeedback = () => {
    let myData = [];
    // copy your state.data to a new array and sort it by itemM in ascending order
    // and then map
    //if (feedbacks.productRequest !== null) {
    if (feedbacks.productRequests !== null) {
      myData = [].concat(feedbacks.productRequests);

      // Starts function body instead of single expression-v
      let feedbackCard = myData.map((feedback) => {
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
              <div key="fcard">
                {/* <div  key=""> */}
                <FeedbackCard key={feedback.id} productRequest={feedback} />
                {/* </div>  */}
                {getComments(feedback)}
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

export default FeedbackDetailPanel;
