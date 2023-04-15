import "@master/css";
import FeedbackStatus from "./FeedbackStatus";
import Roadmap from "../Roadmap";

const CATEGORIES = [
  { name: "All", value: "all" },
  { name: "UI", value: "ui" },
  { name: "UX", value: "ux" },
  { name: "Enhancement", value: "enhancement" },
  { name: "Bug", value: "bug" },
  { name: "Feature", value: "feature" }
];

export default function Sidebar({ category, changeCategory }) {
  const onClickHandler = (cat: string): void => {
    changeCategory(cat);
  };
  const cat: string = category;
  return (
    <div>
      <div className="bg:url('assets/suggestions/desktop/background-header.png') bg:cover	">
        <h1>Frontend Mentor</h1>
        <p>Feedback board</p>
      </div>

      <div className="groupCategory">
        <ul>
          {CATEGORIES.map((category) => (
            <button
              className={cat === category.value ? "active" : undefined}
              key={category.value}
              onClick={(): void => {
                onClickHandler(category.value);
              }}
            >
              {" "}
              {category.name}{" "}
            </button>
          ))}
        </ul>
      </div>

      <div className="flex flex:row jc:space-between ai:center">
        <h1>Roadmap</h1>
        <a href="/roadmap/">View</a>
      </div>

      <FeedbackStatus />
    </div>
  );
}
