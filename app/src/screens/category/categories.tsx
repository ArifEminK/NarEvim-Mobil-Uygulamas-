import colors from "@/assets/colors";
import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import categoriesData from "../../../../assets/categoriesData";
import SubCategoryList from "./subcategories";
import { FontAwesome5 } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { fetchCategories } from "../../slices/categories/categoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, FirstCategoryState, RootState } from "../../store/store";
import ThirdCategoryList from "./thirdCategoryList";
import { fetchThirdCategories } from "../../slices/categories/thirdCategories";

interface Category {
  id: string;
  title: string;
  img_url: string;
}

const Categories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { image_path, data, message, status } = useSelector((state :RootState) => state.firstCategories);
  const third = useSelector((state :RootState) => state.thirdCategories)

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<Category | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  const handleCategoryPress = (item: Category) => {
    setSelectedCategory(item);
    setIsVisible(false);
    console.log(item.id)
  };


  const backPress = () => {
    if (selectedSubCategory) {
      setSelectedSubCategory(null);
      setSelectedCategory(selectedSubCategory);
    } else {
      setSelectedCategory(null);
      setIsVisible(true);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setSelectedCategory(null);
      setIsVisible(true);
    }, [])
  )

  return (
    <View style={styles.container}>
      {isVisible && (
        <View style={styles.top}>
          <Text style={styles.headText}>Kategoriler</Text>
        </View>
      )}
      {isVisible && (
        <View style={styles.list}>
          {status === 'error' && <Text style={styles.errorText}>{message}</Text>}

          <FlatList
            data={data}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleCategoryPress(item)}>
                <View style={styles.item}>
                  <Image source={{ uri: `${image_path}${item.img_url}` }} style={styles.image} />
                  <Text style={styles.title}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      )}
      {selectedCategory && (
        <View style={{ flex: 1, width:"100%" }}>
          <View style={styles.bottomTopContain}>
            <TouchableOpacity onPress={backPress}>
              <FontAwesome5 name="arrow-left" size={24} color="#DE3459" />
            </TouchableOpacity>
            <Text style={styles.subHeadText}>{selectedCategory.title}</Text>
          </View>
          <SubCategoryList selectedCategory= {selectedCategory} setSelectedCategory={setSelectedCategory}  categoryId={selectedCategory.id} />
        </View>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    height: 90,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row"
  },
  title: {
    fontSize: 18,
    color: colors.darkgray

  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  top: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.primary,
    borderWidth: 0.5,
  },
  headText: {
    color: colors.primary,
    fontSize: 24,
  },
  list: {
    flex: 10,
  },
  bottomTopContain: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 15,
  },
  subHeadText: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: "500",
    marginLeft: 25,
  },
  image: {
    width: 50,
    height: 70,
    marginRight: 10,
  },
});
export default Categories;
