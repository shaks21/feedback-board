import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

//export const FeedbackAtom = atomWithStorage("feedback", []);
export const FeedbackAtom = atom([]);

export const DetailAtom = atom(0);

export const PrevPageAtom = atom("https://yvnsfb.csb.app/");