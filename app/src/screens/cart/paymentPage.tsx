import colors from '@/assets/colors'
import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Button } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchCargoList } from '../../slices/addressess/cargoList';
import { fetchPaymentTypes } from '../../slices/addressess/paymentTypes';
import CreditCart from './paymentScreens/creditCard';
import Order from './paymentScreens/order';
import Transfer from './paymentScreens/transfer';

interface Cargo {
    id: string,
    title: string,
}
interface Payment {
    id: string,
    payment_id: string,
}
interface Props {
    isAdrVis: boolean;
    isPaymentVis: boolean;
    setIsPaymentVis: React.Dispatch<React.SetStateAction<boolean>>;
    setIsAdrVis: React.Dispatch<React.SetStateAction<boolean>>;
}
const PaymentPage: React.FC<Props> = ({ isAdrVis, isPaymentVis, setIsPaymentVis, setIsAdrVis }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [headText, setHeadText] = useState("Ödemi Yöntemi - Kargo");
    const [paymentPage, setPaymentPage] = useState(true);
    const [paymentPage2, setPaymentPage2] = useState(true);
    const [creditCard, setCreditCard] = useState(false);
    const [transfer, setTransfer] = useState(false);
    const [order, setOrder] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(0);
    const [selectedCargo, setSelectedCargo] = useState(1);
    const cargoList = useSelector((state: RootState) => state.cargoList);
    const payments = useSelector((state: RootState) => state.paymentTypes);
    const [orderNote, setOrderNote] = useState("");
    useEffect(() => {
        dispatch(fetchCargoList());
        dispatch(fetchPaymentTypes());
    }, [dispatch]);

    const cargoOptions = cargoList.data.map((cargo: Cargo) => ({
        label: cargo.title,
        value: cargo.id,
    }));
    const paymentOptions = payments.data.map((payment: Payment) => ({
        label: payment.payment_id,
        value: payment.id,
    }))

    const handlePress = () => {
        setPaymentPage(false);
        if (selectedPaymentMethod == 0) {
            console.log(selectedPaymentMethod)
            setHeadText("Kredi Kartı");
            setCreditCard(!creditCard);
        }
        if (selectedPaymentMethod == 1) {
            console.log(creditCard)
            setHeadText("Kapıda Ödeme");
            setPaymentPage2(false);
            setOrder(true);
        }
        if (selectedPaymentMethod == 2) {
            setHeadText("Havale - EFT");
            setPaymentPage2(false);
            setTransfer(true);
        }
    }

    const handleBackClick = () => {
        setIsPaymentVis(!isPaymentVis);
        setIsAdrVis(!isAdrVis);
    }

    return (
        <View style={{ flex: 1 }}>
            {paymentPage2 && (
                <View style={styles.topContainer}>
                    <TouchableOpacity onPress={handleBackClick} >
                        <Ionicons name="arrow-back" size={36} color={colors.primary} />
                    </TouchableOpacity>
                    <Text style={styles.headText}>     {headText}</Text>
                </View>
            )}
            <View style={{ flex: 10, backgroundColor: colors.background, alignItems: "center" }}>
                {paymentPage && (
                    <View style={styles.midContainer}>
                        <View style={{ flex: 1, width: "80%", backgroundColor: colors.background }}>
                            <Text style={{ fontSize: 16, color: colors.gray, textAlign: "left", marginTop: 50 }}>Ödeme Yöntemi Seçin :</Text>
                            <View style={styles.pickerContainer}>
                                <RNPickerSelect
                                    onValueChange={(value) => setSelectedPaymentMethod(value)}
                                    items={paymentOptions}
                                    style={pickerSelectStyles}
                                    placeholder={{}}
                                />

                            </View>
                            <Text style={{ fontSize: 16, color: colors.gray, textAlign: "left", marginTop: 50 }}>Kargo Firması Seçin :</Text>
                            <View style={styles.pickerContainer}>
                                <RNPickerSelect
                                    onValueChange={(value) => setSelectedCargo(value)}
                                    items={cargoOptions}
                                    style={pickerSelectStyles}
                                    placeholder={{}} />
                            </View>
                            <Text style={{ fontSize: 20, fontWeight: "800", color: colors.gray, marginTop: 20 }} >Kupon Kodu Ekle</Text>
                            <View style={{ flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", height: 50, marginTop: 20 }}>
                                <TextInput style={styles.input} placeholder='  Kupon Kodu' />
                                <TouchableOpacity>
                                    <View style={{ height: 10, backgroundColor: colors.primary, width: 70, flex: 1, justifyContent: "center", alignItems: "center", borderRadius: 15, }}>
                                        <Text style={{ fontSize: 16, color: "white" }}>Uygula</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <Text style={{ fontSize: 20, fontWeight: "800", color: colors.gray, marginTop: 20 }} >Eklemek istediğiniz not var mı?</Text>
                            <View style={{ flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", height: 50, marginTop: 20 }}>
                                <TextInput value={orderNote} onChangeText={setOrderNote} style={styles.noteInput} placeholder='  Not' />
                            </View>
                            <View style={{ alignItems: "center", justifyContent: "center", height: 50, marginTop: 20 }}>
                                <TouchableOpacity onPress={handlePress}>
                                    <View style={{ flex: 1, width: 320, backgroundColor: colors.primary, justifyContent: "center", alignItems: "center", borderRadius: 15, }}>
                                        <Text style={{ fontSize: 20, fontWeight: "700", color: "white" }}>Ödeme Ekranı</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                )}
                {creditCard && (
                    <CreditCart paymentPage={paymentPage} creditCard={creditCard} setPaymentPage={setPaymentPage} setCreditCard={setCreditCard} />
                    // <View style={{flex:1, backgroundColor:"red"}}>
                    //     <Text> denemes</Text>
                    // </View>
                )}
                {order && (
                    <Order paymentType ={selectedPaymentMethod} cargoId ={selectedCargo} orderNote={orderNote}/>
                )}
                {transfer && (
                    <Transfer />
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    topContainer: {
        flex: 1,
        backgroundColor: colors.background,
        flexDirection: "row",
        alignItems: "center"
    },
    headText: {
        color: colors.primary,
        fontSize: 24,
        fontWeight: "600",
        marginBottom: 10
    },
    midContainer: {
        flex: 1,
        width: "95%",
        backgroundColor: colors.background,
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 10,
        alignItems: "center"
    },
    pickerContainer: {
        borderWidth: 2,
        borderColor: colors.primary,
        borderRadius: 4,
        height: 50,
        width: "100%",
        justifyContent: "center",
    },
    input: {
        height: 50,
        borderColor: colors.gray,
        borderWidth: 1,
        borderRadius: 5,
        width: "70%",
        marginTop: 15
    },
    noteInput: {
        height: 50,
        borderColor: colors.gray,
        borderWidth: 1,
        borderRadius: 5,
        width: "100%",
        marginTop: 15
    }
})
const pickerSelectStyles = StyleSheet.create({

    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 48,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,
        left: 40,
        width: "85%",
        borderColor: colors.primary,
        borderWidth: 5
    },
});
export default PaymentPage
