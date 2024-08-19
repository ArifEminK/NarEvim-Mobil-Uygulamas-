import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Account from "../src/screens/log/account";
import { AppRegistry } from "react-native";
import { Provider } from "react-redux";
import store from "../src/store/store"
import Order from "../src/screens/cart/paymentScreens/order";
import Transfer from "../src/screens/cart/paymentScreens/transfer";
const log = () => {
  return (
    <Provider store={store}>
      <Account />
    </Provider>
  );
};
export default log;
