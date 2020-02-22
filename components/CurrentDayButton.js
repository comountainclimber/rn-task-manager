import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import moment from "moment";
import PropTypes from "prop-types";

import ChevronDown from "../assets/images/chevron-down.svg";
import ChevronRight from "../assets/images/chevron-right.svg";

export default function CurrentDayButton({
  handlePress,
  selectedDate,
  buttonPressed
}) {
  const day = moment(selectedDate, "YYYY-MM-DD HH:mm:ss").format("dddd");
  const monthAndDay = moment(selectedDate, "YYYY-MM-DD HH:mm:ss").format(
    "MMMM D"
  );

  return (
    <TouchableOpacity onPress={handlePress} style={styles.currentDayContainer}>
      <View style={styles.innerCurrentDayContainer}>
        <Text style={styles.day}>{day}</Text>
        <Text style={styles.monthAndDay}>{monthAndDay}</Text>
      </View>
      {buttonPressed ? <ChevronDown /> : <ChevronRight />}
    </TouchableOpacity>
  );
}

CurrentDayButton.propTypes = {
  buttonPressed: PropTypes.bool.isRequired,
  handlePress: PropTypes.func.isRequired,
  selectedDate: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  currentDayContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24
  },
  innerCurrentDayContainer: {
    display: "flex",
    flexDirection: "column",
    marginRight: 12
  },
  day: {
    fontSize: 24,
    fontWeight: "bold",
    width: "100%",
    textAlign: "left"
  },
  monthAndDay: {
    fontSize: 16,
    width: "100%",
    textAlign: "left",

    color: "grey"
  }
});
