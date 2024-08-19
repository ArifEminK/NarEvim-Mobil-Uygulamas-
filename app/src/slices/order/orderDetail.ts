import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderDetailState {
    status: string;
    message: string;
    data: {
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
    } | null;
}

const initialState: OrderDetailState = {
    status: "",
    message: "",
    data: null,
};

export const fetchOrderDetail = createAsyncThunk(
    "order/fetchOrderDetail",
    async ({ order_id }: { order_id: string }) => {
        const response = await fetch("https://demo.pigasoft.com/eticaret/apiv1/orderDetail", {
            method: "POST",
            headers: {
                "X-API-KEY": "SSVa97j7z83nMXDzhmmdHSSLPG9NueDf3J6BgCSS",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                order_id: order_id,
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

        const data: OrderDetailState = await response.json();
        return data;
    }
);

const orderDetailSlice = createSlice({
    name: "orderDetail",
    initialState,
    reducers: {
        resetProductDetail: (state) => {
            state.data = null;
            state.status = 'idle';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrderDetail.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchOrderDetail.fulfilled, (state, action: PayloadAction<OrderDetailState>) => {
                state.status = "succeeded";
                state.data = action.payload.data;
                state.message = action.payload.message;
            })
            .addCase(fetchOrderDetail.rejected, (state, action) => {
                state.status = "failed";
                state.message = action.error.message || "Fetch failed";
            });
    }
});

export const { resetProductDetail } = orderDetailSlice.actions;

export default orderDetailSlice.reducer;
