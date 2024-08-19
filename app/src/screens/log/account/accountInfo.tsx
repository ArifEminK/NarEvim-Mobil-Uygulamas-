import colors from '@/assets/colors';
import { FontAwesome5 } from '@expo/vector-icons';
import React, { useEffect } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/src/store/store';
import { fetchMemberInfo } from '@/app/src/slices/account/accoInfo';

interface Props {
  isAcPagVisible: boolean,
  isInfoVisible: boolean,
  setIsAcPagVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setIsInfoVisible: React.Dispatch<React.SetStateAction<boolean>>,
}

const AccountInfo: React.FC<Props> = ({ isAcPagVisible, setIsAcPagVisible, isInfoVisible, setIsInfoVisible }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { data, status, message } = useSelector((state: RootState) => state.memberInfo);

  useEffect(() => {
    dispatch(fetchMemberInfo());
  }, [dispatch]);

  const handleBackPress = () => {
    setIsAcPagVisible(!isAcPagVisible)
    setIsInfoVisible(!isInfoVisible)
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.topContain}>
        <TouchableOpacity onPress={handleBackPress} >
          <FontAwesome5 style={{ marginLeft: 10 }} name="arrow-left" size={24} color="#DE3459" />
        </TouchableOpacity>
        <Text style={styles.headText}>    Kullanıcı Bilgileri</Text>
      </View>
      <View style={styles.midContain}>
        <View style={styles.textContain}>
          <MaterialCommunityIcons style={{ top: 10, left: 5 }} name="account-circle-outline" size={30} color={colors.primary} />
          <Text style={styles.text}>  İsim Soyisim : </Text>
          <Text style={styles.infoText}>{data.name} {data.surname}</Text>

        </View>

        <View style={styles.textContain}>
          <MaterialCommunityIcons style={{ top: 10, left: 5 }} name="email" size={30} color={colors.primary} />
          <Text style={styles.text}>  E-Posta Adresi : </Text>
          <Text style={styles.infoText}>{data.email} </Text>
        </View>
        <View style={styles.textContain}>
          <FontAwesome style={{ top: 10, left: 7 }} name="phone" size={30} color={colors.primary} />
          <Text style={styles.text}>   Telefon Numarası : </Text>
          <Text style={styles.infoText}>{data.telephone}</Text>
        </View>
        <FlatList data={data} renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={{ color: colors.primary, fontSize: 24 }}>{item.name}</Text>
          </View>
        )}
          keyExtractor={item => item.id.toString()} />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  topContain: {
    flex: 0.8,
    borderWidth: 1,
    borderColor: colors.lightgray,
    alignItems: "center",
    flexDirection: "row"
  },
  headText: {
    fontSize: 22,
    color: colors.primary,
    fontWeight: "600"
  },
  midContain: {
    flex: 9,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  textContain: {
    flex: 1,
    borderWidth: 1,
    marginBottom: 10,
    borderColor: colors.gray,
    borderRadius: 9,
    width: 350,
    maxHeight: 50,
    flexDirection: "row"
  },
  text: {
    fontSize: 18,
    color: colors.primary,
    textAlign: "left",
    height: 50,
    lineHeight: 50,
    fontWeight: '700',
  },
  infoText: {
    fontSize: 18,
    textAlign: "left",
    height: 50,
    lineHeight: 50,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
})

export default AccountInfo;