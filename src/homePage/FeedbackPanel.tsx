import { useContext, useState } from "react";
//import { ReactComponent as UpArrow } from "/public/assets/shared/icon-arrow-up.svg";
import { FeedbackContext } from "../context/FeedbackContextProvider";
import { ProductRequests } from "../models/productRequests.model";
import { FeedbackAtom, DetailAtom } from "../Atoms";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

function FeedbackPanel({ selectSort, category, suggestionCount }:any): JSX.Element {
  //const { feedbacks } = useContext(FeedbackContext);
  const [feedbacks] = useAtom(FeedbackAtom);
  const [detailAtom, setDetailAtom] = useAtom(DetailAtom);

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
          onClick={(): void => {
            //onClickHandler("");
          }}
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
    let navigate = useNavigate();
    const detailClick = () => {
      setDetailAtom(productRequest.id);
      let path = `/feedback-details`;
      navigate(path);
    };

    return (
      <div
        className={`flex flex:row jc:center ai:center bg-color:grey b:2|solid|blue-40`}
      >
        {/* <div>
          {[...Array(10)].map((item, index) => (
            <ButtonClicked item={item} key={index} index={index} />
          ))}
        </div> */}

        <div>
          <UpVoteBtnClicked
            item={productRequest.upvotes}
            //key={productRequest.id}
            //index={productRequest.id}
          />
        </div>

        <div
          className={`flex flex:col jc:center ai:center cursor:pointer`}
          onClick={detailClick}
          
        >
          <p>{productRequest.title}</p>
          <p>{productRequest.description}</p>
          <p>{productRequest.category}</p>
          <p>{productRequest.status}</p>
        </div>

        <img src="/assets/shared/icon-comments.svg" alt="test" />
        <p>{countComments(productRequest)}</p>
      </div>
    );
  }

  const sortFeedback = () => {
    // console.log("feedbacklist");
    // console.log(feedbacks);
    // console.log(suggestionCount);
    let myData = [];
    // copy your state.data to a new array and sort it by itemM in ascending order
    // and then map
    //if (feedbacks.productRequest !== null) {
    if (feedbacks.productRequests !== null) {
      myData = [].concat(feedbacks.productRequests);
      switch (selectSort) {
        case "Most Upvotes":
          myData.sort((a:any, b:any) => (a.upvotes < b.upvotes ? 1 : -1));
          break;
        case "Least Upvotes":
          myData.sort((a:any, b:any) => (a.upvotes > b.upvotes ? 1 : -1));
          break;
        case "Most Comments":
          myData.sort((a:any, b:any) => (countComments(a) < countComments(b) ? 1 : -1));
          break;
        case "Least Comments":
          myData.sort((a:any, b:any) => (countComments(a) > countComments(b) ? 1 : -1));
          break;
        default:
          return null;
      }

      let isAll: boolean = false;
      if (category === "all") {
        isAll = true;
      } else {
        isAll = false;
      }

      // Starts function body instead of single expression-v
      let feedbackCard = myData.map((feedback:any) => {
        if (feedback === undefined) {
          //console.log("nothing here");
          return null;
        } else {
          //console.log("something here");
          if (feedback.status === "suggestion") {
            if (isAll) {
              return (
                <FeedbackCard key={feedback.id} productRequest={feedback} />
              );
            } else if (feedback.category === category) {
              return (
                <FeedbackCard key={feedback.id} productRequest={feedback} />
              );
            }
          }
        }
      });
      //console.log(feedbackCard);
      if (suggestionCount !== 0) {
        return feedbackCard;
      } else {
        return <NoFeedback />;
      }
    } else return null;
  };

  //console.log(feedbacks);
  return (
    <div className="flex flex:col ai:center jc:center">{sortFeedback()}</div>
  );
}

export default FeedbackPanel;

// import { useContext, useState } from "react";
// import { ReactComponent as UpArrow } from "/public/assets/shared/icon-arrow-up.svg";
// import { FeedbackContext } from "../context/FeedbackContextProvider";
// import { ProductRequests } from "../models/productRequests.model";
// import { FeedbackAtom } from "../Atoms";
// import { useAtom } from "jotai";

// function FeedbackList({ selectSort, category, suggestionCount }): JSX.Element {
//   //const { feedbacks } = useContext(FeedbackContext);
//   const [feedbacks] = useAtom(FeedbackAtom);

//   function countComments(productRequests: any): number {
//     let commentsCount = 0;
//     if (productRequests.comments != null) {
//       for (let i = 0; i < productRequests.comments.length; i++) {
//         //console.log(productRequests.comments.length);
//         commentsCount++;
//         if (productRequests.comments[i].replies != null) {
//           //console.log(productRequest.comments[i].replies.length)
//           commentsCount += productRequests.comments[i].replies.length;
//           //console.log(productRequests.comments[i].replies[0].content);
//         }
//       }
//     }
//     //console.log(commentsCount);
//     return commentsCount;
//   }

