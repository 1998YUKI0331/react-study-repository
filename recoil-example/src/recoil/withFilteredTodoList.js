import { selector } from "recoil";
import { todoListFilterState, todoListState } from "./atom";
import { TODO_LIST_FILTERED, SHOW_COMPLETED, SHOW_UNCOMPLETED } from "./types";

const filteredTodoListState = selector({
  key: TODO_LIST_FILTERED,
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case SHOW_COMPLETED:
        return list.filter((item) => item.isComplete);
      case SHOW_UNCOMPLETED:
        return list.filter((item) => !item.isComplete);
      default:
        return list;
    }
  },
});

export default filteredTodoListState;