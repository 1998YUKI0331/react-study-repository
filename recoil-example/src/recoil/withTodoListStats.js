import { selector } from "recoil";
import { todoListState } from "./atom";
import { TODO_LIST_STATS } from "./types";

const todoListStatsState = selector({
  key: TODO_LIST_STATS,
  get: ({ get }) => {
    const todoList = get(todoListState);
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum;

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    };
  },
});

export default todoListStatsState;