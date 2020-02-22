import React from "react";
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Dimensions,
  View,
  SafeAreaView
} from "react-native";
import moment from "moment";

import { DATE, TASKS } from "../constants";
import Calendar from "../components/Calendar";
import CurrentDayButton from "../components/CurrentDayButton";
import TaskInput from "../components/TaskInput";
import SwipeableTaskList from "../components/SwipeableTaskList";

export default function Main() {
  const [selectedDate, setSelectedDate] = React.useState(
    moment(DATE).format("YYYY-MM-DD")
  );
  const [tasks, setTasks] = React.useState(TASKS);
  const [calendarVisible, toggleCalendarVisibility] = React.useState(false);
  const [taskRowBeingMoved, setTaskRowBeingMoved] = React.useState(null);

  const handleDayPress = date => setSelectedDate(date.dateString);

  const handleAddTask = ({ value }) => {
    const copy = { ...tasks };

    if (!copy[selectedDate]) {
      copy[selectedDate] = [];
    }

    copy[selectedDate].unshift({
      completed: false,
      description: value,
      id: String(Date.now())
    });
    setTasks(copy);
    Keyboard.dismiss();
  };

  const handleToggleCompleteTask = ({ id, completed }) => {
    const copy = { ...tasks };
    const task = copy[selectedDate].find(t => t.id === id);
    task.completed = completed;
    setTasks(copy);
  };

  const handleRemoveTask = id => {
    const newData = { ...tasks };
    const prevIndex = newData[selectedDate].findIndex(item => item.id === id);
    newData[selectedDate].splice(prevIndex, 1);
    setTasks(newData);
  };

  const handleToggleCalendar = () => {
    if (taskRowBeingMoved) taskRowBeingMoved.closeRow();
    setTaskRowBeingMoved(null);

    return toggleCalendarVisibility(!calendarVisible);
  };

  const handleMoveTask = date => {
    const { dateString } = date;
    const { completed, description, id } = taskRowBeingMoved.props.item;
    const taskToBeMoved = {
      completed,
      description,
      id: String(Date.now())
    };
    const newData = { ...tasks };
    if (newData[dateString]) {
      newData[dateString].unshift(taskToBeMoved);
    } else {
      newData[dateString] = [taskToBeMoved];
    }
    const prevIndex = newData[selectedDate].findIndex(item => item.id === id);
    newData[selectedDate].splice(prevIndex, 1);
    setTasks(newData);
    setTaskRowBeingMoved(null);
  };

  return (
    <KeyboardAvoidingView
      style={{
        height: "100%",
        display: "flex",
        flex: 1,
        backgroundColor: "#F7F8FA"
      }}
      contentContainerStyle={{ height: "100%", display: "flex", flex: 1 }}
      behavior="position"
      enabled
      keyboardVerticalOffset={calendarVisible ? -200 : -600}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.innerMainScreenContainer}>
          <CurrentDayButton
            selectedDate={selectedDate}
            handlePress={handleToggleCalendar}
            buttonPressed={!calendarVisible}
          />
          {calendarVisible && (
            <View style={styles.calendarContainer}>
              <Calendar
                selectedDate={selectedDate}
                handleDayPress={handleDayPress}
              />
            </View>
          )}
          <TaskInput handleAddTask={handleAddTask} />
          {tasks[selectedDate] && (
            <SafeAreaView>
              <SwipeableTaskList
                listViewData={tasks[selectedDate]
                  .sort((a, b) => a.completed - b.completed)
                  .map(task => ({
                    key: task.id,
                    ...task
                  }))}
                dimensions={{
                  width: Dimensions.get("window").width,
                  height: Dimensions.get("window").height
                }}
                handleToggleCompleteTask={handleToggleCompleteTask}
                handleRemoveTask={handleRemoveTask}
                swipeDisabled={calendarVisible}
                handleRenderMoveMap={row => setTaskRowBeingMoved(row)}
              />
            </SafeAreaView>
          )}
        </View>
        {taskRowBeingMoved && (
          <View style={styles.moveTaskCalendarContainer}>
            <Calendar
              calendarBackgroundColor="white"
              selectedDate={selectedDate}
              handleDayPress={handleMoveTask}
              calendarLabel="Start Date:"
            />
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  standalone: {
    marginTop: 30,
    marginBottom: 30
  },
  innerMainScreenContainer: {
    paddingLeft: 24,
    paddingRight: 24
  },
  container: {
    paddingTop: 48,
    paddingBottom: 48,
    width: "100%",
    backgroundColor: "#F7F8FA"
  },
  moveTaskCalendarContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    backgroundColor: "white"
  },
  calendarContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    alignItems: "center"
  }
});
