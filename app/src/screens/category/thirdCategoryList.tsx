import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchThirdCategories } from '../../slices/categories/thirdCategories';
import { AppDispatch, RootState } from '../../store/store';
import FourthCategoryList from './fourthCategoryList';

interface Props {
  secondCategoryId: string;
}
interface Category {
  id: string;
  name: string;
  title: string;
  img_url: string;
}
const ThirdCategoryList: React.FC<Props> = ({ secondCategoryId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, image_path, message, status } = useSelector((state: RootState) => state.thirdCategories);
  const [thirdId, setThirdId] = useState("");
  const [thirdVis, setThirdVis] = useState(true);
  const [fourthVis, setFourthVis] = useState(false);
  
  useEffect(() => {
    dispatch(fetchThirdCategories(secondCategoryId));
  }, [dispatch, secondCategoryId]);

  const handleThirdPress = (item:Category) => {
    setThirdId(item.id);
    setThirdVis(false);
    setFourthVis(true);
  }
  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={() => handleThirdPress(item.id)}>
      <View style={styles.item}>
        <Image source={{ uri: `${image_path}${item.img_url}` }} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {status === 'error' && <Text style={styles.errorText}>{message}</Text>}
      {thirdVis && (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )}
      {fourthVis && (
        <FourthCategoryList thirdId={thirdId}  />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    width: 600
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default ThirdCategoryList;
