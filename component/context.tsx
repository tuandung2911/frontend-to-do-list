// https://stackoverflow.com/questions/57298149/react-ts-usecontext-usereducer-hook
import * as React from "react";
import { ToDoListStateType } from "./reducers";

const ToDoListContext = React.createContext(
  {} as {
    state: ToDoListStateType;
    dispatch: React.Dispatch<any>;
  }
);

export default ToDoListContext;
