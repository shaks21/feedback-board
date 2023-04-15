import { ProductRequests } from "./productRequests.model";
// import { User } from "./userModel.model";
// import { atom } from "jotai";

// interface FeedbackState {
//   currentUser: User;
//   productRequests: ProductRequests;
// }

// export const feedbackAtom = atom<FeedbackState>({
//   currentUser: "./assets/user-images/image-zena.jpg",
//   "Zena Kelley",
//   "velvetround"
//   productRequests: []
// });

export class Feedback {
  constructor(
    // public obj1: object,
    // public obj2:object

    public currentUser: object,
    public productRequests: ProductRequests // public id: number, // public title: string,
  ) // public category: string,
  // public upvotes: number,
  // public status: string,
  // public description: string,
  // public comments: object[]
  {}
}
