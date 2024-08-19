import colors from "@/assets/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchGetBasket } from "../../slices/cart/getBasket";
import { fetchAddBasket } from "../../slices/cart/addBasket";
import { fetchRemoveFromCart } from "../../slices/cart/removeFromCart";
import PaymentPage from "./paymentPage";
import SelectAddress from "./selectAddress";
import { useFocusEffect } from "expo-router";

interface Product {
  rowid: string,
  id: string,
  qty: number,
  price: string,
  discount_price: string,
  isDiscount: string,
  name: string,
  title: string,
  img_url: string,
  subTotal: string,
  brand: string,
}

const CartScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const getBasket = useSelector((state: RootState) => state.getBasket);
  const addBasket = useSelector((state: RootState) => state.addBasket);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isCartVisible, setIsCartVisible] = useState(true);
  const [isAddressSelVis, setIsAddressSel] = useState(false);
  useEffect(() => {
    dispatch(fetchGetBasket());
  }, [dispatch]);

  const showAlert = () =>
    Alert.alert(
      'NarEvim',
      'Minimum 1 tane alabilirsiniz',
      [
        {
          text: 'ok',
          style: 'cancel',
        },
      ],
      {
      },
    );
    const showEmptyCartAlert = () =>
      Alert.alert(
        'NarEvim',
        'Sepetinizde ürün bulunamadı',
        [
          {
            text: 'ok',
            style: 'cancel',
          },
        ],
        {
        },
      );

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = getBasket.data.reduce((sum, item) => {
        return sum + (item.qty * parseFloat(item.price));
      }, 0);
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [getBasket.data]);

  const handleAddBasket = (id: string, qty: number) => {
    dispatch(fetchAddBasket({ product_id: id, qty: "1" }));
    dispatch(fetchGetBasket());

  };
  const handleDeleteBasket = (id: string, qty: number) => {
    if (qty <= 1) {
      showAlert();
    }
    else {
      dispatch(fetchAddBasket({ product_id: id, qty: "-1" }));
      dispatch(fetchGetBasket());
    }
  }
  const handleRemoveAll = (rowId: string) => {
    dispatch(fetchRemoveFromCart({ rowID: rowId }))
    dispatch(fetchGetBasket())
  }
  const handleCreateOrder = () => {
    if (getBasket.data.length == 0) {
      showEmptyCartAlert();
    }
    else {
      setIsCartVisible(!isCartVisible);
      setIsAddressSel(!isAddressSelVis);
    }
  }

  const renderItem = ({ item }: { item: Product }) => (
    <View style={{ alignItems: "center" }}>
      <View style={styles.prodContain}>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 24, color: "blue" }}></Text>
          <Text style={{ fontSize: 24, color: "darkblue" }}> {item.brand}</Text>
          <TouchableOpacity onPress={() => handleRemoveAll(item.rowid)}>
            <FontAwesome5 name="trash" size={30} color="red" />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 3, flexDirection: "row" }}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Image style={{
              width: 120,
              height: 150,
            }}
              resizeMode="center" source={{ uri: `${item.img_url}` }} />
          </View>
          <View style={{ flex: 2, justifyContent: "center" }}>
            <Text style={{ fontSize: 18, color: colors.darkgray }}>
              {item.title}
            </Text>
          </View>
        </View>
        <View style={{ flex: 1.2, flexDirection: "row" }}>
          <View style={{ flex: 1 }}></View>
          <View style={{ flex: 1, flexDirection: "row", marginBottom: 5 }}>
            <View style={{ flex: 1, backgroundColor: colors.primary, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>
              <TouchableOpacity onPress={() => handleDeleteBasket(item.id, item.qty)}>
                <Text style={styles.countText}>-</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, backgroundColor: colors.specGray, justifyContent: "center" }}>
              <Text style={styles.qtyText}>{item.qty}</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: colors.primary, borderBottomRightRadius: 10, borderTopRightRadius: 10 }}>
              <TouchableOpacity onPress={() => handleAddBasket(item.id, item.qty)}>
                <Text style={styles.countText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={{ textAlign: "right", fontSize: 20, color: "red" }}>{item.price} TL</Text>
          </View>
        </View>
      </View>
    </View>
  );

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchGetBasket());
      setIsAddressSel(false);
      setIsCartVisible(true);
    }, [])
  )
  return (
    <View style={styles.container}>
      {isCartVisible && (
        <View style={styles.headContain}>
          <Text style={styles.headText}>Sepet : {getBasket.data.length} Ürün</Text>
        </View>
      )}
      {isCartVisible && (
        <View style={styles.listContain}>

          <FlatList
            data={getBasket.data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      )}
      {isCartVisible && (
        <View style={styles.bottomContain}>
          <View style={styles.bottomLeftContain}>
            <Text style={styles.bottomLeftText}>Sepet Toplam</Text>
            <Text style={styles.feeText}>{totalPrice.toFixed(2)} TL</Text>
          </View>
          <View style={styles.bottomRightContain}>
            <TouchableOpacity onPress={handleCreateOrder} style={styles.button1}>
              <Text style={{ fontSize: 16, color: "white", textAlign: "center", }}>
                Alışverişi Tamamla
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {isAddressSelVis && (
        <SelectAddress isCartVisible={isCartVisible} isAddressSelVis={isAddressSelVis} setIsCartVisible={setIsCartVisible} setIsAddressSel={setIsAddressSel} />
      )}

    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  prodContain: {
    height: 200,
    borderBottomColor: colors.gray,
    borderBottomWidth: 0.7,
    borderTopColor: colors.gray,
    borderTopWidth: 0.7,
    marginTop: 10,
    width: "95%",

  },
  headContain: {
    flex: 1.5,
    borderWidth: 0.7,
    borderColor: colors.gray,
    justifyContent: "center",
    alignItems: "center"
  },
  headText: {
    fontSize: 24,
    color: colors.primary
  },
  listContain: {
    flex: 15,
  },
  bottomContain: {
    flex: 1.3,
    flexDirection: "row",
    borderWidth: 0.7,
    borderColor: colors.gray
  },
  bottomLeftContain: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  bottomRightContain: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center"
  },
  bottomLeftText: {
    fontSize: 20,
    color: colors.darkgray,
    fontStyle: "italic",
    fontWeight: "600",
    marginLeft: -60
  },
  feeText: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: "500",
    marginLeft: -60
  },
  button1: {
    backgroundColor: colors.primary,
    width: "70%",
    height: 50,
    justifyContent: "center",
    borderRadius: 8,
    marginRight: 10
  },
  countText: {
    fontSize: 30,
    textAlign: "center",
    color: "white"
  },
  qtyText: {
    fontSize: 18,
    textAlign: "center",
    color: "black"
  }
});
export default CartScreen;
