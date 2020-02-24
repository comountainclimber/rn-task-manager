import React from "react";
import { StyleSheet, TextInput } from "react-native";
import PropTypes from "prop-types";

import Card from "./Card";

export default function TaskInput({ handleAddTask }) {
  const [description, onChangeDescription] = React.useState("");

  const handleSubmit = () => {
    onChangeDescription("");
    handleAddTask({ description });
  };

  return (
    <Card additionalStyles={styles.taskInputContainer}>
      <>
        <TextInput
          blurOnSubmit
          placeholder="Add a task"
          onChangeText={onChangeDescription}
          value={description}
          multiline
          style={styles.taskInput}
          onSubmitEditing={handleSubmit}
        />
      </>
    </Card>
  );
}

TaskInput.propTypes = {
  handleAddTask: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  taskInputContainer: {
    padding: 12
  },
  taskInput: {
    fontFamily: "Nunito-Regular"
  },
  addTaskIconContainer: {
    width: "100%",
    display: "flex",
    alignItems: "flex-end",
    marginBottom: -10
  }
});
