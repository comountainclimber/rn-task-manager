import {
  ADD_TASK,
  REMOVE_TASK,
  TOGGLE_COMPLETE_TASK,
  MOVE_TASK
} from "../actions/taskActions";

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_TASK: {
      const newTasks = { ...state };
      const newTaskListForDate = [];
      if (newTasks[action.selectedDate]) {
        newTaskListForDate.push(...newTasks[action.selectedDate]);
      }
      newTaskListForDate.unshift({
        ...action.task,
        completed: false,
        // TODO: figure out a better pattern for ID generation
        id: String(Date.now())
      });
      newTasks[action.selectedDate] = newTaskListForDate;
      return {
        ...state,
        ...newTasks
      };
    }
    case REMOVE_TASK: {
      const { selectedDate, id } = action;
      const newTasks = [...state[selectedDate]];
      const newState = { ...state };
      const prevIndex = newTasks.findIndex(item => item.id === id);
      newTasks.splice(prevIndex, 1);
      newState[action.selectedDate] = newTasks;
      return newState;
    }
    case TOGGLE_COMPLETE_TASK: {
      const newTasks = [...state[action.selectedDate]];
      const newState = { ...state };
      const updatedTasks = newTasks.map(task => {
        if (task.id === action.task.id) {
          return {
            ...task,
            completed: action.task.completed
          };
        }
        return task;
      });
      newState[action.selectedDate] = updatedTasks;
      return newState;
    }
    case MOVE_TASK: {
      const { selectedDate, previousDate, task } = action;
      const newState = { ...state };
      const newTasks = [...(state[selectedDate] || [])];
      const oldTasks = [...state[previousDate]];
      newTasks.unshift(task);

      const prevIndex = oldTasks.findIndex(item => item.id === task.id);
      oldTasks.splice(prevIndex, 1);
      newState[selectedDate] = newTasks;
      newState[previousDate] = oldTasks;
      return newState;
    }

    default:
      return state;
  }
};
