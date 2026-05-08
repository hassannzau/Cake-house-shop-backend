import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, registerApi } from "@/api/auth";

interface AuthState {
  token: string | null;
  email: string | null;
  fullName: string | null;
  role: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  email: localStorage.getItem("email"),
  fullName: localStorage.getItem("fullName"),
  role: localStorage.getItem("role"),
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      return await loginApi(email, password);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed. Check your credentials.",
      );
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    {
      fullName,
      email,
      password,
      confirmPassword,
    }: {
      fullName: string;
      email: string;
      password: string;
      confirmPassword: string;
    },
    { rejectWithValue },
  ) => {
    try {
      return await registerApi(fullName, email, password, confirmPassword);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed.",
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.email = null;
      state.fullName = null;
      state.role = null;
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("fullName");
      localStorage.removeItem("role");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.email = action.payload.email;
        state.fullName = action.payload.fullName;
        state.role = action.payload.role;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("email", action.payload.email);
        localStorage.setItem("fullName", action.payload.fullName);
        localStorage.setItem("role", action.payload.role);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
