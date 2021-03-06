import React from "react";
import * as Font from "expo-font";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import configureStore from "./confgureStore";
import Main from "./screens/main";
import Loader from "./components/Loader";

const { store, persistor } = configureStore();

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
    setTimeout(() => {
      this.setState({ fontLoaded: true });
    }, 400);
  }

  render() {
    const { fontLoaded } = this.state;

    return (
      <Provider store={store}>
        <PersistGate loading={<Loader />} persistor={persistor}>
          {fontLoaded ? <Main /> : <Loader />}
        </PersistGate>
      </Provider>
    );
  }
}
