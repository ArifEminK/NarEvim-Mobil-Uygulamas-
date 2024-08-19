import colors from '@/assets/colors';
import React, { useEffect, useState } from 'react'
import { FlatList, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchBrandProd, resetBrandProdList } from '../../slices/product/brandProdList';
import { Entypo } from '@expo/vector-icons';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { AntDesign } from '@expo/vector-icons';
import ProductPage from './ProductPage';
import searchProduct, { fetchSearchProd, resetSearchProdList, SearchProduct } from '../../slices/product/searchProduct';
import Feather from '@expo/vector-icons/Feather';

interface Product {
    id: string,
    title: string,
    price: string,
    discount_price: string,
    img_url: string,
    isDiscount: string,
    brand: string,
    point: string,
    review: string,
    discountRatio: string,
}

interface SortModalProps {
    visible: boolean;
    onClose: () => void;
    onSort: (order: 'ASC' | 'DESC') => void;
}
interface Props {
    isHomeVisible: boolean;
    isSeaProdVisible: boolean;
    keyword: string;
    firstData: SearchProduct[];
    setIsHomeVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setIsSeaProdVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setKeyword: React.Dispatch<React.SetStateAction<string>>;
    sort: string;
    setSort: React.Dispatch<React.SetStateAction<"ASC" | "DESC">>;
}

const SortModal: React.FC<SortModalProps> = ({ visible, onClose, onSort }) => (
    <Modal
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
    >
        <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.modalTitle}>Ürünleri Sırala</Text>
                    <TouchableOpacity onPress={onClose}>
                        <AntDesign style={{ left: 160, top: -10 }} name="closesquare" size={30} color={colors.primary} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Entypo name="arrow-bold-up" size={36} color={colors.primary} />
                    <TouchableOpacity onPress={() => { onSort('ASC'); onClose(); }}>
                        <Text style={styles.option}>Fiyata göre artan</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Entypo name="arrow-bold-down" size={36} color={colors.primary} />
                    <TouchableOpacity onPress={() => { onSort('DESC'); onClose(); }}>
                        <Text style={styles.option}>Fiyata göre azalan</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal>
);




