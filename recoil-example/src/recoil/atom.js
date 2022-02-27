import { atom } from "recoil";
import { TODO_LIST, TODO_LIST_FILTER, SHOW_ALL } from "./types";

const todoListState = atom({
  key: TODO_LIST,
  default: [],
});

const todoListFilterState = atom({
  key: TODO_LIST_FILTER,
  default: SHOW_ALL,
});

export { todoListState, todoListFilterState };