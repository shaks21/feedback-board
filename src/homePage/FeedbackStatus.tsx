import { useContext } from "react";
import { FeedbackContext } from "../context/FeedbackContextProvider";
import { FeedbackAtom } from "../Atoms";
import { useAtom } from "jotai";

function FeedbackStatus() {
  //const { feedbacks } = useContext(FeedbackContext);
  const [feedbacks] = useAtom(FeedbackAtom);
  let planned: number = 0;
  let inProgress: number = 0;
  let live: number = 0;
  const statuses: string[] = [];

  if (feedbacks.productRequests != null) {
    for (let feedback of feedbacks.productRequests) {
      if (!statuses.includes(feedback.status)) {
        statuses.push(feedback.status);
      }
      switch (feedback.status) {
        case "planned":
          planned++;
          break;
        case "in-progress":
          inProgress++;
          break;
        case "live":
          live++;
          break;
        // default:
        //   return;
      }
    }
  }

  return (
    <div className="w:full h:max p:10 flex flex:col ai:center jc:start r:0.5rem shadow:0|1|3|gray-80">
      <p>Feedback: </p>

      {statuses.map((status) =>
        status === "suggestion" ? null : (
          <div
            key={status}
            className={`flex flex:row jc:space-between ai:center`}
          >
            <li key="key" className="capitalize">{status}</li>

            <p>
              {status === "planned"
                ? planned
                : status === "in-progress"
                ? inProgress
                : status === "live"
                ? live
                : null}
            </p>
          </div>
        )
      )}
    </div>
  );
}

export default FeedbackStatus;
