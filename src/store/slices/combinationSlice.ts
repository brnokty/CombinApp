// src/store/slices/combinationSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

interface Combination {
  id?: string;
  topColor: string;
  bottomColor: string;
  createdAt: string;
}

interface CombinationState {
  combinations: Combination[];
  loading: boolean;
  error: string | null;
}

const initialState: CombinationState = {
  combinations: [],
  loading: false,
  error: null,
};

export const fetchCombinations = createAsyncThunk(
  'combinations/fetchCombinations',
  async (userId: string, thunkAPI) => {
    try {
      const q = query(collection(db, 'combinations'), where('userId', '==', userId));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Combination, 'id'>),
      }));
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addCombination = createAsyncThunk(
  'combinations/addCombination',
  async (payload: Combination & { userId: string }, thunkAPI) => {
    try {
      await addDoc(collection(db, 'combinations'), payload);
      // Burada payload'ı döndürmüyoruz çünkü yeniden fetch edeceğiz
      return;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const combinationSlice = createSlice({
  name: 'combinations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCombinations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCombinations.fulfilled, (state, action) => {
        state.loading = false;
        state.combinations = action.payload;
      })
      .addCase(fetchCombinations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addCombination.fulfilled, (state, action) => {
      state.combinations.unshift(action.payload);
      });
  },
});

export default combinationSlice.reducer;
