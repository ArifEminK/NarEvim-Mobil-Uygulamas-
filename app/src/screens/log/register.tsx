import colors from '@/assets/colors'
import { FontAwesome, FontAwesome5, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TextInputBase, TouchableOpacity, View } from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RegisterState } from "../../store/store"
import { fetchRegister } from '../../slices/account/registerSlice';

interface Props {
    isAcoVisible: boolean;
    isRegVisible: boolean;
    setIsAcoVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setIsRegVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Register: React.FC<Props> = ({ isAcoVisible, isRegVisible, setIsAcoVisible, setIsRegVisible }) => {

    const dispatch = useDispatch<AppDispatch>();
    const registerData = useSelector((state: RegisterState) => state.register)


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [telephone, setTelephone] = useState('');
    const [firstName, setFirstName] = useState("");
    const [secondaryName, setSecondaryName] = useState("");
    const fullName = firstName + secondaryName;

    const backClick = () => {
        setIsRegVisible(!isRegVisible);
        setIsAcoVisible(!isAcoVisible);
    }

    const handleReg = () => {
        dispatch(fetchRegister({ email, password, telephone, name: fullName }));
        console.log(registerData.message);
        if (registerData.status == "success") {
            setIsRegVisible(!isRegVisible);
            setIsAcoVisible(!isAcoVisible);
        } else {

        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: colors.background }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView style={{ flexGrow: 0 }}>
                <View style={{ flex: 1, backgroundColor: colors.lightgray }}>
                    <View style={styles.connectionContainer}>
                        <View style={styles.connectionTopContainer}>
                            <TouchableOpacity onPress={backClick}>
                                <FontAwesome5 style={{ marginLeft: 15 }} name="arrow-left" size={30} color="#DE3459" />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 20, marginLeft: 25 }}>İletişim Bilgileri</Text>
                        </View>
                        <View style={styles.connectionBottomContainer}>
                            <View style={{ flex: 1, flexDirection: "row", left: 5 }}>
                                <FontAwesome name="user-circle" size={48} color={colors.primary} />
                                <TextInput placeholder='Ad' style={styles.input} value={firstName}
                                    onChangeText={setFirstName} />
                            </View>
                            <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end", right: 20 }}>
                                <TextInput placeholder='Soyad' style={styles.input} value={secondaryName} onChangeText={setSecondaryName} />
                            </View>
                            <View style={{ flex: 1, flexDirection: "row", left: 15 }}>
                                <FontAwesome name="phone" size={48} color={colors.primary} />
                                <TextInput value={telephone} onChangeText={setTelephone} placeholder='Telefon' style={styles.input} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={{ flex: 1, left: 5, borderWidth: 2, borderColor: colors.lightgray, flexDirection: "row", alignItems: "center" }}>
                            <SimpleLineIcons name="exclamation" size={40} color={colors.primary} />
                            <Text style={{ fontSize: 20 }}>  E-Posta & Şifre</Text>
                        </View>
                        <View style={{ flex: 3 }}>
                            <ScrollView style={{ flexGrow: 0 }}>
                                <View style={{ flex: 1, flexDirection: "row", left: 5 }}>
                                    <Ionicons name="mail" size={48} color={colors.primary} />
                                    <TextInput value={email} onChangeText={setEmail} placeholder='Email' style={styles.input} />
                                </View>
                                <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end", right: 20 }}>
                                    <MaterialCommunityIcons name="onepassword" size={40} color={colors.primary} />
                                    <TextInput value={password} onChangeText={setPassword} placeholder='Şifre' style={styles.input} />
                                </View>
                            </ScrollView>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity onPress={handleReg} style={styles.button}>
                                    <Text style={{ fontSize: 24, color: "white", textAlign: "center", fontWeight: "600" }}>Kaydet</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>

    )
}

const styles = StyleSheet.create({
    connectionContainer: {
        flex: 1,
        marginTop: 20,
        backgroundColor: colors.background
    },
    connectionTopContainer: {
        height: 50,
        borderWidth: 2,
        borderColor: colors.lightgray,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row"
    },
    connectionBottomContainer: {
        flex: 3.5,
        marginTop: 10
    },
    infoContainer: {
        flex: 1,
        backgroundColor: colors.background,
        marginTop: 10
    },
    blankContainer: {
        flex: 1
    },
    logContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        width: "80%",
        height: 55,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        borderColor: colors.gray,
        marginBottom: 10,
        marginLeft: 10,
        fontSize: 20
    },
    button: {
        backgroundColor: colors.primary,
        width: "85%",
        height: 50,
        justifyContent: "center",
        borderRadius: 8,
        marginTop: 10,
        marginLeft: 40,
    },
})
export default Register