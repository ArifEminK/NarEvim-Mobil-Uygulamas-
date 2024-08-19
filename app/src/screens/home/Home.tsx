import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import colors from "../../../../assets/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { fetchSliders } from "../../slices/slidersSlice";
import { fetchBrands } from "../../slices/brandsSlice";
import BrandProdList from "./BrandProdList";
import { fetchSearchProd } from "../../slices/product/searchProduct";
import SearchProductPage from "./SearchProductPage";
import { useFocusEffect } from "expo-router";
import { AppDispatch, RootState } from "../../store/store";


interface Brand {
  id: string,
  title: string,
  img_url: string,
  rank: string,
  isActive: string,
  createdAt: string,
}

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const brands = useSelector((state: RootState) => state.brands);
  const sliders = useSelector((state: RootState) => state.sliders);
  const products = useSelector((state: RootState) => state.searchProducts);

  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [isBraProdVisible, setIsBraProdVisible] = useState(false);
  const [isHomeVisible, setIsHomeVisible] = useState(true);
  const [isSeaProdVisible, setIsSeaProdVisible] = useState(false);
  const [keyword, setKeyword] = useState<string>("");
  const [sort, setSort] = useState<"ASC" | "DESC">("ASC");

  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(fetchSliders());
  }, [dispatch]);

  const handleSearch = () => {
    setIsHomeVisible(!isHomeVisible);
    dispatch(fetchSearchProd({ keywords: keyword, page: "0", per_page: "10", sorting: "ASC" }));
    setIsSeaProdVisible(!isSeaProdVisible);
  }

  const handleBrandSelected = (item: Brand) => {
    setSelectedBrand(item);
    setIsBraProdVisible(!isBraProdVisible);
    setIsHomeVisible(!isHomeVisible);
  }

  useFocusEffect(
    React.useCallback(() => {
      setIsBraProdVisible(false);
      setIsSeaProdVisible(false);
      setIsHomeVisible(true);
    }, [])
  )

  const renderBrandItem = ({ item }: { item: Brand }) => (
    <View style={styles.logoContainer}>
      <TouchableOpacity onPress={() => handleBrandSelected(item)}>
        <Image
          source={{ uri: `${brands.image_path}${item.img_url}` }}
          style={styles.brandImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >

      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>

        <StatusBar
          backgroundColor={colors.background}
          barStyle={"dark-content"}
          hidden={true}
        />
        <View style={{ flex: 1, backgroundColor: colors.background }}>
          {isHomeVisible && (
            <ScrollView contentContainerStyle={{ flexGrow:1 }}>
              <View style={styles.top}>
                <Image
                  source={require("../../../../assets/images/logo.png")}
                  resizeMode="contain"
                  style={styles.logoImage}
                />
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Aramak istediğiniz ürünü girin.."
                    value={keyword}
                    onChangeText={setKeyword}
                  />
                  <TouchableOpacity onPress={handleSearch}>
                    <FontAwesome5 name="search" size={30} color={colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          )}
          {isSeaProdVisible && (
            <SearchProductPage
              isSeaProdVisible={isSeaProdVisible}
              setIsSeaProdVisible={setIsSeaProdVisible}
              isHomeVisible={isHomeVisible}
              setIsHomeVisible={setIsHomeVisible}
              keyword={keyword}
              setKeyword={setKeyword}
              firstData={products.data}
              sort={sort}
              setSort={setSort}
            />
          )}
          {isHomeVisible && (
            <View style={styles.midCont}>
              <ScrollView contentContainerStyle={styles.scrollViewCont}>
                {sliders.status === 'success' && sliders.data.map((item) => (
                  <TouchableOpacity key={item.id}>
                    <View style={styles.imageContainer}>
                      <Image resizeMode="contain" source={{ uri: `${sliders.image_path}${item.img_url}` }} style={styles.image} />
                    </View>
                  </TouchableOpacity>
                ))}

                <Text style={styles.bottomText}>Markalar</Text>
                {brands.status === 'success' && (

                  <FlatList
                    data={brands.data}
                    renderItem={renderBrandItem}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.flatListCont}
                  />
                )}
                <Text style={styles.bottomText}>En Beğenilen Ürünler</Text>
              </ScrollView>
            </View>
          )}
          {isBraProdVisible && selectedBrand && selectedBrand.id && selectedBrand.title && (
            <BrandProdList
              isHomeVisible={isHomeVisible}
              setIsHomeVisible={setIsHomeVisible}
              isBraProdVisible={isBraProdVisible}
              setIsBraProdVisible={setIsBraProdVisible}
              brandId={selectedBrand.id}
              title={selectedBrand.title}
            />
          )}
        </View>
      </SafeAreaView>

    </KeyboardAvoidingView>

  );
};
export default Home;

const styles = StyleSheet.create({
  top: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    marginTop: -30
  },
  image: {
    width: 380,
    height: 250,
  },
  brandImage: {
    width: 200,
    height: 200,
  },
  input: {
    width: "90%",
    height: 55,
    paddingHorizontal: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    height: 60,
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 10,
    borderColor: colors.primary,
    marginTop: -60,
  },
  midCont: {
    flex: 25,
    backgroundColor: colors.background,

  },
  imageContainer: {
    alignItems: 'center',
  },
  bottomText: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.primary,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  scrollViewCont: {
    alignItems: "center",

  },
  logoContainer: {
    marginHorizontal: 10,
  },
  logoImage: {
    width: 200,
    height: 200,
    marginTop: -20,
  },
  flatListCont: {
    paddingHorizontal: 10,
  },
});
