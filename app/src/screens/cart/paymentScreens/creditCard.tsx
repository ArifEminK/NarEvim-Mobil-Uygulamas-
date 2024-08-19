import colors from '@/assets/colors'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { Button, FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/src/store/store';
import { fetchAddressList } from '@/app/src/slices/addressess/addressList';
import { fetchSelectAddress } from '@/app/src/slices/addressess/selectAddress';
interface Props {
    paymentPage: boolean;
    creditCard: boolean;
    setPaymentPage: React.Dispatch<React.SetStateAction<boolean>>;
    setCreditCard: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreditCart: React.FC<Props> = ({ paymentPage, creditCard, setPaymentPage, setCreditCard }) => {

    return (
        <View style={styles.container}>
            <View style={{ alignItems: "center", backgroundColor: colors.background, width: 300, height: 300, marginTop: 50, borderRadius: 15, borderColor: colors.specGray, borderWidth: 1 }}>
                <Text style={{ fontSize: 18, color: colors.darkgray, textAlign: "left" }}>Kart Sahibinin Adı</Text>
                <View style={{ backgroundColor: colors.background, width: 270, height: 50, marginTop: 10, borderRadius: 5, borderColor: colors.specGray, borderWidth: 1 }}>
                    <TextInput></TextInput>
                </View>
                <Text style={{ fontSize: 18, color: colors.darkgray, textAlign: "left" }}>Kart Numarası</Text>
                <View style={{ backgroundColor: colors.background, width: 270, height: 50, marginTop: 10, borderRadius: 5, borderColor: colors.specGray, borderWidth: 1 }}>
                    <TextInput></TextInput>
                </View>
                <View style={{ height: 200, flexDirection: "row", left:15, top:20 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 14, color: colors.darkgray, textAlign: "left" }}>Son Kullanım(Ay/Yıl)</Text>
                        <View style={{ backgroundColor: colors.background, width: 120, height: 50, marginTop: 10, borderRadius: 5, borderColor: colors.specGray, borderWidth: 1 }}>
                            <TextInput></TextInput>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 14, color: colors.darkgray, textAlign: "left" }}>Güvenlik Kodu(CVV)</Text>
                        <View style={{ backgroundColor: colors.background, width: 120, height: 50, marginTop: 10, borderRadius: 5, borderColor: colors.specGray, borderWidth: 1 }}>
                            <TextInput></TextInput>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ backgroundColor: colors.background, width: 300, height: 150, marginTop: 30, borderRadius: 15, borderColor: colors.specGray, borderWidth: 1, alignItems:"center" }}>
                <View style={{flex:1, alignItems:"center", marginTop:20,width:"80%", borderBottomColor:colors.specGray, borderBottomWidth:1}}>
                    <Text style={{fontSize:20, fontWeight:"600"}}>ÖDENECEK TUTAR</Text>
                </View>
                <View style={{height:20,marginTop:10, flexDirection:"row", justifyContent:"space-between"}}>
                    <Text style={{fontSize:16, fontWeight:"900"}}>NET TOPLAM</Text>
                    <Text style={{fontSize:16,marginLeft:50, fontWeight:"900"}}>NET</Text>
                </View>
                <View style={{flex:2, justifyContent:"flex-end", marginBottom:10}}>
                    <Button color={"#4535C1"} title='ÖDE'></Button>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

})
export default CreditCart