import { fetchChangPass } from '@/app/src/slices/account/changePassword';
import { AppDispatch, RootState } from '@/app/src/store/store';
import colors from '@/assets/colors'
import { FontAwesome6, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { red } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
    isChaPagVisible: boolean;
    isAcPagVisible: boolean;
    setIsChaPagVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setIsAcPagVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangePassword: React.FC<Props> = ({ isChaPagVisible, isAcPagVisible, setIsAcPagVisible, setIsChaPagVisible }) => {
    const dispatch = useDispatch<AppDispatch>();
    const chang = useSelector((state: RootState) => state.changePassword);

    const backClick = () => {
        setIsChaPagVisible(!isChaPagVisible)
        setIsAcPagVisible(!isAcPagVisible)
    }
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleChangePass = () => {
        console.log({ oldPassword }, { newPassword })
        dispatch(fetchChangPass({ old_password: oldPassword, new_password: newPassword }))
    }
    return (
        <View style={styles.container}>
            <ScrollView style={{ flexGrow: 1 }}>
                <View style={styles.topContainer}>
                    <TouchableOpacity onPress={backClick}>
                        <Ionicons name="arrow-back" size={36} color={colors.primary} />
                    </TouchableOpacity>
                    <Text style={styles.headText}>     Şifremi Unuttum</Text>
                </View>
            </ScrollView>
            <ScrollView style={{ flexGrow: 4 }}>
                <View style={styles.midContainer}>
                    <Image
                        style={{ width: 300, height: 110 }}
                        resizeMode='contain'
                        source={require("../../../../../assets/images/logo2.png")} />
                    <View style={{ flex: 1, flexDirection: "row", width: "95%", marginTop: 50 }}>
                        <MaterialCommunityIcons name="account-lock-outline" size={48} color={colors.primary} />
                        <TextInput value={oldPassword} onChangeText={setOldPassword} style={styles.input} placeholder="Eski Şifre" />
                    </View>
                    <View style={{ flex: 1, flexDirection: "row", width: "95%", marginTop: 40 }}>
                        <MaterialCommunityIcons name="account-lock" size={48} color={colors.primary} />
                        <TextInput value={newPassword} onChangeText={setNewPassword} style={styles.input} placeholder="Yeni Şifre" />
                    </View>

                    <View style={{ flex: 9, marginTop: 30 }}>
                        <TouchableOpacity onPress={handleChangePass} style={styles.button}>
                            <Text style={{ fontSize: 24, color: "white", backgroundColor: colors.primary, textAlign: "center", fontWeight: "600" }}>Şifreyi Sıfırla</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ color: "red", fontSize: 12, textAlign: "center" }}>{chang.message}</Text>

                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    topContainer: {
        height: 60,
        borderBottomColor: colors.lightgray,
        borderBottomWidth: 2,
        justifyContent: "flex-start",
        flexDirection: "row",
        alignItems: "center"
    },
    headText: {
        color: colors.primary,
        fontSize: 24,
        fontWeight: "600"
    },
    midContainer: {
        flex: 10,
        backgroundColor: colors.background,
        alignItems: "center",
        marginTop: 35
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
        marginTop: 10,
        marginLeft: 45,
    },

})
export default ChangePassword