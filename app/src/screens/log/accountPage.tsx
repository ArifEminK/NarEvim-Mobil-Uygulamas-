import React, { useState } from 'react'
import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import Account from './account';
import colors from '@/assets/colors';
import { Fontisto } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store, { AppDispatch, LogoutState, RootState } from '../../store/store';
import { fetchLogout } from '../../slices/account/logOutSlice';
import AccountInfo from './account/accountInfo';
import { ReactDOM } from 'react';
import ChangePassword from './account/changePass';
import Addresses from './account/addresses/addresses';
import Orders from './account/orders';
import FavoriteProds from './account/FavoriteProds';
import { useFocusEffect } from 'expo-router';


interface Info {
  id: string,
  member_code: string,
  member_type: string,
  identitiy: string,
  name: string,
  second_name: string,
  surname: string,
  telephone: string,
  email: string,
  password: string,
  tax_address: string,
  tax_number: string,
  special_cargo: string,
  token: string,
  isNews: string,
  isActive: string,
  isStandartCargo: string,
  isSpecialCargo: string,
  createdAt: string,
}

interface Props {
  isAcoVisible: boolean;
  isAcoPagVisible: boolean;
  setIsAcoVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAcoPagVisible: React.Dispatch<React.SetStateAction<boolean>>;
  data: {
    name: string;
    surname: string;
    telephone: string;
    email: string;
  };
}

const AccountPage: React.FC<Props> = ({ data, isAcoPagVisible, isAcoVisible, setIsAcoPagVisible, setIsAcoVisible }) => {
  const dispatch = useDispatch<AppDispatch>();
  const logoutData = useSelector((state: LogoutState) => state.logout);
  const [isAcPagVisible, setIsAcPagVisible] = useState(true);
  const [isOrdersVisible, setOrdersVisible] = useState(false);
  const [isFavorittesVisible, setFavorittesVisible] = useState(false);
  const [isAddressesVisible, setAddressesVisible] = useState(false);
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [isChaPagVisible, setIsChaPagVisible] = useState(false);

  const handleOrdersClick = () => {
    setIsAcPagVisible(!isAcPagVisible);
    setOrdersVisible(!isOrdersVisible);
  }
  const handleFavorittesClick = () => {
    setIsAcPagVisible(!isAcPagVisible);
    setFavorittesVisible(!isFavorittesVisible);
  }
  const handleAddressesClick = () => {
    setIsAcPagVisible(!isAcPagVisible);
    setAddressesVisible(!isAddressesVisible);
  }
  const handleInfoClick = () => {
    setIsAcPagVisible(!isAcPagVisible);
    setIsInfoVisible(!isInfoVisible);
  }
  const handleChaPassClick = () => {
    setIsAcPagVisible(!isAcPagVisible);
    setIsChaPagVisible(!isChaPagVisible);
  }
  const handleLogout = () => {
    setIsAcoPagVisible(!isAcoPagVisible);
    setIsAcoVisible(!isAcoVisible);
    dispatch(fetchLogout());
  }
  useFocusEffect(
    React.useCallback(() => {
      setOrdersVisible(false);
      setFavorittesVisible(false);
      setAddressesVisible(false);
      setIsInfoVisible(false);
      setIsChaPagVisible(false);
      setIsAcPagVisible(true);
    }, [])
  )
  return (
    <View style={styles.container}>
      {isAcoPagVisible && isAcPagVisible && (
        <View style={styles.topContainer}>
          {/* <Text style={styles.headerText}>{data.email}</Text> */}
        </View>
      )}
      {isAcoPagVisible && isAcPagVisible && (

        <View style={styles.midContainer}>

          <Image style={styles.imgContain} resizeMode='contain' source={require("../../../../assets/images/logo2.png")} />


          <TouchableOpacity onPress={handleOrdersClick} style={[styles.touchContain, { marginTop: -90 }]}>
            <View style={[styles.listContain]}>
              <Fontisto name="history" size={24} color="black" />
              <Text style={styles.midText}>         Siparişlerim</Text>
              <Entypo name="arrow-with-circle-right" size={30} color="black" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleFavorittesClick} style={styles.touchContain}>
            <View style={styles.listContain}>
              <AntDesign name="heart" size={24} color="black" />
              <Text style={styles.midText}>        Favorilerim</Text>
              <Entypo name="arrow-with-circle-right" size={30} color="black" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleAddressesClick} style={styles.touchContain}>
            <View style={styles.listContain}>
              <FontAwesome6 name="location-dot" size={24} color="black" />
              <Text style={styles.midText}>        Adreslerim</Text>
              <Entypo name="arrow-with-circle-right" size={30} color="black" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleInfoClick} style={styles.touchContain}>
            <View style={styles.listContain}>
              <FontAwesome5 name="user-edit" size={24} color="black" />
              <Text style={styles.midText}>               Kullanıcı Bilgileri</Text>
              <Entypo name="arrow-with-circle-right" size={30} color="black" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleChaPassClick} style={styles.touchContain}>
            <View style={styles.listContain}>
              <MaterialCommunityIcons name="key" size={24} color="black" />
              <Text style={styles.midText}>         Şifre değiştir</Text>
              <Entypo name="arrow-with-circle-right" size={30} color="black" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogout} style={[styles.touchContain, { marginBottom: 100 }]}>
            <View style={[styles.listContain]}>
              <AntDesign name="logout" size={24} color="black" />
              <Text style={styles.midText}>   Çıkış yap</Text>
              <Entypo name="arrow-with-circle-right" size={30} color="black" />
            </View>
          </TouchableOpacity>

        </View>
      )}
      {isOrdersVisible && (
        <Orders isOrdersVisible={isOrdersVisible} setOrdersVisible={setOrdersVisible} isAcPagVisible={isAcPagVisible} setIsAcPagVisible={setIsAcPagVisible}/>
      )}
      {isFavorittesVisible && (
        <FavoriteProds isFavorittesVisible={isFavorittesVisible} setFavorittesVisible={setFavorittesVisible} isAcPagVisible={isAcPagVisible} setIsAcPagVisible={setIsAcPagVisible}/>
      )}
      {isAddressesVisible && (
        <Addresses email={data.email} isAddressesVisible={isAddressesVisible} setAddressesVisible={setAddressesVisible} isAcPagVisible={isAcPagVisible} setIsAcPagVisible={setIsAcPagVisible} />
      )}
      {isInfoVisible && (
          <AccountInfo isInfoVisible={isInfoVisible} setIsInfoVisible={setIsInfoVisible} isAcPagVisible={isAcPagVisible} setIsAcPagVisible={setIsAcPagVisible} />
      )}
      {isChaPagVisible && (
        <ChangePassword isChaPagVisible={isChaPagVisible} setIsChaPagVisible={setIsChaPagVisible} isAcPagVisible={isAcPagVisible} setIsAcPagVisible={setIsAcPagVisible} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  topContainer: {
    flex: 1,
    borderWidth: 2,
    borderColor: colors.lightgray,
    justifyContent: "center"
  },
  midContainer: {
    flex: 15,
    alignItems: "center"
  },
  headerText: {
    fontSize: 20,
    color: colors.primary,
    left: 10
  },
  imgContain: {
    width: 300,
    height: 300,
    marginTop: -50
  },
  midText: {
    fontSize: 24,
    color: colors.gray,
    marginLeft: -120
  },
  listContain: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    width: 300
  },
  touchContain: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    width: 320
  }


})
export default AccountPage;