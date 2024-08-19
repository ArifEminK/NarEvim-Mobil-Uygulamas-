import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductDetailState {
    status: string;
    message: string;
    data: {
        id: string;
        url: string;
        code_url: string;
        code: string;
        title: string;
        description: string;
        product_description: string | null;
        product_keywords: string | null;
        summary: string | null;
        features: string | null;
        product_number: string | null;
        price: string;
        discount_price: string;
        money_unit: string | null;
        design_url: string | null;
        brand_id: string;
        first_group_id: string;
        second_group_id: string;
        third_group_id: string;
        desi: string;
        video_url: string | null;
        rank: string | null;
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
        createdAt: string | null;
        campaign_rank: string;
        discountRatio: number;
    } | null;
    images: string[];
    image_path: string;
    isFavoritte: number;
    error_code: string;
}

const initialState: ProductDetailState = {
    status: "",
    message: "",
    data: null,
    images: [],
    image_path: "",
    isFavoritte: 0,
    error_code: ""
};

export const fetchProductDetail = createAsyncThunk(
    "productDetail/fetchProductDetail",
    async ({ product_id }: { product_id: string }) => {
        const response = await fetch("https://demo.pigasoft.com/eticaret/apiv1/productDetail", {
            method: "POST",
            headers: {
                "X-API-KEY": "SSVa97j7z83nMXDzhmmdHSSLPG9NueDf3J6BgCSS",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                product_id: product_id,
            }).toString()
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            const errorText = await response.text();
            throw new Error(`Expected JSON, got ${contentType}: ${errorText}`);
        }

        const data: ProductDetailState = await response.json();
        return data;
    }
);

const productDetailSlice = createSlice({
    name: "productDetail",
    initialState,
    reducers: {
        resetProductDetail: (state) => {
            state.data = null;
            state.images = [];
            state.image_path = "";
            state.isFavoritte = 0;
            state.status = 'idle';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductDetail.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProductDetail.fulfilled, (state, action: PayloadAction<ProductDetailState>) => {
                state.status = "succeeded";
                state.data = action.payload.data;
                state.images = action.payload.images;
                state.image_path = action.payload.image_path;
                state.isFavoritte = action.payload.isFavoritte;
                state.message = action.payload.message;
                state.error_code = action.payload.error_code;
            })
            .addCase(fetchProductDetail.rejected, (state, action) => {
                state.status = "failed";
                state.message = action.error.message || "Fetch failed";
            });
    }
});

export const { resetProductDetail } = productDetailSlice.actions;

export default productDetailSlice.reducer;
