import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BrandProd {
    id: string;
    title: string;
    price: string;
    discount_price: string;
    img_url: string;
    isDiscount: string;
    brand: string;
}

interface BrandProdState {
    data: BrandProd[];
    message: string;
    status: string;
    error_code: string;
}

const initialState: BrandProdState = {
    data: [],
    message: "",
    status: "",
    error_code: ""
};

export const fetchBrandProd = createAsyncThunk(
    "brandProductList/brandProds",
    async ({ page, per_page, brand_id, sorting }: { page: string, per_page: string, brand_id: string, sorting: string }) => {
        const response = await fetch("https://demo.pigasoft.com/eticaret/apiv1/brandProductList", {
            method: "POST",
            headers: {
                "X-API-KEY": "SSVa97j7z83nMXDzhmmdHSSLPG9NueDf3J6BgCSS",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                page: page,
                per_page: per_page,
                brand_id: brand_id,
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

        const data: BrandProdState = await response.json();
        return data;
    }
);

const brandProdListSlice = createSlice({
    name: "brandProdList",
    initialState,
    reducers: {
        resetBrandProdList: (state) => {
            state.data = [];
            state.status = 'idle';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBrandProd.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchBrandProd.fulfilled, (state, action: PayloadAction<BrandProdState>) => {
                state.status = "succeeded";
                state.data = action.payload.data;
                state.message = action.payload.message;
                state.error_code = action.payload.error_code;
            })
            .addCase(fetchBrandProd.rejected, (state, action) => {
                state.status = "failed";
                state.message = action.error.message || "Fetch failed";
            });
    }
});

export const {resetBrandProdList} = brandProdListSlice.actions;   

export default brandProdListSlice.reducer;
