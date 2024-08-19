import colors from '@/assets/colors'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { Button, FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/src/store/store';
import { fetchAddressList } from '@/app/src/slices/addressess/addressList';
import { fetchSelectAddress } from '@/app/src/slices/addressess/selectAddress';
import { fetchCreateOrder } from '@/app/src/slices/order/createOrder';
interface Props {
    orderNote: string;
    cargoId: number;
    paymentType: number;
}

const Order: React.FC<Props> = ({ orderNote, cargoId, paymentType }) => {
    const dispatch = useDispatch<AppDispatch>();
    const order = useSelector((state: RootState) => state.createOrder);

    useEffect(() => {
        dispatch(fetchCreateOrder({ payment_type: paymentType.toString(), cargo_id: cargoId.toString(), order_note: orderNote }))
        console.log(order)
    }, [dispatch])

    return (
        <View style={styles.container}>
            <View style={styles.addressesContainer}>
                <View style={styles.topContainer}>
                    <View style={{flex:1, marginLeft:10}}>
                        <TouchableOpacity>
                            <Ionicons name="arrow-back" size={36} color={colors.primary} />
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:9}}>
                        <Text style={styles.headText}>     Kapıda Ödeme</Text>
                    </View>
                </View>
                <View style={styles.midContainer}>
                    <View style={{ flex: 5 }}>
                        <Ionicons style={{ marginTop: 100 }} name="checkmark-done-circle-outline" size={124} color={colors.primary} />
                    </View>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: colors.primary, borderRadius: 15, width: "90%" }}>
                        <Text style={{ fontSize: 24, fontWeight: "900", color: colors.primary, }}>   Sipariş No: </Text>
                        <Text style={{ fontSize: 16, fontWeight: "700", color: colors.darkgray, }}> {order.order_number} </Text>
                    </View>
                    <View style={{ flex: 5 }}>
                        <Text style={{ fontSize: 16, color: colors.darkgray }}>Siparişiniz kargoya verildiğinde Sms ile bilgilendirileceksiniz.</Text>
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
        width: 420
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
export default Order