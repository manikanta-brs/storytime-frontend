import { apiSlice } from "../apiSlice";
const USER_ENDPOINT = "/api/users";

export const userAPISlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginAPI: builder.mutation({
      query: (data) => ({
        url: `${USER_ENDPOINT}/login`,
        method: "POST",
        body: data,
      }),
    }),
    registerAPI: builder.mutation({
      query: (data) => ({
        url: `${USER_ENDPOINT}/register`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginAPIMutation, useRegisterAPIMutation } = userAPISlice;
