import { fetchOrders } from '@/app/src/slices/account/orders';
import { fetchOrderDetail } from '@/app/src/slices/order/orderDetail';
import productDetail from '@/app/src/slices/product/productDetail';
import { AppDispatch, OrderState, RootState } from '@/app/src/store/store';
import colors from '@/assets/colors'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import React, { useEffect } from 'react'
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';

interface Props {
    isAcPagVisible: boolean;
    isOrdersVisible: boolean;
    setIsAcPagVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setOrdersVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
interface OrderDetail {
    id: string;
    order_id: string;
    product_id: string;
    title: string;
    size: string;
    color: string;
    qty: string;
    subtotal: string;
    total: string;
    isActive: string;
    isDeleted: string;
    createdAt: string;
    birim: string;
    kdv: string;
    img_url: string;
}
interface OrderProduct {
    order_id: string;
    order_number: string;
    total_amount: number;
    order_date: string;
    member_address: string;
    order_state: string;
    order_detail: OrderDetail[];
}


const Orders: React.FC<Props> = ({ isAcPagVisible, isOrdersVisible, setIsAcPagVisible, setOrdersVisible }) => {
    const dispatch = useDispatch<AppDispatch>();
    const orders = useSelector((state: RootState) => state.orders);


    useEffect(() => {
        dispatch(fetchOrders());
        console.log(orders)
    }, [dispatch, orders]);

    const backCLick = () => {
        setIsAcPagVisible(!isAcPagVisible);
        setOrdersVisible(!isOrdersVisible);
    }
    const renderBrandItem = ({ item }: { item: OrderProduct }) => (
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
            <View style={styles.addressContainer}>
                <View style={{ flex: 1, backgroundColor: colors.background }}>
                    <TouchableOpacity >
                        <AntDesign name="question" size={36} color={colors.primary} />
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <TouchableOpacity onPress={backCLick}>
                    <Ionicons name="arrow-back" size={36} color={colors.primary} />
                </TouchableOpacity>
                <Text style={styles.headText}>     Siparişlerim</Text>
            </View>
            <View style={styles.midContainer}>

                <View style={{ marginTop: 20, height: 90, flexDirection: "column", alignItems: "flex-start", justifyContent: "center", borderWidth: 1, borderColor: colors.primary, borderRadius: 15, width: 360 }}>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    topContainer: {
        flex: 1,
        borderBottomColor: colors.lightgray,
        borderBottomWidth: 9,
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
        flex: 10
    },
    addressContainer: {
        height: 100,
        backgroundColor: colors.background,
        borderRadius: 5,
        width: "90%",
        marginTop: 20,
        borderColor: colors.gray,
        borderWidth: 1,
        flexDirection: "row"
    },
})
export default Orders