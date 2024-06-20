import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ID } from "../Services/api";

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (idToken, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_ID}`,
        { idToken }
      );
      return response.data.users[0];
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_ID}`,
        { email, password, returnSecureToken: true }
      );
      const { idToken } = response.data;
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("idToken", idToken);
      dispatch(fetchUserData(idToken));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    console.log(email, password);
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_ID}`,
        { email, password, returnSecureToken: true }
      );
      const { idToken } = response.data;
      console.log(idToken);
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("idToken", idToken);
      dispatch(fetchUserData(idToken));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const sendEmailVerification = createAsyncThunk(
  "user/sendEmailVerification",
  async (idToken, { rejectWithValue }) => {
    try {
      await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_ID}`,
        {
          requestType: "VERIFY_EMAIL",
          idToken,
        }
      );
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

const initialState = {
  user: null,
  token: "",
  loading: false,
  isVerifyUser: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("idToken");
      state.user = null;
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isVerifyUser = action.payload.emailVerified;
        state.loading = false;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.idToken;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.token = action.payload.idToken;
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendEmailVerification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendEmailVerification.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendEmailVerification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
