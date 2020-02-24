import React from "react";
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
  View
} from "react-native";
import moment from "moment";
import PropTypes from "prop-types";

import { DATE } from "../../constants";
import Calendar from "../../components/Calendar";
import CurrentDayButton from "../../components/CurrentDayButton";
import TaskInput from "../../components/TaskInput";
import SwipeableTaskList from "../../components/SwipeableTaskList";

export default function Main({
  tasks,
  handleAddTask,
  handleToggleCompleteTask,
  handleRemoveTask,
  handleMoveTask
}) {
  const [selectedDate, setSelectedDate] = React.useState(
    moment(DATE).format("YYYY-MM-DD")
  );
  const [calendarVisible, toggleCalendarVisibility] = React.useState(false);
  const [taskRowBeingMoved, setTaskRowBeingMoved] = React.useState(null);

  const handleDayPress = date => setSelectedDate(date.dateString);

  const handleToggleCalendar = () => {
    if (taskRowBeingMoved) taskRowBeingMoved.closeRow();
    setTaskRowBeingMoved(null);
    return toggleCalendarVisibility(!calendarVisible);
  };

  const dimensions = {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
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
        <View
          onStartShouldSetResponder={() =>
            taskRowBeingMoved.closeRow() && setTaskRowBeingMoved(null)
          }
          style={styles.innerMainScreenContainer}
        >
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
                dimensions={dimensions}
              />
            </View>
          )}
          <TaskInput
            handleAddTask={({ description }) =>
              handleAddTask({ task: { description }, selectedDate })
            }
          />
          {tasks[selectedDate] && (
            <SwipeableTaskList
              listViewData={tasks[selectedDate]
                .sort((a, b) => a.completed - b.completed)
                .map(task => ({
                  key: task.id,
                  ...task
                }))}
              dimensions={dimensions}
              handleToggleCompleteTask={({ id, completed }) => {
                return handleToggleCompleteTask({
                  task: {
                    ...tasks[selectedDate].find(t => t.id === id),
                    completed
                  },
                  selectedDate
                });
              }}
              handleRemoveTask={id => handleRemoveTask({ id, selectedDate })}
              swipeDisabled={calendarVisible}
              handleRenderMoveMap={row => setTaskRowBeingMoved(row)}
            />
          )}
        </View>
        {taskRowBeingMoved && (
          <View style={styles.moveTaskCalendarContainer}>
            <Calendar
              dimensions={dimensions}
              calendarBackgroundColor="white"
              selectedDate={selectedDate}
              handleDayPress={date => {
                const { dateString } = date;
                const {
                  completed,
                  description,
                  id
                } = taskRowBeingMoved.props.item;
                const task = {
                  completed,
                  description,
                  id
                };
                setTaskRowBeingMoved(null);
                return handleMoveTask({
                  task,
                  selectedDate: dateString,
                  previousDate: selectedDate
                });
              }}
              calendarLabel="Start Date:"
            />
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

Main.propTypes = {
  tasks: PropTypes.shape({
    date: PropTypes.arrayOf(
      PropTypes.exact({
        id: PropTypes.string,
        description: PropTypes.string,
        completed: PropTypes.bool
      })
    )
  }).isRequired,
  handleAddTask: PropTypes.func.isRequired,
  handleRemoveTask: PropTypes.func.isRequired,
  handleMoveTask: PropTypes.func.isRequired,
  handleToggleCompleteTask: PropTypes.func.isRequired
};

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