const SearchProductPage: React.FC<Props> = ({ sort, setSort, isHomeVisible, setIsHomeVisible, isSeaProdVisible, setIsSeaProdVisible, setKeyword, keyword, firstData }) => {
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector((state: RootState) => state.searchProducts);
    const [numColumns, setNumColumns] = useState(2);
    const icons = Array(5).fill(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [prodInfoVis, setProdInfoVis] = useState(false);
    const [searchProdVis, setSearchProdVis] = useState(true);
    const [selectedProd, setSelectedProd] = useState<Product | "">("");
    const [brandProdListVis, setBrandProdListVis] = useState(false);


    useEffect(() => {
        console.log(firstData)
        if (keyword) {
            dispatch(fetchSearchProd({ keywords: keyword, page: "0", per_page: "100", sorting: sort }));
            console.log(products)
        }
        return () => {
            dispatch(resetSearchProdList())
        }
    }, [keyword, sort, dispatch]);


    useEffect(() => {
        console.log('Products message:', products.message);
        console.log('Keyword:', keyword);
        console.log('Products:', products);
    }, [products, keyword]);

    const handleSort = (order: 'ASC' | 'DESC') => {
        console.log(`Sıralama seçildi: ${sort}`);
        setSort(order);
        dispatch(fetchSearchProd({ keywords: "VİP", page: "0", per_page: "100", sorting: "ASC" }));
        console.log(products.data)
    };

    const backPress = () => {
        setIsHomeVisible(!isHomeVisible);
        setIsSeaProdVisible(!isSeaProdVisible);
        setKeyword("");
        keyword = "";
    }
    const handleProdInfo = (item: Product) => {
        setSearchProdVis(!searchProdVis);
        setProdInfoVis(!prodInfoVis);
        setSelectedProd(item);
        console.log(item.id)
    }

    const renderItem = ({ item }: { item: Product }) => (
        <View style={styles.item}>
            <Image resizeMode="contain" source={{ uri: `https://www.demo.pigasoft.com/eticaret/panel/uploads/product_v/original/${item.img_url}` }} style={styles.prodImage} />
            <Text style={styles.brandTitle}>{item.brand}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <View style={{ flex: 1, flexDirection: "row" }}>
                {icons.map((_, index) => (
                    <Entypo name="star" size={18} color={colors.gray} />
                ))}
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={[styles.priceTitle]}> {item.price ? item.price.slice(0, 5) : 'N/A'} TL</Text>
                <TouchableOpacity onPress={() => handleProdInfo(item)}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Ürün Detayı</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {searchProdVis && (
                <View style={styles.topContainer}>
                    <Image
                        source={require("../../../../assets/images/logo.png")}
                        resizeMode="contain"
                        style={styles.logoImage}
                    />
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Aramak istediğiniz ürünü girin.."
                            value={keyword}
                            onChangeText={setKeyword}
                        />
                        <TouchableOpacity onPress={backPress}>
                            <Feather name="x-circle" size={36} color={colors.primary} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <View style={styles.sortContain}>
                            <MaterialCommunityIcons name="sort-variant" size={30} color={colors.primary} />
                            <Text style={{ color: colors.primary, fontSize: 20, fontWeight: '600' }}>Sırala</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )}
            {searchProdVis && (

                <View style={styles.prodsContainer}>
                    {products.status === 'failed' && <Text style={{ fontSize: 15 }}>{products.message}</Text>}
                    <FlatList
                        data={products.data}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => `${item.id}-${index}`}
                        numColumns={numColumns}
                        key={numColumns}
                        contentContainerStyle={{ right: 20 }}
                    />
                </View>
            )}
            <SortModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSort={handleSort}
            />
            {prodInfoVis && selectedProd !== "" && (
                <ProductPage
                    prodId={selectedProd.id}
                    setSearchProdVis={setSearchProdVis}
                    searchProdVis={searchProdVis}
                    brandProdListVis={brandProdListVis}
                    prodInfoVis={prodInfoVis}
                    setProdInfoVis={setProdInfoVis}
                    setBrandProdListVis={setBrandProdListVis}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,

    },
    topContainer: {
        flex: 1.8,
        justifyContent: "flex-start",
        alignItems: "center",
        borderBottomColor: colors.primary,
        borderBottomWidth: 1
    },
    prodsContainer: {
        flex: 5,
    },
    logoImage: {
        width: 200,
        height: 200,
        marginTop: -20
    },
    input: {
        width: "90%",
        height: 55,
        paddingHorizontal: 10,
        marginBottom: 0
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "90%",
        height: 60,
        borderWidth: 2,
        borderRadius: 8,
        paddingHorizontal: 10,
        borderColor: colors.primary,
        marginTop: -60
    },
    sortContain: {
        // flex: 0.6,
        height: 30,
        flexDirection: "row",
        justifyContent: "center",
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 10,
        color: colors.primary
    },
    option: {
        fontSize: 20,
        padding: 10,
        color: colors.primary
    },
    prodContainer: {
        flex: 1,
        margin: 5,
        backgroundColor: colors.primary,
        padding: 20,
        borderRadius: 10,
        alignItems: 'flex-start',
        justifyContent: "flex-start"
    },
    item: {
        flex: 1,
        margin: 5,
        backgroundColor: colors.background,
        padding: 20,
        borderRadius: 10,
        alignItems: 'flex-start',
        justifyContent: "flex-start"
    },
    title: {
        fontSize: 14,
        justifyContent: "center",
        alignItems: "center",
        color: colors.darkgray
    },
    brandTitle: {
        fontSize: 14,
        color: "#4535C1"
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
        width: 200,
        height: 200
    },

})
export default SearchProductPage