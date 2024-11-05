import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL = "https://672909a06d5fa4901b6bebc8.mockapi.io";
export const apiGetContacts = createAsyncThunk(
  "contacts/getContacts",
  async (_, thunkApi) => {
    try {
      const response = await axios.get("/contacts");
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.massage);
    }
  }
);
