import { ToDoListAction } from "./actions";

export type ToDoListStateType = {
  arrTaskOpenDetail: Array<string>;
  arrCheckBox: Array<string>;
  isLoadingPage: boolean;
};

// initialState is exported for testing purpose
export const initialState: ToDoListStateType = {
  arrTaskOpenDetail: [],
  arrCheckBox: [],
  isLoadingPage: false,
};

// reducer is exported for testing purpose
const reducer = (state: ToDoListStateType, action: ToDoListAction) => {
  switch (action.type) {
    case "UPDATE_STATE_TASK_OPEN_DETAIL": {
      return { ...state, arrTaskOpenDetail: action.payload };
    }
    case "UPDATE_STATE_CHECKBOX": {
      return { ...state, arrCheckBox: action.payload };
    }
    case "UPDATE_STATE_LOADING": {
      return { ...state, isLoadingPage: action.payload };
    }
    default:
      throw new Error(`Unknown action ${action}`);
  }
};

export default reducer;
