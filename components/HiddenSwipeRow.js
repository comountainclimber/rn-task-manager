import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";

import { SWIPE_ACTIONS } from "../constants";

export default function HiddenSwipeRow({ swipeDirection }) {
  return (
    <View style={styles.rowBack}>
      <View
        style={[
          styles.backBtn,
          swipeDirection === SWIPE_ACTIONS.MOVE.direction
            ? styles.backLeftBtn
            : styles.backRightBtn
        ]}
      >
        <Text
          style={
            swipeDirection === SWIPE_ACTIONS.MOVE.direction
              ? styles.moveText
              : styles.deleteText
          }
        >
          {swipeDirection === SWIPE_ACTIONS.MOVE.direction
            ? SWIPE_ACTIONS.MOVE.label
            : SWIPE_ACTIONS.DELETE.label}
        </Text>
      </View>
    </View>
  );
}

HiddenSwipeRow.propTypes = {
  swipeDirection: PropTypes.oneOf([
    SWIPE_ACTIONS.DELETE.direction,
    SWIPE_ACTIONS.MOVE.direction,
    ""
  ]).isRequired
};

const styles = StyleSheet.create({
  rowBack: {
    borderRadius: 4,
    marginBottom: 12,
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  backBtn: {
    alignItems: "center",
    bottom: 0,
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    top: 0,
    borderRadius: 4,
    width: "100%"
  },
  backRightBtn: {
    justifyContent: "flex-end",
    backgroundColor: "red"
  },
  backLeftBtn: {
    justifyContent: "flex-start",
    backgroundColor: "#2CA7FF"
  },
  moveText: {
    fontFamily: "Nunito-Regular",
    color: "white",
    marginLeft: 24
  },
  deleteText: {
    fontFamily: "Nunito-Regular",
    color: "white",
    marginRight: 24
  }
});
