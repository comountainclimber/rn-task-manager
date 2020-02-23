export const ADD_TASK = "ADD_TASK";
export const addTask = ({ task, selectedDate }) => dispatch => {
  dispatch({
    type: ADD_TASK,
    task,
    selectedDate,
    receivedAt: Date.now()
  });
};

export const REMOVE_TASK = "REMOVE_TASK";
export const removeTask = ({ id, selectedDate }) => dispatch => {
  dispatch({
    type: REMOVE_TASK,
    id,
    selectedDate,
    receivedAt: Date.now()
  });
};

export const TOGGLE_COMPLETE_TASK = "TOGGLE_COMPLETE_TASK";
export const toggleCompleteTask = ({ task, selectedDate }) => dispatch => {
  dispatch({
    type: TOGGLE_COMPLETE_TASK,
    task,
    selectedDate,
    receivedAt: Date.now()
  });
};

export const MOVE_TASK = "MOVE_TASK";
export const moveTask = ({ task, selectedDate, previousDate }) => dispatch => {
  dispatch({
    type: MOVE_TASK,
    task,
    selectedDate,
    previousDate,
    receivedAt: Date.now()
  });
};
