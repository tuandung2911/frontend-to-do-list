import { ToDoListAction } from "./actions";

export type ToDoListStateType = {
  arrTaskOpenDetail: Array<string>;
};

// initialState is exported for testing purpose
export const initialState: ToDoListStateType = {
  arrTaskOpenDetail: [],
};

// reducer is exported for testing purpose
const reducer = (state: ToDoListStateType, action: ToDoListAction) => {
  switch (action.type) {
    case "UPDATE_STATE_TASK_OPEN_DETAIL": {
      return { ...state, arrTaskOpenDetail: action.payload };
    }
    default:
      throw new Error(`Unknown action ${action}`);
  }
};

export default reducer;
