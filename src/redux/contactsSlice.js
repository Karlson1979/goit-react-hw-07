import { createSlice } from "@reduxjs/toolkit";
import { apiGetContacts, apiAddContact, apiDeleteContact } from "./contactsOps";

// Создаем слайс для управления состоянием контактов
const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) =>
    builder
      // Обработка apiGetContacts
      .addCase(apiGetContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(apiGetContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(apiGetContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Обработка apiAddContact
      .addCase(apiAddContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(apiAddContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(apiAddContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Обработка apiDeleteContact
      .addCase(apiDeleteContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(apiDeleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(
          (contact) => contact.id !== action.payload
        );
      })
      .addCase(apiDeleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});

// Селекторы для получения данных из состояния
export const selectContacts = (state) => state.contacts.items;
export const selectLoading = (state) => state.contacts.loading;
export const selectError = (state) => state.contacts.error;

// Экспорт редьюсера
export default contactsSlice.reducer;
