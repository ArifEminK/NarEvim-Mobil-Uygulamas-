import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchThirdCategories } from '../../slices/categories/thirdCategories';
import { AppDispatch, RootState } from '../../store/store';
import { fetchFourthCategories } from '../../slices/categories/fourthCategories';

interface Props {
  thirdId: string;
}

const FourthCategoryList: React.FC<Props> = ({ thirdId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, image_path, message, status } = useSelector((state: RootState) => state.fourthCategories);

  useEffect(() => {
    dispatch(fetchFourthCategories(thirdId));
  }, [dispatch, thirdId]);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.item}>
      <Image source={{ uri: `${image_path}${item.img_url}` }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {status === 'error' && <Text style={styles.errorText}>{message} böyle bir kategori yok</Text>}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
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
    width:600
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

export default FourthCategoryList;
