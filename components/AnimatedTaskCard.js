import React from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import PropTypes from "prop-types";

import { styles as cardStyles } from "./Card";
import Checked from "../assets/images/checked-icon.svg";
import Unchecked from "../assets/images/unchecked-icon.svg";

export default function AnimatedTaskCard({
  rowTranslateAnimatedValues,
  task,
  handleToggleCompleteTask
}) {
  // TODO: this should be refactored to be more precise
  const calculateRowHeight = characters => {
    const { length } = characters;
    const MIN_HEIGHT = 70;
    const CHARS_PER_LINE = 35;
    if (length < CHARS_PER_LINE) return MIN_HEIGHT;
    return (length / CHARS_PER_LINE) * MIN_HEIGHT;
  };

  return (
    <Animated.View
      style={[
        cardStyles.card,
        {
          height: rowTranslateAnimatedValues[task.key].interpolate({
            inputRange: [0, 1],
            outputRange: [0, calculateRowHeight(task.description)]
          })
        }
      ]}
    >
      <TouchableOpacity
        onPress={() =>
          handleToggleCompleteTask({
            id: task.id,
            completed: !task.completed
          })
        }
      >
        <View style={task.completed ? { opacity: 0.5 } : { opacity: 1 }}>
          <Text style={styles.taskDescriptionText}>{task.description}</Text>
          {task.completed ? (
            <Checked style={styles.taskCompletedIcon} />
          ) : (
            <Unchecked style={styles.taskCompletedIcon} />
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

AnimatedTaskCard.propTypes = {
  rowTranslateAnimatedValues: PropTypes.shape({
    key: PropTypes.instanceOf(Animated.Value)
  }).isRequired,
  task: PropTypes.exact({
    key: PropTypes.string,
    id: PropTypes.string,
    description: PropTypes.string,
    completed: PropTypes.bool
  }).isRequired,
  handleToggleCompleteTask: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  taskCompletedIcon: {
    marginTop: 6
  },
  taskDescriptionText: {
    fontFamily: "Nunito-Regular"
  }
});
