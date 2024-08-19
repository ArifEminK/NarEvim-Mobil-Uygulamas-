import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Image } from "react-native";
import subCategoriesData from "../../../../assets/subCategoriesData";
import colors from "@/assets/colors";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchSecondCategories } from "../../slices/categories/secondCategories";
import { fetchThirdCategories } from "../../slices/categories/thirdCategories";
import ThirdCategoryList from "./thirdCategoryList";

interface Category {
  id: string;
  title: string;
  img_url: string;
}

interface Props {
  categoryId: string;
  selectedCategory: Category;
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category | null>>;
}

interface SecondCategory {
  id: string,
  first_group_id: string,
  url: string,
  title: string,
  img_url: string,
  rank: string,
  isActive: string,
  isNext: string
}

const SubCategoryList: React.FC<Props> = ({ categoryId, selectedCategory, setSelectedCategory }) => {

  const dispatch = useDispatch<AppDispatch>();
  const { data, message, status, image_path } = useSelector((state: RootState) => state.secondCategory);
  const [selectedThird, setSelectedThird] = useState(false);
  const [secondVis, setSecondVis] = useState(true);
  const [secondId, setSecondId] = useState("");
  const third = useSelector((state: RootState) => state.thirdCategories);

  const handleSubCategoryPress = (item: SecondCategory) => {
    dispatch(fetchThirdCategories(item.id))
    console.log(item.id)  
    console.log(third.data)
    setSecondId(item.id)
    setSelectedThird(true);
    setSecondVis(false);
  }

  useEffect(() => {
    dispatch(fetchSecondCategories(categoryId));
  }, [dispatch, categoryId]);

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={() => handleSubCategoryPress(item)}>
      <View style={styles.item}>
        <Image source={{ uri: `${image_path}${item.img_url}` }} style={styles.image} />
        <Text style={styles.title}>{item.title} </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {status === 'error' && <Text style={styles.errorText}>{message}</Text>}
      {selectedCategory && secondVis && (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )}
      
      {selectedThird && (
        <ThirdCategoryList secondCategoryId={secondId}  />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 10,
    padding: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  item: {
    flex:1,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    height: 90,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width:600
  },
  title: {
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
    color: colors.darkgray
  },
  image: {
    width: 90,
    height: 40,
    marginRight: 10,
  },
  errorText: {
    color: 'red',
  },
});
export default SubCategoryList;
