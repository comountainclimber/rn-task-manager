import React from "react";
import { Image, StyleSheet, View } from "react-native";

import loader from "../assets/images/loader.gif";

export default () => {
  return (
    <View style={styles.loaderContainer}>
      <Image source={loader} style={styles.loader} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    padding: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  loader: {
    flex: 1,
    width: 150
  }
});
