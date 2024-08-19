import colors from '@/assets/colors'
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View, FlatList, ScrollView } from 'react-native'
import { fetchProductDetail } from '../../slices/product/productDetail';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchFavoritte } from '../../slices/favoritte/toggleFavoritte';
import { fetchAddBasket } from '../../slices/cart/addBasket';


interface Props {
    prodId: string,
    prodInfoVis: boolean;
    brandProdListVis: boolean;
    searchProdVis: boolean;
    setBrandProdListVis: React.Dispatch<React.SetStateAction<boolean>>;
    setProdInfoVis: React.Dispatch<React.SetStateAction<boolean>>;
    setSearchProdVis: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductPage: React.FC<Props> = ({ prodId, prodInfoVis, brandProdListVis, searchProdVis, setBrandProdListVis, setProdInfoVis, setSearchProdVis }) => {
    const dispatch = useDispatch<AppDispatch>();
    const addBasket = useSelector((state: RootState) => state.addBasket);
    const productDetail = useSelector((state: RootState) => state.productDetail);
    // const favoritteData = useSelector((state: RootState) => state.toggleFavoritte);
    const [favoritteColor, setFavoritteColor] = useState(colors.gray);

    useEffect(() => {
        console.log(prodId)
        dispatch(fetchProductDetail({ product_id: prodId }));
    }, [dispatch]);

    if (productDetail.status === "loading") {
        return <Text>Loading...</Text>;
    }

    if (productDetail.status === "failed") {
        return <Text>Error: {productDetail.message}</Text>;
    }
    const backClick = () => {
        console.log("brandProdListVis1: " + brandProdListVis)
        console.log("searchProdVis1: " + searchProdVis)
        if (brandProdListVis = true) {
            setBrandProdListVis(true);
            console.log("brandProdListVis2: " + brandProdListVis)
            setProdInfoVis(false);
            console.log("ffadsirst")
        }
        if (searchProdVis = true) {
            setSearchProdVis(true);
            console.log("searchProdVis2: " + searchProdVis)
            setProdInfoVis(false);
            console.log("first")
        }
    }
    const handleFavoritteClick = () => {
        dispatch(fetchFavoritte({ product_id: prodId }));
        setFavoritteColor(colors.primary);
        if (favoritteColor == colors.gray) {
            setFavoritteColor(colors.primary);
        }
        if (favoritteColor == colors.primary) {
            setFavoritteColor(colors.gray);
        }
        else {
            console.log("Favoriye ekleme işlemi başarısız.")
        }

    }
    const handleAddBasket = () => {
        dispatch(fetchAddBasket({ product_id: prodId, qty: "1" }))
        console.log(addBasket.message)
    }
    return (
        <View style={styles.container}>

            <View style={styles.topContain}>
                <View style={{ flex:1 }}>
                    <TouchableOpacity onPress={backClick}>
                        <Ionicons name="arrow-back" size={36} color={colors.primary} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex:9}}>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={styles.title}>
                        {productDetail.data ? productDetail.data.title : "Product not found"}
                    </Text>
                </View>
            </View>


            <View style={styles.midContain}>
                <ScrollView>
                    <FlatList
                        data={productDetail.images}
                        horizontal
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <Image resizeMode="contain" source={{ uri: `${item}` }} style={styles.image} />

                        )}
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                    />
                    <Text style={styles.productTitle}>{productDetail.data?.title}</Text>
                    <Text style={{ color: colors.darkgray, fontSize: 22, fontWeight: "900", marginTop: 20 }}>Ürün hakkında bilgiler:  </Text>
                    <Text style={{ fontSize: 24, marginTop: 20, color: colors.darkgray }} >{productDetail.data?.description} </Text>
                </ScrollView>
            </View>

            <View style={styles.bottomContain}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={styles.priceTitle}>{productDetail.data ? productDetail.data.price : "Product not found"} TL</Text>
                </View>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <TouchableOpacity onPress={handleFavoritteClick}>
                        <Ionicons name="heart-circle-outline" size={48} color={favoritteColor} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <TouchableOpacity onPress={handleAddBasket}>
                        <View style={{ justifyContent: "center", backgroundColor: colors.primary, borderRadius: 3, width: 100, height: 40 }}>
                            <Text style={{ fontSize: 16, color: "white", textAlign: "center", }}>Sepete Ekle</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>

        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: "center",
    },
    topContain: {
        height: 70,
        justifyContent: "flex-start",
        flexDirection: "row",
        alignItems: "center"
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: colors.primary,
    },
    midContain: {
        flex: 10,
        width: "95%"
    },
    bottomContain: {
        flex: 1,
        flexDirection: "row"
    },
    priceTitle: {
        fontSize: 24,
        fontWeight: "600",
        color: "black",

    },
    image: {
        width: 410,
        height: 550,

    },
    productTitle: {
        fontSize: 20,
        marginTop: 20,
        color: colors.darkgray
    }
})
export default ProductPage;