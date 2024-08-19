import React from 'react'
import { View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import CartScreen from "../src/screens/cart/cartScreen"
import { Provider } from 'react-redux'
import store from '../src/store/store'
const cart = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <CartScreen />
      </GestureHandlerRootView>
    </Provider>
  )
}

export default cart