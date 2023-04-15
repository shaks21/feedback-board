import { useState, createContext } from "react";

import { Feedback } from "../models/feedback.model";

// Create an interface that declares what you can access from this
// context.
export type FeedbackContextType = {
  feedbacks: Feedback[];
  updateFeedbacks: (feedbacks: Feedback[]) => void;
};

// Create the react context object which will store the data from
// the type above.
export const FeedbackContext = createContext<FeedbackContextType>(null as any);

function FeedbackContextProvider({ children }: any) {
  // Here is the state variable that will store the todos globally throughout the app.
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  // Construct an object that will pass to all children the todos
  // and a function to update the todos.
  const value = {
    feedbacks,
    updateFeedbacks: (feedbacks: Feedback[]) => {
      setFeedbacks(feedbacks);
    }
  };

  return (
    <FeedbackContext.Provider value={value}>
      {children}
    </FeedbackContext.Provider>
  );
}

export default FeedbackContextProvider;
