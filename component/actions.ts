export type ToDoListAction =
  | {
      type: "UPDATE_STATE_TASK_OPEN_DETAIL";
      payload: Array<string>;
    }
  | {
      type: "UPDATE_STATE_CHECKBOX";
      payload: Array<string>;
    }
  | {
      type: "UPDATE_STATE_LOADING";
      payload: boolean;
    }
  | {
      type: string;
      payload: Array<string>;
    };

export const updateStateTaskOpenDetail = (payload: Array<string>) => ({
  type: "UPDATE_STATE_TASK_OPEN_DETAIL",
  payload,
});

export const updateStateCheckBox = (payload: Array<string>) => ({
  type: "UPDATE_STATE_CHECKBOX",
  payload,
});

export const updateStateLoading = (payload: boolean) => ({
  type: "UPDATE_STATE_LOADING",
  payload,
});
