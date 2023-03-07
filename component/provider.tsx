import * as React from "react";
import AppContext from "./context";
import reducer, { initialState } from "./reducers";

export type ToDoListProviderProps = {
  children: React.ReactNode;
};

const ToDoListProvider = ({ children }: ToDoListProviderProps) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const contextValue: any = React.useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

ToDoListProvider.defaultProps = {};

export default ToDoListProvider;
