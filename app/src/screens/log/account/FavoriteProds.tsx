import favoritteList, { fetchFavoriteList } from '@/app/src/slices/favoritte/favoritteList';
import { AppDispatch, FavoriteListState, RootState } from '@/app/src/store/store';
import colors from '@/assets/colors'
import { Entypo, Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import ProductPage from '../../home/ProductPage';
import FavProductPage from '../../home/FavProdPage';

interface FavoritteProd {
    value: string,
    id: string,
    url: string,
    code_url: string,
    isHome: string,
    isActive: string,
    price: string,
    discount_price: string,
    title: string,
    desi: string,
    isDiscount: string,
    img_url: string,
    isCover: string,
    product_id: string,
    member_id: string,
    brand_title: string,
    point: number,
    review: string,
    discountRatio: number,
}

interface Props {
    isAcPagVisible: boolean;
    isFavorittesVisible: boolean;
    setIsAcPagVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setFavorittesVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const FavoriteProds: React.FC<Props> = ({ isAcPagVisible, isFavorittesVisible, setIsAcPagVisible, setFavorittesVisible }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { image_path, data, message, status } = useSelector((state: FavoriteListState) => state.favoritteProds);
    const icons = Array(5).fill(null);
    const [numColumns, setNumColumns] = useState(2);

    const [prodPage, setProdPage] = useState(false);
    const [favPage, setFavPage] = useState(true);
    const [prodId, setProdId] = useState("");
    useEffect(() => {
        dispatch(fetchFavoriteList());
    }, [dispatch, data]);

    const backCLick = () => {
        setFavorittesVisible(!isFavorittesVisible);
        setIsAcPagVisible(!isAcPagVisible);
    }

    const handleInfo = (item: any) => {
        setProdId(item);
        setFavPage(false);
        setProdPage(true);
    }

    const renderItem = ({ item }: { item: FavoritteProd }) => (
        <View style={styles.item}>
            <Image resizeMode="contain" source={{ uri: `${image_path}${item.img_url}` }} style={styles.prodImage} />
            <Text style={styles.title}>{item.title}</Text>
            <View style={{ flex: 1, flexDirection: "row", alignItems: "flex-start" }}>
                {icons.map((_, index) => (
                    <Entypo name="star" size={18} color={colors.gray} />
                ))}
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={[styles.priceTitle]}> {item.price ? item.price.slice(0, 5) : 'N/A'} TL</Text>
                <TouchableOpacity onPress={() => handleInfo(item.id)} >
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Ürün Detayı</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {favPage && (
                <View style={styles.topContainer}>
                    <TouchableOpacity onPress={backCLick}>
                        <Ionicons name="arrow-back" size={36} color={colors.primary} />
                    </TouchableOpacity>
                    <Text style={styles.headText}>     Favori Ürünlerim</Text>
                </View>
            )}
            {favPage && (
                <View style={styles.midContainer}>
                    {status === 'failed' && <Text style={{ fontSize: 15 }}>{message}</Text>}
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => `${item.id}`}
                        numColumns={numColumns}
                        key={numColumns}
                        contentContainerStyle={styles.container2}
                    />
                </View>
            )}
            {prodPage && (
                <FavProductPage  prodId={prodId} prodPage={prodPage} favPage={favPage} setProdPage={setProdPage} setFavPage={setFavPage} />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    container2: {
        right: 10
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
        flex: 10,
        backgroundColor: colors.lightgray
    },
    item: {
        flex: 1,
        margin: 5,
        backgroundColor: colors.background,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: "flex-start"
    },
    title: {
        fontSize: 14,
        justifyContent: "center",
        alignItems: "center",
        color: colors.darkgray
    },
    priceTitle: {
        fontSize: 16,
        color: "red",
    },
    button: {
        height: 40,
        width: 180,
        borderColor: colors.gray,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
    },
    buttonText: {
        justifyContent: "center",
        color: colors.gray,
    },
    prodImage: {
        width: 180,
        height: 200,

    },
})
export default FavoriteProds