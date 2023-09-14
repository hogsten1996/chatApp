import { createSlice } from "@reduxjs/toolkit";
import { storeApi } from "./api";

// Session storage key
const CREDENTIALS = "credentials";

/**
 * API endpoints
 */
const authApi = storeApi.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query({
      query: () => "auth/me",
      providesTags: ["Me"],
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Me"],
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "auth/register",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Me"],
    }),
    logout: builder.mutation({
      queryFn: () => ({ data: {} }),
      invalidatesTags: ["Me"],
    }),
  }),
});

/**
 * Stores the payload's token in both state and session storage.
 */
function storeToken(state, { payload }) {
  state.credentials = { token: payload.token, user: { ...payload.user } };
  window.sessionStorage.setItem(
    CREDENTIALS,
    JSON.stringify({
      token: payload.token,
      user: { ...payload.user },
    })
  );
}

/**
 * Stores token whenever login or register succeeds
 */
const authSlice = createSlice({
  name: "auth",
  initialState: {
    credentials: JSON.parse(window.sessionStorage.getItem(CREDENTIALS)) || {
      token: "",
      user: { userId: null },
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(storeApi.endpoints.login.matchFulfilled, storeToken);
    builder.addMatcher(storeApi.endpoints.register.matchFulfilled, storeToken);
    builder.addMatcher(storeApi.endpoints.logout.matchFulfilled, (state) => {
      state.credentials = { token: "", userId: null };
      window.sessionStorage.removeItem(CREDENTIALS);
    });
  },
});

export default authSlice.reducer;

export const {
  useMeQuery,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
} = authApi;
