import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

interface LogoutState{
    message:string,
    status:string
}

const initialState:LogoutState={
    message:"",
    status:""
}

export const fetchLogout = createAsyncThunk(
    'logout/fetchLogout',
    async (_, { getState }) => {
      const state: any = getState();
      const response = await fetch('https://demo.pigasoft.com/eticaret/apiv1/logout', {
        method: 'GET',
        headers: {
          'X-API-KEY': 'SSVa97j7z83nMXDzhmmdHSSLPG9NueDf3J6BgCSS',
          'Cookie': `ci_session=1b55d03d95fbbaeb41d1692cceb91ef661524795`, 
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    
    const data: LogoutState = await response.json();
    return data;
}
);

const logoutSlice = createSlice({
    name: 'logout',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchLogout.fulfilled, (state, action: PayloadAction<LogoutState>) => {
            state.message = action.payload.message;
            state.status = action.payload.status;
            console.log(state.message)
        });
        builder.addCase(fetchLogout.rejected, (state, action) => {
            state.message = action.error.message || 'Logout failed';
            state.status = 'error';
            console.log(Error, "başarısız")
      });
    },
  });

  export default logoutSlice.reducer;