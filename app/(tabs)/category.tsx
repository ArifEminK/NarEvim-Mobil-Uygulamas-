import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Categories from "../src/screens/category/categories";
import { Provider } from "react-redux";
import store from "../src/store/store";
const category = () => {
  return (
    <Provider store={store}>
      <Categories/>
    </Provider>
  );
};

export default category;
