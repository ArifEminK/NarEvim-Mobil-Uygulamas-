import colors from '@/assets/colors'
import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons'
import React from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
interface Props {
    isRecoVisible: boolean;
    isForgVisible: boolean;
    setIsForgVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setIsRecoVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const PassRecovery: React.FC<Props> = ({ setIsForgVisible, setIsRecoVisible, isRecoVisible, isForgVisible }) => {
    const backClick = () => {
        setIsForgVisible(!isForgVisible);
        setIsRecoVisible(!isRecoVisible);
    }
    
    
    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
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
                <View style={styles.logContainer}>
                    <FontAwesome6 name="user-large" size={36} color={colors.primary} />
                    <TextInput style={styles.input} placeholder="Sms ile gelen kodu giriniz.." />
                </View>
                <View style={{ flex: 9 }}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={{ fontSize: 24, color: "white", backgroundColor: colors.primary, textAlign: "center", fontWeight: "600" }}>Şifreyi Sıfırla</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
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
        flex: 1,
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
        marginTop: 10,
        marginLeft: 45,
    },
})
export default PassRecovery