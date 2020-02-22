import React from "react";
import { StyleSheet, View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

export default function Card({ children, additionalStyles }) {
  return <View style={[styles.card, additionalStyles]}>{children}</View>;
}

Card.defaultProps = {
  additionalStyles: {}
};

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired,
  additionalStyles: ViewPropTypes.style
};

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    marginBottom: 12,
    borderRadius: 4,
    width: "100%",
    borderColor: "#F0F0F0",
    borderWidth: 1.5
  }
});
