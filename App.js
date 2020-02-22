import React from "react";
import * as Font from "expo-font";

import Main from "./screens/Main";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      fontLoaded: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      "Nunito-Light": require("./assets/fonts/Nunito-Light.ttf"),
      "Nunito-Regular": require("./assets/fonts/Nunito-Regular.ttf"),
      "Nunito-Bold": require("./assets/fonts/Nunito-Bold.ttf"),
      "Nunito-Black": require("./assets/fonts/Nunito-Black.ttf")
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    const { fontLoaded } = this.state;
    return fontLoaded && <Main />;
  }
}
