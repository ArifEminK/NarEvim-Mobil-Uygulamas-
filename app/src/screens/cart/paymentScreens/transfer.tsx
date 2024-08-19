import colors from '@/assets/colors'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { Button, FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/src/store/store';
import { fetchAddressList } from '@/app/src/slices/addressess/addressList';
import { fetchSelectAddress } from '@/app/src/slices/addressess/selectAddress';
import { fetchBankList } from '@/app/src/slices/order/bankList';
interface Props {
    paymentPage: boolean;
    creditCard: boolean;
    setPaymentPage: React.Dispatch<React.SetStateAction<boolean>>;
    setCreditCard: React.Dispatch<React.SetStateAction<boolean>>;
}
interface Bank {
    id: string,
    title: string,
    description: string,
    img_url: string,
    rank: string,
    isActive: string,
    createdAt: string,
}
const Transfer = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data, error_code, status, message } = useSelector((state: RootState) => state.bankList);

    useEffect(() => {
        dispatch(fetchBankList())
        console.log(data)
    }, [dispatch])

    return (
        <View style={styles.container}>
            <View style={styles.addressesContainer}>
                <View style={styles.topContainer}>
                    <View style={{flex:1}}>
                    <TouchableOpacity>
                        <Ionicons style={{marginLeft:15}} name="arrow-back" size={36} color={colors.primary} />
                    </TouchableOpacity>
                    </View>
                    <View style={{flex:9}}>
                    <Text style={styles.headText}>     Havale EFT</Text>
                    </View>
                </View>
                <View style={styles.midContainer}>
                    <View style={{ flex: 1, marginTop: 20 }}>
                        <Text style={{ fontSize: 16, color: colors.darkgray }}>3213510354684013</Text>
                        <Text style={{ fontSize: 16, color: colors.darkgray }}>Sipariş numarasını açıklamaya yazarak Eft/Havale işlemini gerçekleştirebilirsiniz.</Text>

                        {data.map((item) => (
                            <View style={{ marginTop: 20, height: 90, flexDirection: "column", alignItems: "flex-start", justifyContent: "center", borderWidth: 1, borderColor: colors.primary, borderRadius: 15, width: 360 }}>
                                <Text style={{ fontSize: 16, color: colors.darkgray }}>  {item.title}</Text>
                                <Text style={{ margin: 10, fontSize: 16, color: colors.darkgray }}>{item.description} </Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightgray,
        width:430
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
    midContainer: {
        flex: 10,
        backgroundColor: colors.background,
        borderRadius: 25,
        width: "90%",
        alignItems: "center"

    },

})
export default Transfer