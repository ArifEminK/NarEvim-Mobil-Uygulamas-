import colors from '@/assets/colors'
import { Entypo, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import { useDispatch, useSelector } from 'react-redux';
import { AddressDetailState, AddressState, AppDispatch, RootState } from '@/app/src/store/store';
import { fetchCities } from '@/app/src/slices/addressess/city';
import { fetchTown } from '@/app/src/slices/addressess/town';
import { fetchCreateAddress } from '@/app/src/slices/addressess/createAddress';
import { fetchUpdateAddress } from '@/app/src/slices/addressess/updateAddress';
import { fetchSelectAddress } from '@/app/src/slices/addressess/selectAddress';
import { fetchAddressDetail } from '@/app/src/slices/addressess/addressDetail';

interface City {
    id: string,
    title: string,
}
interface Town {
    id: string,
    title: string,
}
interface Props {
    updAdrVisible: boolean;
    isAdrVis: boolean;
    setUpdAdrVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setIsAdrVis: React.Dispatch<React.SetStateAction<boolean>>;
    email: string;
    addressId: string;
}

const UpdateAddress: React.FC<Props> = ({ updAdrVisible, isAdrVis, setUpdAdrVisible, setIsAdrVis, email, addressId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const cities = useSelector((state: RootState) => state.cities);
    const towns = useSelector((state: RootState) => state.towns.data);
    const addressDetail = useSelector((state: AddressDetailState) => state.addressDetail);

    const [selectedCity, setSelectedCity] = useState("");
    const [selectedTown, setSelectedTown] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [townOptions, setTownOptions] = useState<{ label: string, value: string }[]>([]);

    const [name, setName] = useState("");
    const [surname, setSurName] = useState("");
    const [telephone, setTelephone] = useState("");
    const [clearAddress, setClearAddress] = useState("");
    const [billingName, setBillingName] = useState("");
    const [billingSurname, setBillingSurname] = useState("");
    const [billingTelephone, setBillingTelephone] = useState("");
    const [billingCity, setBillingCity] = useState("");
    const [billingTown, setBillingTown] = useState("");
    const [billingClearAddress, setBillingClearAddress] = useState("");

    useEffect(() => {
        dispatch(fetchCities());
        dispatch(fetchAddressDetail({ address_id: addressId }))
        console.log(addressDetail.data)
        console.log(addressDetail.data?.name)
    }, [dispatch])

    useEffect(() => {
        if (addressDetail.data) {
            setName(addressDetail.data.name);
            setSurName(addressDetail.data.surname);
            setTelephone(addressDetail.data.telephone);
            setClearAddress(addressDetail.data.clear_address);
            setSelectedCity(addressDetail.data.city);
            setSelectedTown(addressDetail.data.town);
            setBillingName(addressDetail.data.billing_name);
            setBillingSurname(addressDetail.data.billing_surname);
            console.log(addressDetail.data?.name)
        }
    }, [addressDetail.data]);

    useEffect(() => {
        if (selectedCity) {
            dispatch(fetchTown(selectedCity));
        }
    }, [selectedCity, dispatch]);

    useEffect(() => {
        if (towns) {
            setTownOptions(towns.map((town: Town) => ({
                label: town.title,
                value: town.id,
            })));
        } else {
            setTownOptions([]);
        }
    }, [towns]);

    const cityOptions = cities.data.map((city: City) => ({
        label: city.title,
        value: city.id,
    }));

    const handleChecked = () => {
        if (isChecked == true) {
            setIsChecked(false)

        }
        if (isChecked == false) {
            setIsChecked(!isChecked)
            styles.adrContainer.borderBottomWidth = 2
        }
    };
    const handleBackClick = () => {
        setUpdAdrVisible(!updAdrVisible);
        setIsAdrVis(!isAdrVis);
    }
    const handleUpdateAddress = () => {
        dispatch(fetchUpdateAddress({
            name: name,
            surname: surname,
            email: email,
            telephone: telephone,
            city: selectedCity,
            town: selectedTown,
            clear_address: clearAddress,
            billing_name: billingName,
            billing_surname: billingSurname,
            billing_email: email,
            billing_telephone: billingTelephone,
            billing_city: billingCity,
            billing_town: billingTown,
            billing_clear_address: billingClearAddress,
            address_id: addressId,
        }))
        setUpdAdrVisible(!updAdrVisible);
        setIsAdrVis(!isAdrVis);
    }
    return (

        <ScrollView style={styles.container}>
            {updAdrVisible && (
                <View style={styles.container}>
                    <View style={styles.topContainer}>
                        <TouchableOpacity onPress={handleBackClick} >
                            <Ionicons name="arrow-back" size={36} color={colors.primary} />
                        </TouchableOpacity>
                        <Text style={styles.headText}>     Adres Güncelle</Text>

                    </View>
                    <View style={styles.midContainer}>
                        <View style={styles.conContainer}>
                            <View style={{ flex: 1, borderBottomColor: colors.lightgray, borderBottomWidth: 2 }}>
                                <Text style={{ fontSize: 16, color: colors.darkgray, textAlign: "left" }}>       İletişim Bilgileri</Text>
                            </View>
                            <View style={{ flex: 2, flexDirection: "row", alignItems: "center" }}>
                                <FontAwesome name="user-circle" style={{ left: 5 }} size={40} color={colors.primary} />
                                <View style={{ flex: 1, flexDirection: "row", borderColor: colors.gray, borderWidth: 1, borderRadius: 5, width: "80%", height: 50, margin: 15 }}>
                                    <TextInput value={name} onChangeText={setName} style={{ margin: 10 }} placeholder='Ad' />
                                </View>
                            </View>
                            <View style={{ flex: 2, marginTop: -40, flexDirection: "row", alignItems: "center" }}>
                                <View style={{ flex: 1, flexDirection: "row", borderColor: colors.gray, borderWidth: 1, borderRadius: 5, width: "80%", height: 50, margin: 35, left: 18 }}>
                                    <TextInput value={surname} onChangeText={setSurName} style={{ margin: 10 }} placeholder='Soyad' />
                                </View>
                            </View>
                            <View style={{ flex: 2, marginTop: -45, flexDirection: "row", alignItems: "center" }}>
                                <FontAwesome name="phone" style={{ left: 5 }} size={40} color={colors.primary} />
                                <View style={{ flex: 1, flexDirection: "row", borderColor: colors.gray, borderWidth: 1, borderRadius: 5, width: "80%", height: 50, margin: 22 }}>
                                    <TextInput value={telephone} onChangeText={setTelephone} style={{ margin: 10 }} placeholder='Telefon' />
                                </View>
                            </View>
                        </View>
                        <View style={styles.adrContainer}>
                            <View style={{ flexDirection: "row", alignItems: "center", flex: 1.9, borderBottomColor: colors.lightgray, borderBottomWidth: 2 }}>
                                <MaterialIcons name="location-on" size={40} color={colors.primary} />
                                <Text style={{ fontSize: 16, color: colors.darkgray, textAlign: "left" }}>       Adres Bilgileri</Text>
                            </View>
                            <Text style={styles.label}>        Şehir Seçin</Text>
                            <RNPickerSelect
                                onValueChange={(value) => {
                                    setSelectedCity(value);
                                    setSelectedTown(""); // İlçe seçimini sıfırla
                                }}
                                items={cityOptions}
                                style={pickerSelectStyles}
                                placeholder={{ label: 'Şehir seçin...', value: null }}
                            />
                            <Text style={styles.label}>        İlçe Seçin</Text>
                            <RNPickerSelect
                                onValueChange={(value) => setSelectedTown(value)}
                                items={townOptions}
                                style={pickerSelectStyles}
                                placeholder={{ label: 'İlçe seçin...', value: null }}
                            />
                            <View style={{ flex: 3, flexDirection: "row", alignItems: "center" }}>
                                <FontAwesome name="building" style={{ left: 10 }} size={30} color={colors.primary} />
                                <View style={{ flex: 1, flexDirection: "row", borderColor: colors.gray, borderWidth: 1, borderRadius: 5, width: "80%", height: 50, margin: 22 }}>
                                    <TextInput value={clearAddress} onChangeText={setClearAddress} style={{ margin: 10 }} placeholder='Adres' />
                                </View>
                            </View>

                        </View>
                    </View>
                    {isChecked && (
                        <View style={{ flex: 1, backgroundColor: colors.background }}>
                            <View style={styles.midContainer}>
                                <View style={styles.conContainer}>
                                    <View style={{ flexDirection: "row", height: 40, alignItems: "center" }}>
                                        <FontAwesome5 style={{ marginLeft: 10 }} name="file-invoice-dollar" size={36} color={colors.primary} />
                                        <Text style={{ fontSize: 24, marginLeft: 10, color: "#373A40", textAlign: "left", borderBottomWidth: 1.5, borderBottomColor: colors.primary }}> Fatura Bilgileri</Text>
                                    </View>
                                    <View style={{ flex: 1, borderBottomColor: colors.lightgray, borderBottomWidth: 2 }}>
                                        <Text style={{ fontSize: 16, color: colors.darkgray, textAlign: "left" }}>       İletişim Bilgileri</Text>
                                    </View>
                                    <View style={{ flex: 2, flexDirection: "row", alignItems: "center" }}>
                                        <FontAwesome name="user-circle" style={{ left: 5 }} size={40} color={colors.primary} />
                                        <View style={{ flex: 1, flexDirection: "row", borderColor: colors.gray, borderWidth: 1, borderRadius: 5, width: "80%", height: 50, margin: 15 }}>
                                            <TextInput value={billingName} onChangeText={setBillingName} style={{ margin: 10 }} placeholder='Ad' />
                                        </View>
                                    </View>
                                    <View style={{ flex: 2, marginTop: -40, flexDirection: "row", alignItems: "center" }}>
                                        <View style={{ flex: 1, flexDirection: "row", borderColor: colors.gray, borderWidth: 1, borderRadius: 5, width: "80%", height: 50, margin: 35, left: 18 }}>
                                            <TextInput value={billingSurname} onChangeText={setBillingSurname} style={{ margin: 10 }} placeholder='Soyad' />
                                        </View>
                                    </View>
                                    <View style={{ flex: 2, marginTop: -45, flexDirection: "row", alignItems: "center" }}>
                                        <FontAwesome name="phone" style={{ left: 5 }} size={40} color={colors.primary} />
                                        <View style={{ flex: 1, flexDirection: "row", borderColor: colors.gray, borderWidth: 1, borderRadius: 5, width: "80%", height: 50, margin: 22 }}>
                                            <TextInput value={billingTelephone} onChangeText={setBillingTelephone} style={{ margin: 10 }} placeholder='Telefon' />
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.adrContainer}>
                                    <View style={{ flexDirection: "row", alignItems: "center", flex: 1.9, borderBottomColor: colors.lightgray, borderBottomWidth: 2 }}>
                                        <MaterialIcons name="location-on" size={40} color={colors.primary} />
                                        <Text style={{ fontSize: 16, color: colors.darkgray, textAlign: "left" }}> Adres Bilgileri</Text>
                                    </View>
                                    <Text style={styles.label}>        Şehir Seçin</Text>
                                    <RNPickerSelect
                                        onValueChange={(value) => {
                                            setBillingCity(value);
                                            setSelectedTown(""); // İlçe seçimini sıfırla
                                        }}
                                        items={cityOptions}
                                        style={pickerSelectStyles}
                                        placeholder={{ label: 'Şehir seçin...', value: null }}
                                    />
                                    <Text style={styles.label}>        İlçe Seçin</Text>
                                    <RNPickerSelect
                                        onValueChange={(value) => setBillingTown(value)}
                                        items={townOptions}
                                        style={pickerSelectStyles}
                                        placeholder={{ label: 'İlçe seçin...', value: null }}
                                    />
                                    <View style={{ flex: 3, flexDirection: "row", alignItems: "center" }}>
                                        <FontAwesome name="building" style={{ left: 10 }} size={30} color={colors.primary} />
                                        <View style={{ flex: 1, flexDirection: "row", borderColor: colors.gray, borderWidth: 1, borderRadius: 5, width: "80%", height: 50, margin: 22 }}>
                                            <TextInput value={billingClearAddress} onChangeText={setBillingClearAddress} style={{ margin: 10 }} placeholder='Adres' />
                                        </View>
                                    </View>

                                </View>
                            </View>
                        </View>
                    )}
                    <View style={{ flex: 3, width: "80%", justifyContent: "center", alignItems: "center" }}>
                        <View style={{ flex: 0.3, flexDirection: "row", alignItems: "flex-end" }}>
                            <TouchableOpacity onPress={handleChecked}>
                                {!isChecked && (
                                    <Ionicons style={{ top: 15 }} name="checkmark-circle" size={30} color={colors.primary} />
                                )}
                                {isChecked && (
                                    <Entypo style={{ top: 15 }} name="circle" size={30} color={colors.primary} />
                                )}
                            </TouchableOpacity>
                            <Text style={styles.label}>  Faturam aynı adrese gönderilsin</Text>
                        </View>

                        <View style={{ width: "100%", marginTop: 20, left: 40, height: 40, backgroundColor: colors.primary, borderRadius: 6, justifyContent: "center" }}>
                            <TouchableOpacity onPress={handleUpdateAddress}>
                                <Text style={{ color: "white", fontSize: 24, textAlign: "center", fontWeight: "600" }}>Kaydet ve Güncelle</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: colors.background,
    },
    container: {
        flex: 1,
        backgroundColor: colors.background,

    },
    checkbox: {
        alignSelf: 'center',
    },
    topContainer: {
        flex: 1,
        borderBottomColor: colors.lightgray,
        borderBottomWidth: 9,
        justifyContent: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.background,
        width: "100%",
        marginTop: 30
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
    },
    conContainer: {
        flex: 1,
        marginVertical: 10
    },
    adrContainer: {
        flex: 1.8,
        marginTop: 1,
        borderBottomColor: colors.darkgray,
        borderBottomWidth: 0

    },
    label: {
        fontSize: 16,
        marginTop: 20,
        marginBottom: -10,
    },
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
        width: "85%"
    },
});
export default UpdateAddress;