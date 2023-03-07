export type ToDoListAction =
  | {
      type: "UPDATE_STATE_TASK_OPEN_DETAIL";
      payload: Array<string>;
    }
  | {
      type: string;
      payload: Array<string>;
    };

export const updateStateTaskOpenDetail = (payload: Array<string>) => ({
  type: "UPDATE_STATE_TASK_OPEN_DETAIL",
  payload,
});
