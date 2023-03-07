import * as React from "react";
import ToDoListContext from "./context";
import { ToDoListStateType } from "./reducers";

export const useToDoListContext = (): {
  state: ToDoListStateType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: React.Dispatch<any>;
} => {
  const contextValue = React.useContext(ToDoListContext);
  return contextValue;
};