//   function NoFeedback(): JSX.Element {
//     return (
//       <div>
//         <img src="/assets/suggestions/illustration-empty.svg" alt="test" />

//         <p>There is no feedback yet.</p>
//         <p>
//           Got a suggestion? Found a bug that needs to be squashed? We love
//           hearing about new ideas to improve our app.
//         </p>
//         <button
//           className=""
//           key={""}
//           onClick={(): void => {
//             //onClickHandler("");
//           }}
//         >
//           {" "}
//           + Add Feedback{" "}
//         </button>
//       </div>
//     );
//   }

//   const UpVoteBtnClicked = (props) => {
//     const { item } = props;
//     //console.log(item);
//     const [isClicked, setIsClicked] = useState(false);
//     const handleClick = () => {
//       setIsClicked(!isClicked);
//     };

//     return (
//       <div>
//         <button
//           onClick={handleClick}
//           className={isClicked ? "active" : undefined}
//         >
//           {isClicked ? <UpArrow stroke="white" /> : <UpArrow stroke="blue" />}
//           {isClicked ? item + 1 : item}
//         </button>
//         <br />
//         <br />
//       </div>
//     );
//   };

//   // We declare the return type of the function which is a JSX (html + js) element
//   function FeedbackCard({
//     productRequest
//   }: {
//     productRequest: ProductRequests;
//   }): JSX.Element {
//     return (
//       <div
//         className={`flex flex:row jc:center ai:center bg-color:grey b:2|solid|blue-40`}
//       >
//         {/* <div>
//           {[...Array(10)].map((item, index) => (
//             <ButtonClicked item={item} key={index} index={index} />
//           ))}
//         </div> */}

//         <div>
//           <UpVoteBtnClicked
//             item={productRequest.upvotes}
//             //key={productRequest.id}
//             //index={productRequest.id}
//           />
//         </div>

//         <div className={`flex flex:col jc:center ai:center`}>
//           <p>{productRequest.title}</p>
//           <p>{productRequest.description}</p>
//           <p>{productRequest.category}</p>
//           <p>{productRequest.status}</p>
//         </div>

//         <img src="/assets/shared/icon-comments.svg" alt="test" />
//         <p>{countComments(productRequest)}</p>
//       </div>
//     );
//   }

//   const sortFeedback = () => {
//     console.log("feedbacklist");
//     console.log(feedbacks);
//     console.log(suggestionCount);
//     let myData = [];
//     // copy your state.data to a new array and sort it by itemM in ascending order
//     // and then map
//     //if (feedbacks.productRequest !== null) {
//     if (feedbacks.productRequests !== null) {
//       myData = [].concat(feedbacks.productRequests);
//       switch (selectSort) {
//         case "Most Upvotes":
//           myData.sort((a, b) => (a.upvotes < b.upvotes ? 1 : -1));
//           break;
//         case "Least Upvotes":
//           myData.sort((a, b) => (a.upvotes > b.upvotes ? 1 : -1));
//           break;
//         case "Most Comments":
//           myData.sort((a, b) => (countComments(a) < countComments(b) ? 1 : -1));
//           break;
//         case "Least Comments":
//           myData.sort((a, b) => (countComments(a) > countComments(b) ? 1 : -1));
//           break;
//         default:
//           return null;
//       }

//       let isAll: boolean = false;
//       if (category === "all") {
//         isAll = true;
//       } else {
//         isAll = false;
//       }

//       // Starts function body instead of single expression-v
//       let feedbackCard = myData.map((feedback) => {
//         if (feedback === undefined) {
//           //console.log("nothing here");
//           return null;
//         } else {
//           //console.log("something here");
//           if (feedback.status === "suggestion") {
//             if (isAll) {
//               return (
//                 <FeedbackCard key={feedback.id} productRequest={feedback} />
//               );
//             } else if (feedback.category === category) {
//               return (
//                 <FeedbackCard key={feedback.id} productRequest={feedback} />
//               );
//             }
//           }
//         }
//       });
//       //console.log(feedbackCard);
//       if (suggestionCount !== 0) {
//         return feedbackCard;
//       } else {
//         return <NoFeedback />;
//       }
//     } else return null;
//   };

//   //console.log(feedbacks);
//   return (
//     <div className="flex flex:col ai:center jc:center">
//       {sortFeedback()} <p>test</p>
//     </div>
//   );
// }

// export default FeedbackList;
