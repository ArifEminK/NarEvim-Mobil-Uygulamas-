import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../slices/account/loginSlice';
import logoutReducer from "../slices/account/logOutSlice";
import registerReducer from "../slices/account/registerSlice"
import firstCategoryReducer from "../slices/categories/categoriesSlice"
import forgotReducer from '../slices/account/passForgot';
import secondCategoryReducer from "../slices/categories/secondCategories"
import thirdCategoriesReducer from "../slices/categories/thirdCategories"
import sliderReducer from '../slices/slidersSlice';
import memberInfoReducer from "../slices/account/accoInfo";
import brandReducer from '../slices/brandsSlice';
import brandProdListReducer from '../slices/product/brandProdList';
import productDetailReducer from "../slices/product/productDetail";
import searchProductReducer from "../slices/product/searchProduct";
import favoritteListReducer from "../slices/favoritte/favoritteList";
import citiesReducer from "../slices/addressess/city";
import townReducer from "../slices/addressess/town";
import createAddressReducer from "../slices/addressess/createAddress";
import addressListReducer from "../slices/addressess/addressList";
import removeAddressReducer from "../slices/addressess/removeAddress"
import updateAddressReducer from '../slices/addressess/updateAddress';
import selectAddressReducer from '../slices/addressess/selectAddress';
import addressDetailReducer from '../slices/addressess/addressDetail';
import changePasswordReducer from '../slices/account/changePassword';
import cargoListReducer from '../slices/addressess/cargoList';
import paymentTypesReducer from '../slices/addressess/paymentTypes';
import addBasketReducer from '../slices/cart/addBasket';
import getBasketReducer from '../slices/cart/getBasket';
import removeFromCartReducer from '../slices/cart/removeFromCart';
import updateCartReducer from '../slices/cart/updateCart';
import createOrderReducer from '../slices/order/createOrder';
import ordersReducer from "../slices/order/orders";
import fourthCategoriesReducer from '../slices/categories/fourthCategories';
import bankListReducer from '../slices/order/bankList';
import orderDetailReducer from '../slices/order/orderDetail';
import billTownsReducer from '../slices/addressess/billTowns';

const store = configureStore({
  reducer: {
    login: loginReducer,
    logout: logoutReducer,
    register: registerReducer,
    passForgot: forgotReducer,
    memberInfo: memberInfoReducer,
    firstCategories: firstCategoryReducer,
    secondCategory: secondCategoryReducer,
    thirdCategories: thirdCategoriesReducer,
    fourthCategories: fourthCategoriesReducer,
    sliders: sliderReducer,
    brands: brandReducer,
    brandProdList: brandProdListReducer,
    productDetail: productDetailReducer,
    searchProducts: searchProductReducer,
    favoritteProds: favoritteListReducer,
    cities: citiesReducer,
    towns: townReducer,
    createAddress: createAddressReducer,
    addressList: addressListReducer,
    removeAddress: removeAddressReducer,
    updateAddress: updateAddressReducer,
    selectAddress: selectAddressReducer,
    addressDetail: addressDetailReducer,
    changePassword: changePasswordReducer,
    cargoList: cargoListReducer,
    paymentTypes: paymentTypesReducer,
    addBasket: addBasketReducer,
    getBasket: getBasketReducer,
    removeFromCart: removeFromCartReducer,
    updateCart: updateCartReducer,
    createOrder: createOrderReducer,
    orders: ordersReducer,
    bankList:bankListReducer,
    orderDetail:orderDetailReducer,
    billTowns:billTownsReducer
  },
});

export type BillTownState = ReturnType<typeof store.getState>;
export type OrderDetailState = ReturnType<typeof store.getState>;
export type BankListState = ReturnType<typeof store.getState>;
export type OrderState = ReturnType<typeof store.getState>;
export type UpdateCartState = ReturnType<typeof store.getState>;
export type RemoveFromCartState = ReturnType<typeof store.getState>;
export type GetBasketState = ReturnType<typeof store.getState>;
export type BasketState = ReturnType<typeof store.getState>;
export type PaymentTypesState = ReturnType<typeof store.getState>;
export type CargoListState = ReturnType<typeof store.getState>;
export type ChangePasswordState = ReturnType<typeof store.getState>;
export type AddressDetailState = ReturnType<typeof store.getState>;
export type SelectAddressState = ReturnType<typeof store.getState>;
export type RemoveAddressState = ReturnType<typeof store.getState>;
export type AddressListState = ReturnType<typeof store.getState>;
export type AddressState = ReturnType<typeof store.getState>;
export type CityState = ReturnType<typeof store.getState>;
export type FavoriteListState = ReturnType<typeof store.getState>;
export type ToggleFavoritteState = ReturnType<typeof store.getState>;
export type ProductState = ReturnType<typeof store.getState>;
export type BrandProdState = ReturnType<typeof store.getState>;
export type BrandState = ReturnType<typeof store.getState>;
export type MemberInfoState = ReturnType<typeof store.getState>;
export type SlidersState = ReturnType<typeof store.getState>;
export type FourthCategoryState = ReturnType<typeof store.getState>;
export type ThirdCategoriesState = ReturnType<typeof store.getState>;
export type SecondCategoriesState = ReturnType<typeof store.getState>;
export type FirstCategoryState = ReturnType<typeof store.getState>;
export type LogoutState = ReturnType<typeof store.getState>;
export type RegisterState = ReturnType<typeof store.getState>;
export type PassForgotState = ReturnType<typeof store.getState>;


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;
