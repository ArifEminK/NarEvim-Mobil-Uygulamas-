import colors from '@/assets/colors'
import { Entypo, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import { useDispatch, useSelector } from 'react-redux';
import { AddressState, AppDispatch, RootState } from '@/app/src/store/store';
import { fetchCities } from '@/app/src/slices/addressess/city';
import town, { fetchTown } from '@/app/src/slices/addressess/town';
import { fetchCreateAddress } from '@/app/src/slices/addressess/createAddress';
import { fetchBillTown } from '@/app/src/slices/addressess/billTowns';

interface City {
    id: string,
    title: string,
}
interface Town {
    id: string,
    title: string,
}
interface Props {
    creAdrVisible: boolean;
    isAdrVis: boolean;
    setCreAdrVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setIsAdrVis: React.Dispatch<React.SetStateAction<boolean>>;
    email: string;
}

const CreateAddress: React.FC<Props> = ({ creAdrVisible, isAdrVis, setCreAdrVisible, setIsAdrVis, email }) => {
    const dispatch = useDispatch<AppDispatch>();
    const cities = useSelector((state: RootState) => state.cities)
    const towns = useSelector((state: RootState) => state.towns.data);
    const billTowns = useSelector((state: RootState) => state.billTowns.data);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedTown, setSelectedTown] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [townOptions, setTownOptions] = useState<{ label: string, value: string }[]>([]);
    const [billTownOptions, setBillTownOptions] = useState<{ label: string, value: string }[]>([]);
    const createAddressData = useSelector((state: AddressState) => state.createAddress);
    const [name, setName] = useState("");
    const [surname, setSurName] = useState("");
    const [telephone, setTelephone] = useState("");
    const [clearAddress, setClearAddress] = useState("");
    const [billingName, setBillingName] = useState("");
    const [billingSurname, setBillingSurname] = useState("");
    const [billingEmail, setBillingEmail] = useState("");
    const [billingTelephone, setBillingTelephone] = useState("");
    const [billingCity, setBillingCity] = useState("");
    const [billingTown, setBillingTown] = useState("");
    const [billingClearAddress, setBillingClearAddress] = useState("");


    useEffect(() => {
        dispatch(fetchCities());
    }, [dispatch]);

    const cityOptions = cities.data.map((city: City) => ({
        label: city.title,
        value: city.id,
    }));

    const handleChecked = () => {
        setIsChecked(!isChecked);
    };

    const handleBackClick = () => {
        setCreAdrVisible(!creAdrVisible);
        setIsAdrVis(!isAdrVis);
    };
    const handleAddressCity = (selectedCity: string) => {
        dispatch(fetchTown(selectedCity));
        if (towns) {
            setTownOptions(towns.map((town: Town) => ({
                label: town.title,
                value: town.id,
            })));
            console.log("first")
        } else {
            setTownOptions([]);
        }
    }

    const handleBillAddress = (billing_city: string) => {
        dispatch(fetchBillTown(billing_city));
        if (billTowns) {
            setBillTownOptions(billTowns.map((town: Town) => ({
                label: town.title,
                value: town.id
            })));
        } else {
            setBillTownOptions([]);
        }
    }

    const handleSaveAddress = () => {
        const addressPayload = {
            name,
            surname,
            email,
            telephone,
            city: selectedCity,
            town: selectedTown,
            clear_address: clearAddress,
            billing_name: isChecked ? billingName : name,
            billing_surname: isChecked ? billingSurname : surname,
            billing_email: isChecked ? billingEmail : email,
            billing_telephone: isChecked ? billingTelephone : telephone,
            billing_city: isChecked ? billingCity : selectedCity,
            billing_town: isChecked ? billingTown : selectedTown,
            billing_clear_address: isChecked ? billingClearAddress : clearAddress,
        };

        dispatch(fetchCreateAddress(addressPayload));
        console.log(createAddressData.message);
    };

    return (
        <ScrollView style={styles.container}>
            {creAdrVisible && (
                <View style={styles.container}>
                    <View style={styles.topContainer}>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity onPress={handleBackClick}>
                                <Ionicons name="arrow-back" size={36} color={colors.primary} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 9 }}>
                            <Text style={styles.headText}>Adres Ekle</Text>
                        </View>
                    </View>
                    <View style={styles.midContainer}>
                        <View style={styles.conContainer}>
                            <View style={{ flex: 1, borderBottomColor: colors.lightgray, borderBottomWidth: 2 }}>
                                <Text style={{ fontSize: 16, color: colors.darkgray, textAlign: "left" }}>İletişim Bilgileri</Text>
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
                                <Text style={{ fontSize: 16, color: colors.darkgray, textAlign: "left" }}>Adres Bilgileri</Text>
                            </View>
                            <Text style={styles.label}>Şehir Seçin</Text>
                            <RNPickerSelect

                                onValueChange={(value) => {
                                    setSelectedCity(value);
                                    setSelectedTown("");
                                    handleAddressCity(value);
                                }}
                                items={cityOptions}
                                style={pickerSelectStyles}
                                placeholder={{ label: 'Şehir seçin...', value: null }}
                            />
                            <Text style={styles.label}>İlçe Seçin</Text>
                            <RNPickerSelect
                                onValueChange={(value) => setSelectedTown(value)}
                                items={townOptions}
                                style={pickerSelectStyles}
                                placeholder={{ label: 'İlçe seçin...', value: null }}
                            />
                            <View style={{ flex: 2, flexDirection: "row", alignItems: "center" }}>
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
                                    <View style={{ flex: 1, borderBottomColor: colors.lightgray, borderBottomWidth: 2 }}>
                                        <Text style={{ fontSize: 16, color: colors.darkgray, textAlign: "left" }}>Fatura Bilgileri</Text>
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
                                        <Text style={{ fontSize: 16, color: colors.darkgray, textAlign: "left" }}>Fatura Adresi</Text>
                                    </View>
                                    <Text style={styles.label}>Şehir Seçin</Text>
                                    <RNPickerSelect
                                        onValueChange={(value) => {
                                            setBillingCity(value);
                                            setBillingTown("");
                                            handleBillAddress(value);
                                        }}
                                        items={cityOptions}
                                        style={pickerSelectStyles}
                                        placeholder={{ label: 'Şehir seçin...', value: null }}
                                    />
                                    <Text style={styles.label}>İlçe Seçin</Text>
                                    <RNPickerSelect
                                        onValueChange={(value) => setBillingTown(value)}
                                        items={billTownOptions}
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
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: colors.background, margin: 5 }}>
                        <TouchableOpacity style={styles.checkContainer} onPress={handleChecked}>
                            {!isChecked && (
                                <Ionicons style={{ top: 15 }} name="checkmark-circle" size={30} color={colors.primary} />
                            )}
                            {isChecked && (
                                <Entypo style={{ top: 15 }} name="circle" size={30} color={colors.primary} />
                            )}
                        </TouchableOpacity>
                        <Text style={{ flex: 5, left: 15 }}>Faturas bilgilerim farklı.</Text>
                    </View>
                    <View style={styles.botContainer}>
                        <TouchableOpacity style={styles.buttonContainer} onPress={handleSaveAddress}>
                            <Text style={{ fontSize: 20, color: colors.background, textAlign: "center" }}>Kaydet</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    topContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: colors.background,
    },
    headText: {
        flex: 1,
        textAlign: "left",
        fontSize: 24,
        color: colors.primary,
        fontWeight:"600"
    },
    midContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.background,
    },
    conContainer: {
        flex: 1,
        paddingBottom: 20,
        borderBottomColor: colors.lightgray,
        borderBottomWidth: 1,
    },
    adrContainer: {
        flex: 2,
        paddingVertical: 20,
        borderBottomColor: colors.lightgray,
        borderBottomWidth: 1,
    },
    label: {
        fontSize: 16,
        color: colors.darkgray,
        paddingVertical: 10,
    },
    botContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: colors.background,
    },
    buttonContainer: {
        width: "100%",
        padding: 15,
        backgroundColor: colors.primary,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    checkContainer: {
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
});


const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: colors.gray,
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: colors.gray,
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,
    },
});

export default CreateAddress;
