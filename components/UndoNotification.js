import React, { useEffect } from "react";
import {
  Button,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  View
} from "react-native";
import PropTypes from "prop-types";

import Card from "./Card";

const dimensions = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height
};

const AUTO_DISMISS = 5000;
const UndoNotification = ({ undo, visible, dismiss }) => {
  useEffect(() => {
    // Your code here
    if (visible) {
      console.log("You should see this only once");
      setTimeout(() => {
        dismiss();
      }, AUTO_DISMISS);
    }
  }, [visible]);

  return (
    visible && (
      <View style={styles.container}>
        <TouchableOpacity onPress={undo}>
          <Card additionalStyles={styles.notificationContainer}>
            <Text style={styles.undoText}>Undo?</Text>
          </Card>
        </TouchableOpacity>
      </View>
    )
  );
};

UndoNotification.propTypes = {
  undo: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired
};

const styles = StyleSheet.create({
  container: {
    width: dimensions.width,
    display: "flex",
    // flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.7
  },
  notificationContainer: {
    width: dimensions.width - 48,
    height: 80,
    marginBottom: -24,
    backgroundColor: "#3d3d3d",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 8
  },
  undoText: {
    color: "white"
  }
});

export default UndoNotification;
