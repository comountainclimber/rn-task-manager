import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import undoable, { includeAction } from "redux-undo";
import { AsyncStorage } from "react-native";

import tasks from "./taskReducer";
import { ADD_TASK, MOVE_TASK, REMOVE_TASK } from "../actions/taskActions";

const tasksPersistConfig = {
  key: "tasks",
  storage: AsyncStorage
};

const persistConfig = {
  key: "root",
  storage: AsyncStorage
};

const rootReducer = combineReducers({
  tasks: persistReducer(
    tasksPersistConfig,
    undoable(tasks, {
      limit: 5,
      filter: includeAction([ADD_TASK, MOVE_TASK, REMOVE_TASK])
    })
  )
});

export default persistReducer(persistConfig, rootReducer);
