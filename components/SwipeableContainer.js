import React from "react";
import { StyleSheet, View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import { SwipeRow } from "react-native-swipe-list-view";

export default function SwipeableTaskCard({
  frontRowContent,
  backRowContent,
  additionalContainerStyles,
  additionalBackRowStyles,
  additionalFrontRowStyles,
  swipeDisabled
}) {
  return (
    <SwipeRow
      leftOpenValue={75}
      rightOpenValue={-75}
      style={[additionalContainerStyles]}
      disableRightSwipe={swipeDisabled}
      disableLeftSwipe={swipeDisabled}
    >
      <View style={[styles.standaloneRowBack, additionalBackRowStyles]}>
        {backRowContent}
      </View>
      <View style={[styles.standaloneRowFront, additionalFrontRowStyles]}>
        {frontRowContent}
      </View>
    </SwipeRow>
  );
}

SwipeableTaskCard.defaultProps = {
  additionalContainerStyles: {},
  additionalBackRowStyles: {},
  additionalFrontRowStyles: {},
  backRowContent: [],
  swipeDisabled: false
};

SwipeableTaskCard.propTypes = {
  frontRowContent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired,
  backRowContent: PropTypes.arrayOf(PropTypes.element),
  additionalContainerStyles: ViewPropTypes.style,
  additionalBackRowStyles: ViewPropTypes.style,
  additionalFrontRowStyles: ViewPropTypes.style,
  swipeDisabled: PropTypes.bool
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    marginBottom: 12,
    borderRadius: 4,
    width: "100%",
    borderColor: "#F0F0F0",
    borderWidth: 1.5
  },
  standaloneRowFront: {
    alignItems: "center",
    // backgroundColor: "#CCC",
    justifyContent: "center"
    // height: 50
  },
  standaloneRowBack: {
    // height: "100%",
    // alignItems: "center",
    // backgroundColor: "#8BC645",
    flex: 1,
    flexDirection: "row",
    // justifyContent: "space-between",
    padding: 2,
    marginBottom: 12,
    borderRadius: 4
    // padding: 15
  }
});
