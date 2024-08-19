import colors from '@/assets/colors';
import React, { useEffect, useState } from 'react'
import { FlatList, Image, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchBrandProd, resetBrandProdList } from '../../slices/product/brandProdList';
import { Entypo } from '@expo/vector-icons';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { AntDesign } from '@expo/vector-icons';
import ProductPage from './ProductPage';
interface BrandProduct {
    id: string;
    title: string;
    price: string;
    discount_price: string;
    img_url: string;
    isDiscount: string;
    brand: string;
}

interface Props {
    brandId: string;
    title: string;
    isHomeVisible: boolean;
    isBraProdVisible: boolean;
    setIsHomeVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setIsBraProdVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SortModalProps {
    visible: boolean;
    onClose: () => void;
    onSort: (order: 'ASC' | 'DESC') => void;
}

interface Product {
    id: string;
    url: string;
    code_url: string;
    code: string;
    title: string;
    description: string;
    product_description: string;
    product_keywords: string;
    summary: string;
    features: string;
    product_number: string;
    price: string;
    discount_price: string;
    money_unit: string;
    design_url: string;
    brand_id: string;
    first_group_id: string;
    second_group_id: string;
    third_group_id: string;
    desi: string;
    video_url: string;
    rank: string;
    homeRank: string;
    stock: string;
    isColor: string;
    isSize: string;
    isDiscount: string;
    isActive: string;
    isNew: string;
    isHome: string;
    isOpportunity: string;
    isFreeCargo: string;
    isBanner: string;
    isWeekStar: string;
    isMostSeller: string;
    createdAt: string;
    campaign_rank: string;
    discountRatio: number;
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


const BrandProdList: React.FC<Props> = ({ brandId, title, isHomeVisible, isBraProdVisible, setIsHomeVisible, setIsBraProdVisible }) => {
    const dispatch = useDispatch<AppDispatch>();
    const brandProds = useSelector((state: RootState) => state.brandProdList);
    const [numColumns, setNumColumns] = useState(2);
    const icons = Array(5).fill(null);
    const [sort, setSort] = useState<"ASC" | "DESC">("ASC");
    const [modalVisible, setModalVisible] = useState(false);
    const [brandProdListVis, setBrandProdListVis] = useState(true);
    const [prodInfoVis, setProdInfoVis] = useState(false);
    const [selectedProd, setSelectedProd] = useState<BrandProduct | "">("");
    const [searchProdVis, setSearchProdVis] = useState(true);



    const handleSort = (order: 'ASC' | 'DESC') => {
        console.log(`Sıralama seçildi: ${sort}`);
        setSort(order);
        dispatch(fetchBrandProd({ page: "0", per_page: "100", brand_id: brandId, sorting: sort }));
    };

    useEffect(() => {
        if (brandId) {
            dispatch(fetchBrandProd({ page: "0", per_page: "100", brand_id: brandId, sorting: sort }));
            console.log(brandProds.message)
        }
        return () => {
            dispatch(resetBrandProdList())
        }
    }, [dispatch, brandId, sort]);

    const backPress = () => {
        setIsHomeVisible(!isHomeVisible);
        setIsBraProdVisible(!isBraProdVisible);
    };

    const handleProdInfo = (item: BrandProduct) => {
        setBrandProdListVis(!brandProdListVis);
        setProdInfoVis(!prodInfoVis);
        setSelectedProd(item);
        console.log(item.id)
    }

    const renderItem = ({ item }: { item: BrandProduct }) => (
        <View style={styles.item}>
            <Image resizeMode="contain" source={{ uri: `https://www.demo.pigasoft.com/eticaret/panel/uploads/product_v/original/${item.img_url}` }} style={styles.prodImage} />
            <Text style={styles.brandTitle}>{item.brand}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <View style={{ flex: 1, flexDirection: "row" }}>
                {icons.map((_, index) => (
                    <Entypo key={index} name="star" size={18} color={colors.gray} />
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
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <View style={styles.container}>
                {brandProdListVis && (
                    <View style={styles.topContain}>
                        <TouchableOpacity onPress={backPress}>
                            <Ionicons name="arrow-back" size={36} color={colors.primary} />
                        </TouchableOpacity>
                        <Text style={{ color: colors.primary, fontSize: 24, fontWeight: '600' }}>{title}</Text>
                    </View>
                )}
                {brandProdListVis && (

                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <View style={styles.sortContain}>
                            <MaterialCommunityIcons name="sort-variant" size={36} color={colors.primary} />
                            <Text style={{ color: colors.primary, fontSize: 24, fontWeight: '600' }}>Sırala</Text>
                        </View>
                    </TouchableOpacity>
                )}
                {brandProdListVis && (
                    <SortModal
                        visible={modalVisible}
                        onClose={() => setModalVisible(false)}
                        onSort={handleSort}
                    />
                )}
                {brandProdListVis && (
                    <View style={styles.products}>
                        {brandProds.status === 'failed' && <Text style={{ fontSize: 15 }}>{brandProds.message}</Text>}
                        <FlatList
                            data={brandProds.data}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => `${item.id}-${index}`}
                            numColumns={numColumns}
                            key={numColumns}
                            contentContainerStyle={styles.container2}
                        />
                    </View>
                )}
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
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
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
    closeButton: {
        fontSize: 16,
        color: 'red',
        padding: 10,
        textAlign: 'center',
    },
    container2: {
        right: 10
    },
    topContain: {
        // flex: 1,
        height: 70,
        justifyContent: "flex-start",
        flexDirection: "row",
        alignItems: "center"
    },
    sortContain: {
        // flex: 0.6,
        height: 40,
        borderBottomColor: colors.primary,
        borderBottomWidth: 1,
        flexDirection: "row",
        justifyContent: "center",
    },
    products: {
        flex: 10,
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
    image: {
        width: 90,
        height: 40,
        marginRight: 10,
    },
    prodImage: {
        width: 200,
        height: 200
    },
    priceTitle: {
        fontSize: 16,
        color: "red",
    },
    button: {
        height: 40,
        width: 160,
        borderColor: colors.gray,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
    },
    buttonText: {
        justifyContent: "center",
        color: colors.gray,

    }
})
export default BrandProdList
