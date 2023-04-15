import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Dashboard from "./homePage/Dashboard";
import { useAtom } from "jotai";
import { useContext, useEffect } from "react";
import Roadmap from "./roadmap/Roadmap";
import FeedbackDetail from "./fbDetails/FeedbackDetail";
import { FeedbackAtom } from "./Atoms";
import { FeedbackContext } from "./context/FeedbackContextProvider";
import EditFeedback from "./fbDetails/EditFeedback";
import CreateFeedback from "./createFB/CreateFeedback";

export default function AppRoutes() {
  const { feedbacks, updateFeedbacks } = useContext(FeedbackContext);
  const [feedbacksAtom, setFeedback] = useAtom(FeedbackAtom);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch("/data.json");
        const data = await response.json();
        //console.log(data);
        // Updates the todos globally since the useState variable is inside the react context now.
        // This means our todos data is not attached to a particular component thus making it
        // globally accessible throughout the app with ease.

        updateFeedbacks(data);

        //jotai atom
        setFeedback(data);
      } catch (error) {
        console.error("[App::fetchFeedbacks]", error);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    // <Provider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Dashboard />} />
          <Route path="/create-feedback/" element={<CreateFeedback />} />
          <Route path="/roadmap/" element={<Roadmap />} />
          <Route path="/feedback-details/" element={<FeedbackDetail />} />
          <Route path="/edit-feedback/" element={<EditFeedback />} />
          {/* <Route path="teams" element={<Teams />}>
            <Route path=":teamId" element={<Team />} />
            <Route path="new" element={<NewTeamForm />} />
            <Route index element={<LeagueStandings />} />
          </Route> */}
        </Route>
      </Routes>
    </BrowserRouter>
    // </Provider>
  );
}
