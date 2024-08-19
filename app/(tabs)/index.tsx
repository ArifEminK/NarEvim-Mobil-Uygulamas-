import { GestureHandlerRootView } from "react-native-gesture-handler";
import Home from "../src/screens/home/Home";
import { Provider } from "react-redux";
import store from "../src/store/store";
import { StatusBar } from "react-native";

const Index: React.FC = () => {

  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};
export default Index;
