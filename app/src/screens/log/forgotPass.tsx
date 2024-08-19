import colors from '@/assets/colors'
import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, PassForgotState } from '../../store/store';
import { fetchForgotPass } from '../../slices/account/passForgot';
import PassRecovery from './passRecovery';
import { useFocusEffect } from 'expo-router';

interface Props {
    isAcoVisible: boolean;
    isForVisible: boolean;
    setIsAcoVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setIsForVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const ForgotPass: React.FC<Props> = ({ setIsAcoVisible, setIsForVisible, isAcoVisible, isForVisible }) => {
    const createTwoButtonAlert = () =>
        Alert.alert('Narevim', 'İlgili hesap bulunamadı', [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);


    const dispatch = useDispatch<AppDispatch>();
    const forgotData = useSelector((state: PassForgotState) => state.passForgot)

    const [email, setEmail] = useState("");
    const [isRecoVisible, setIsRecoVisible] = useState(false);
    const [isForgVisible, setIsForgVisible] = useState(true);


    const handleSendToken = () => {
        dispatch(fetchForgotPass({ email }));
        setIsForgVisible(false);
        setIsRecoVisible(true);
        console.log(forgotData.message);
        if (forgotData.status === "error") {
            createTwoButtonAlert();
        }
    };


    useEffect(() => {
        if (forgotData.status === 'success') {
            setIsForgVisible(!isForgVisible);
            setIsRecoVisible(!isRecoVisible);
        }
        else {
        }
    }, [forgotData, isForVisible]);

    const backClick = () => {
        setIsAcoVisible(!isAcoVisible);
        setIsForVisible(!isForVisible);
    }
    useFocusEffect(
        React.useCallback(() => {
            setIsForgVisible(true);
            setIsRecoVisible(false);
        }, [])
    )
    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: colors.background }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={{ flex: 1, backgroundColor: colors.background }}>
                {isForgVisible && (
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={{ flex: 1 }}>
                            <View style={styles.topContain}>
                                <TouchableOpacity onPress={backClick}>
                                    <FontAwesome5 style={{ marginLeft: 10 }} name="arrow-left" size={24} color="#DE3459" />
                                </TouchableOpacity>
                                <Text style={styles.headText}>    Şifremi Unuttum</Text>
                            </View>
                            <View style={styles.midContain}>
                                <Image
                                    resizeMode='stretch'
                                    source={require("../../../../assets/images/logo2.png")}
                                    style={{ width: 300, height: 110 }}
                                />
                                <ScrollView contentContainerStyle={styles.logContainer}>
                                    <FontAwesome6 name="user-large" size={36} color={colors.primary} />
                                    <TextInput value={email} onChangeText={setEmail} style={styles.input} placeholder="E-Posta" />
                                </ScrollView>
                                <View style={{ flex: 9,justifyContent:"flex-start" }}>
                                    <TouchableOpacity onPress={handleSendToken} style={styles.button}>
                                        <Text style={{ fontSize: 24, color: "white", backgroundColor: colors.primary, textAlign: "center", fontWeight: "600" }}>Şifreyi Sıfırla</Text>
                                    </TouchableOpacity>
                                    <Text style={{ color: "red", textAlign: "center" }}>{forgotData.message}</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                )}
                {isRecoVisible && (
                    <PassRecovery
                        isForgVisible={isForgVisible}
                        isRecoVisible={isRecoVisible}
                        setIsRecoVisible={setIsRecoVisible}
                        setIsForgVisible={setIsForgVisible} />
                )}
            </View>
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    topContain: {
        flex: 1,
        borderWidth: 1,
        borderColor: colors.lightgray,
        alignItems: "center",
        flexDirection: "row"
    },
    headText: {
        fontSize: 20,
        color: colors.primary,
        fontWeight: "600"
    },
    midContain: {
        flex: 10,
        marginTop: 10,
        alignItems: "center",
    },
    logContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 50
    },
    input: {
        width: "85%",
        height: 55,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        borderColor: colors.gray,
        marginBottom: 10,
        marginLeft: 10,
    },
    button: {
        backgroundColor: colors.primary,
        width: 350,
        height: 50,
        justifyContent: "center",
        borderRadius: 8,
        // marginTop: -40,
        marginLeft: 45,
    },
})
export default ForgotPass