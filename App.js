import React from "react";
import * as Font from "expo-font";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import configureStore from "./confgureStore";
import Main from "./screens/main";

const { store, persistor } = configureStore();

// persistor.subscribe(() => {
//   /* Hydrate React components when persistor has synced with redux store */
//   const { bootstrapped } = persistor.getState();

//   if (bootstrapped) {
//       ReactDOM.hydrate(
//           <MyEntireApp />,
//           document.getElementById("appOrWhatever")
//     );
//   }
// });

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      fontLoaded: false
    };
    this.persistor = persistor;
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

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {fontLoaded && <Main />}
        </PersistGate>
      </Provider>
    );
  }
}
