import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Animated
} from "react-native";
import PropTypes from "prop-types";

import Card from "./Card";

const dimensions = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height
};

const AUTO_DISMISS = 6000;
const UndoNotification = ({ undo, visible, dismiss }) => {
  const [springValue] = useState(new Animated.Value(0.3));

  const spring = () => {
    springValue.setValue(0.3);
    Animated.spring(springValue, {
      toValue: 1,
      friction: 8
    }).start();
  };

  useEffect(() => {
    if (visible) {
      spring();
      setTimeout(() => {
        dismiss();
      }, AUTO_DISMISS);
    }
  }, [visible]);

  return (
    visible && (
      <Animated.View
        style={{
          ...styles.container,
          transform: [{ scale: springValue }]
        }}
      >
        <TouchableOpacity onPress={undo}>
          <Card additionalStyles={styles.notificationContainer}>
            <Text style={styles.undoText}>Undo?</Text>
          </Card>
        </TouchableOpacity>
      </Animated.View>
    )
  );
};

UndoNotification.propTypes = {
  undo: PropTypes.func.isRequired,
  dismiss: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired
};

const styles = StyleSheet.create({
  container: {
    width: dimensions.width,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    opacity: 0.4
  },
  notificationContainer: {
    width: dimensions.width - 48,
    height: 75,
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
