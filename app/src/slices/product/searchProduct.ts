import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SearchProduct {
    id: string,
    title: string,
    price: string,
    discount_price: string,
    img_url: string,
    isDiscount: string,
    brand: string,
    point: string,  // number'dan string'e değiştirildi
    review: string,
    discountRatio: string,
}

interface SearchProductState {
    data: SearchProduct[],
    status: string,
    message: string,
    image_path: string,
}

const initialState: SearchProductState = {
    data:[],
    status:"",
    message:"",
    image_path:"",
}

export const fetchSearchProd = createAsyncThunk(
    "searchProduct/search",
    async ({keywords, page, per_page, sorting }: { keywords: string, page: string, per_page: string, sorting: string }) => {
        const response = await fetch("https://demo.pigasoft.com/eticaret/apiv1/searchProduct", {
            method:"POST",
            headers:{
                "X-API-KEY": "SSVa97j7z83nMXDzhmmdHSSLPG9NueDf3J6BgCSS",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                keywords: keywords,
                page: page,
                per_page: per_page,
                sorting: sorting
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

        const data: SearchProductState = await response.json();
        return data;
    }
);

const searchProductSlice = createSlice({
    name: "searchProdList",
    initialState,
    reducers: {
        resetSearchProdList: (state) => {
            state.data = [];
            state.status = 'idle';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearchProd.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchSearchProd.fulfilled, (state, action: PayloadAction<SearchProductState>) => {
                state.status = "succeeded";
                state.data = action.payload.data;
                state.message = action.payload.message;
                state.image_path = action.payload.image_path;
            })
            .addCase(fetchSearchProd.rejected, (state, action) => {
                state.status = "failed";
                state.message = action.error.message || "Fetch failed";
            });
    }
})

export const {resetSearchProdList} = searchProductSlice.actions;   

export default searchProductSlice.reducer;
