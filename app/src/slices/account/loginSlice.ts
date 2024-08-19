// loginSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface LoginState {
  data: {
    email: string;
    name:string;
    surname:string;
    telephone:string;
  } | null;
  message: string;
  sessionid: string;
  status: string;
}

const initialState: LoginState = {
  data: null,
  message: '',
  sessionid: '',
  status: '',
};

export const fetchLogin = createAsyncThunk(
  'login/fetchLogin',
  async ({ email, password }: { email: string; password: string }) => {
    const response = await fetch('https://demo.pigasoft.com/eticaret/apiv1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: new URLSearchParams({
        email: email,
        password: password,
      }).toString(),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: LoginState = await response.json();
    return data;
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.fulfilled, (state, action: PayloadAction<LoginState>) => {
      state.data = action.payload.data;
      state.message = action.payload.message;
      state.sessionid = action.payload.sessionid;
      state.status = action.payload.status;
    });
  },
});

export default loginSlice.reducer;
