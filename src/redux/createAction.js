// Usuwamy import nanoid
import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

const apiBaseUrl = 'https://api.mockapi.io'; // Wprowadź tutaj URL do swojego backendu

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({ nameText, numberText }, thunkAPI) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/contacts`, {
        name: nameText,
        number: numberText,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const delContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      await axios.delete(`${apiBaseUrl}/contacts/${contactId}`);
      return contactId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const setFilter = createAction('filter/setFilter');
