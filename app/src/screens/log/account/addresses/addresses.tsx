import colors from '@/assets/colors'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CreateAddress from './createAddress';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/src/store/store';
import { fetchAddressList } from '@/app/src/slices/addressess/addressList';
import { fetchRemoveAddress } from '@/app/src/slices/addressess/removeAddress';
import UpdateAddress from './updateAddress';
import { useFocusEffect } from 'expo-router';
interface Props {
    isAcPagVisible: boolean;
    isAddressesVisible: boolean;
    setIsAcPagVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setAddressesVisible: React.Dispatch<React.SetStateAction<boolean>>;
    email: string;
}
interface Address {
    id: string,
    name: string,
    surname: string,
    email: string,
    telephone: string,
    clear_address: string,
    city_id: string,
    town_id: string,
    city: string,
    town: string,
}
const Addresses: React.FC<Props> = ({ isAcPagVisible, isAddressesVisible, setIsAcPagVisible, setAddressesVisible, email }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [creAdrVisible, setCreAdrVisible] = useState(false);
    const [isAdrVis, setIsAdrVis] = useState(true);
    const [updAdrVisible, setUpdAdrVisible] = useState(false);
    const addresses = useSelector((state: RootState) => state.addressList)
    const removeAddress = useSelector((state: RootState) => state.removeAddress);
    const [adrressId, setAddressId] = useState("");

    useEffect(() => {
        dispatch(fetchAddressList());
    }, [dispatch, addresses])

    const backCLick = () => {
        setAddressesVisible(!isAddressesVisible);
        setIsAcPagVisible(!isAcPagVisible);
    }
    const createClick = () => {
        setIsAdrVis(false);
        setCreAdrVisible(true);
    }

    const handleUpdate = (id: string) => {
        setAddressId(id);
        setIsAdrVis(false);
        setUpdAdrVisible(true)
    }

    const handleRemove = (id: string) => {
        dispatch(fetchRemoveAddress(id))
        console.log(id)
        console.log(removeAddress.message)
    }
    const renderBrandItem = ({ item }: { item: Address }) => (
            <View style={styles.addressContainer}>
                <View style={{ flex: 1, backgroundColor: colors.background }}>
                    <TouchableOpacity onPress={() => handleUpdate(item.id)}>
                        <AntDesign name="question" size={36} color={colors.primary} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 6, backgroundColor: colors.background }}>
                    <Text style={{ fontSize: 18, color: colors.darkgray }}>{item.city} {item.town}</Text>
                    <Text style={{ fontSize: 12, color: colors.darkgray }}>   {item.clear_address}</Text>
                    <Text style={{ fontSize: 12, color: colors.darkgray }}>   {item.telephone}</Text>
                    <Text style={{ fontSize: 12, color: colors.darkgray }}>   {item.name} {item.surname}</Text>
                </View>
                <View style={{ flex: 1, backgroundColor: colors.background }}>
                    <TouchableOpacity onPress={() => handleRemove(item.id)}>
                        <FontAwesome name="trash" size={36} color={colors.primary} />
                    </TouchableOpacity>
                </View>
                <Text></Text>
            </View>
    );

    return (
        <View style={styles.container}>
            {isAdrVis && (
                <View style={styles.addressesContainer}>
                    <View style={styles.topContainer}>
                        <TouchableOpacity onPress={backCLick}>
                            <Ionicons name="arrow-back" size={36} color={colors.primary} />
                        </TouchableOpacity>
                        <Text style={styles.headText}>     Adreslerim</Text>
                        <TouchableOpacity onPress={createClick}>
                            <View style={{ width: 100, marginLeft: 55 }}>
                                <Text style={styles.headRightText}>Adres Ekle</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.midContainer}>
                        <FlatList
                            data={addresses.data}
                            renderItem={renderBrandItem}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    </View>
                </View>
            )}
            {creAdrVisible && (
                <CreateAddress email={email} creAdrVisible={creAdrVisible} setCreAdrVisible={setCreAdrVisible} isAdrVis={isAdrVis} setIsAdrVis={setIsAdrVis} />
            )}
            {updAdrVisible && (
                <UpdateAddress addressId={adrressId} email={email} updAdrVisible={updAdrVisible} setUpdAdrVisible={setUpdAdrVisible} isAdrVis={isAdrVis} setIsAdrVis={setIsAdrVis} />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightgray,
    },
    addressesContainer: {
        flex: 1,
        alignItems: "center",
        backgroundColor: colors.lightgray,
    },
    topContainer: {
        flex: 1,
        borderBottomColor: colors.lightgray,
        borderBottomWidth: 9,
        justifyContent: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.background,
        width: "100%"
    },
    headText: {
        color: colors.primary,
        fontSize: 24,
        fontWeight: "600"
    },
    headRightText: {
        fontSize: 16,
        color: colors.primary,
        right: -80,
        top: 2
    },
    midContainer: {
        flex: 10,
        backgroundColor: colors.background,
        borderRadius: 25,
        width: "95%"

    },
    addressContainer: {
        height: 100,
        backgroundColor: colors.background,
        borderRadius: 5,
        width: "90%",
        marginLeft: 20,
        marginTop: 20,
        borderColor: colors.gray,
        borderWidth: 1,
        flexDirection: "row"
    }
})
export default Addresses