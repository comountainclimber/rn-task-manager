import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionCreators } from "redux-undo";

import {
  addTask,
  toggleCompleteTask,
  removeTask,
  moveTask
} from "../../actions/taskActions";
import Main from "./Main";
import UndoNotification from "../../components/UndoNotification";

export default () => {
  const [showUndo, setShowUndo] = React.useState(false);

  const tasks = useSelector(state => state.tasks.present);

  const dispatch = useDispatch();

  const handleAddTask = ({ task, selectedDate }) => {
    setShowUndo(true);
    dispatch(addTask({ task, selectedDate }));
  };

  const handleToggleCompleteTask = ({ task, selectedDate }) =>
    dispatch(toggleCompleteTask({ task, selectedDate }));

  const handleRemoveTask = ({ id, selectedDate }) => {
    setShowUndo(true);
    dispatch(removeTask({ id, selectedDate }));
  };

  const handleMoveTask = ({ task, selectedDate, previousDate }) => {
    setShowUndo(true);
    dispatch(moveTask({ task, selectedDate, previousDate }));
  };

  const undo = () => {
    setShowUndo(false);
    dispatch(ActionCreators.undo());
  };

  return (
    <>
      <Main
        tasks={tasks}
        handleAddTask={handleAddTask}
        handleToggleCompleteTask={handleToggleCompleteTask}
        handleRemoveTask={handleRemoveTask}
        handleMoveTask={handleMoveTask}
      />
      <UndoNotification
        undo={undo}
        visible={showUndo}
        dismiss={() => setShowUndo(false)}
      />
    </>
  );
};
