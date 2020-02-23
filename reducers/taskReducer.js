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
      const newTasks = { ...state };
      const prevIndex = newTasks[selectedDate].findIndex(
        item => item.id === id
      );
      newTasks[selectedDate].splice(prevIndex, 1);
      return {
        ...state,
        ...newTasks
      };
    }
    case TOGGLE_COMPLETE_TASK: {
      const newTasks = { ...state };
      newTasks[action.selectedDate].find(
        t => t.id === action.task.id
      ).completed = action.task.completed;
      return {
        ...state,
        ...newTasks
      };
    }
    case MOVE_TASK: {
      const newTasks = { ...state };
      const { selectedDate, previousDate, task } = action;

      if (newTasks[selectedDate]) {
        newTasks[selectedDate].unshift(task);
      } else {
        newTasks[selectedDate] = [task];
      }

      const prevIndex = newTasks[previousDate].findIndex(
        item => item.id === task.id
      );
      newTasks[previousDate].splice(prevIndex, 1);
      return {
        ...state,
        ...newTasks
      };
    }

    default:
      return state;
  }
};
