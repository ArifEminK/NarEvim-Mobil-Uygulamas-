import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Town {
    id: string,
    title: string,
}

interface TownState {
    data: Town[],
    message: string,
    status: string,
    error_code: string
}

const initialState: TownState = {
    data: [],
    message:"",
    status:"",
    error_code:"",
}

export const fetchTown = createAsyncThunk(
    "address/town",
    async (city_id: string) => {
        const response = await fetch("https://demo.pigasoft.com/eticaret/apiv1/town", {
            method: "POST",
            headers: {
                'X-API-KEY': 'SSVa97j7z83nMXDzhmmdHSSLPG9NueDf3J6BgCSS',
                'Cookie': `ci_session=7f6c1c4ff8a3a1e86ec30bcca9599f6ece8f8660`, 
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `city_id=${city_id}`,
        });

        if (!response.ok) {
            throw new Error("network response was not ok");
        }
        console.log("town çağırıldı")
        const data = await response.json();
        return data;
    }
)

const townSlice = createSlice({
    name: "town",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchTown.fulfilled, (state, action: PayloadAction<TownState>) => {
        state.data = action.payload.data;
        state.message = action.payload.message;
        state.status = action.payload.status;
        state.error_code = action.payload.error_code;
      });
      builder.addCase(fetchTown.rejected, (state, action) => {
        state.message = action.error.message || "An error occurred";
      });
    }
  });

  export default townSlice.reducer;