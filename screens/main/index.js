import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addTask,
  toggleCompleteTask,
  removeTask,
  moveTask
} from "../../actions/taskActions";
import Main from "./Main";

export default () => {
  const tasks = useSelector(state => state.tasks);

  const dispatch = useDispatch();

  const handleAddTask = ({ task, selectedDate }) =>
    dispatch(addTask({ task, selectedDate }));

  const handleToggleCompleteTask = ({ task, selectedDate }) =>
    dispatch(toggleCompleteTask({ task, selectedDate }));

  const handleRemoveTask = ({ id, selectedDate }) =>
    dispatch(removeTask({ id, selectedDate }));

  const handleMoveTask = ({ task, selectedDate, previousDate }) =>
    dispatch(moveTask({ task, selectedDate, previousDate }));

  return (
    <Main
      tasks={tasks}
      handleAddTask={handleAddTask}
      handleToggleCompleteTask={handleToggleCompleteTask}
      handleRemoveTask={handleRemoveTask}
      handleMoveTask={handleMoveTask}
    />
  );
};
