import React from "react";
import { Animated, YellowBox } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import PropTypes from "prop-types";

import AnimatedTaskCard from "./AnimatedTaskCard";
import HiddenSwipeRow from "./HiddenSwipeRow";
import { SWIPE_ACTIONS } from "../constants";

// https://github.com/GeekyAnts/NativeBase/issues/2947
YellowBox.ignoreWarnings([
  "VirtualizedLists should never be nested" // TODO: Remove when fixed
]);

let animationIsRunning = false;

export default function SwipeableTaskList({
  dimensions,
  listViewData,
  handleToggleCompleteTask,
  handleRemoveTask,
  swipeDisabled,
  handleRenderMoveMap
}) {
  const [swipeDirection, setSwipeDirection] = React.useState("");

  let rowTranslateAnimatedValues = {};

  const generateAnimatedValues = () => {
    rowTranslateAnimatedValues = {};
    listViewData.forEach(task => {
      rowTranslateAnimatedValues[task.key] = new Animated.Value(1);
    });
  };

  const onRowDidOpen = (rowKey, rowMap) => {
    const row = rowMap[rowKey];
    if (swipeDirection === SWIPE_ACTIONS.MOVE.direction) {
      handleRenderMoveMap(row);
    }
  };

  const onRowDidClose = () => {
    handleRenderMoveMap(null);
  };

  const onSwipeValueChange = swipeData => {
    const { key, value, direction } = swipeData;

    if (!swipeDirection && value) {
      setSwipeDirection(direction);
    }
    if (!value) {
      setSwipeDirection("");
    }

    if (value === -dimensions.width && !animationIsRunning) {
      animationIsRunning = true;
      Animated.timing(rowTranslateAnimatedValues[key], {
        toValue: 0,
        duration: 200
      }).start(() => {
        handleRemoveTask(key);
        animationIsRunning = false;
        setSwipeDirection("");
      });
    }
  };

  generateAnimatedValues();

  return (
    <SwipeListView
      data={listViewData}
      renderItem={data => (
        <AnimatedTaskCard
          task={data.item}
          handleToggleCompleteTask={handleToggleCompleteTask}
          rowTranslateAnimatedValues={rowTranslateAnimatedValues}
        />
      )}
      renderHiddenItem={() => (
        <HiddenSwipeRow swipeDirection={swipeDirection} />
      )}
      leftOpenValue={dimensions.width}
      rightOpenValue={-dimensions.width}
      previewRowKey="0"
      previewOpenValue={-40}
      previewOpenDelay={3000}
      onRowDidOpen={onRowDidOpen}
      onRowDidClose={onRowDidClose}
      onSwipeValueChange={onSwipeValueChange}
      disableLeftSwipe={swipeDisabled}
      disableRightSwipe={swipeDisabled}
      friction={30}
    />
  );
}

SwipeableTaskList.defaultProps = {
  swipeDisabled: false
};

SwipeableTaskList.propTypes = {
  listViewData: PropTypes.arrayOf(
    PropTypes.exact({
      key: PropTypes.string,
      id: PropTypes.string,
      description: PropTypes.string,
      completed: PropTypes.bool
    })
  ).isRequired,
  dimensions: PropTypes.exact({
    height: PropTypes.number,
    width: PropTypes.number
  }).isRequired,
  handleToggleCompleteTask: PropTypes.func.isRequired,
  handleRemoveTask: PropTypes.func.isRequired,
  handleRenderMoveMap: PropTypes.func.isRequired,
  swipeDisabled: PropTypes.bool
};
