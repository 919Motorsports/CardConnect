import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  where 
} from 'firebase/firestore';
import { db } from '../services/firebase';

// Async thunks for card operations
export const fetchCards = createAsyncThunk(
  'cards/fetchCards',
  async (userId, { rejectWithValue }) => {
    try {
      const cardsRef = collection(db, 'cards');
      const q = query(cardsRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      
      const cards = [];
      querySnapshot.forEach((doc) => {
        cards.push({ id: doc.id, ...doc.data() });
      });
      
      return cards;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addCard = createAsyncThunk(
  'cards/addCard',
  async ({ userId, cardData }, { rejectWithValue }) => {
    try {
      const cardsRef = collection(db, 'cards');
      const newCard = {
        ...cardData,
        userId,
        createdAt: new Date().toISOString(),
      };
      
      const docRef = await addDoc(cardsRef, newCard);
      return { id: docRef.id, ...newCard };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCard = createAsyncThunk(
  'cards/updateCard',
  async ({ cardId, cardData }, { rejectWithValue }) => {
    try {
      const cardRef = doc(db, 'cards', cardId);
      await updateDoc(cardRef, {
        ...cardData,
        updatedAt: new Date().toISOString(),
      });
      
      return { id: cardId, ...cardData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCard = createAsyncThunk(
  'cards/deleteCard',
  async (cardId, { rejectWithValue }) => {
    try {
      const cardRef = doc(db, 'cards', cardId);
      await deleteDoc(cardRef);
      return cardId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Cards slice
const cardsSlice = createSlice({
  name: 'cards',
  initialState: {
    cards: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCardsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch cards
      .addCase(fetchCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.loading = false;
        state.cards = action.payload;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add card
      .addCase(addCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCard.fulfilled, (state, action) => {
        state.loading = false;
        state.cards.push(action.payload);
      })
      .addCase(addCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update card
      .addCase(updateCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCard.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.cards.findIndex(card => card.id === action.payload.id);
        if (index !== -1) {
          state.cards[index] = action.payload;
        }
      })
      .addCase(updateCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete card
      .addCase(deleteCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.loading = false;
        state.cards = state.cards.filter(card => card.id !== action.payload);
      })
      .addCase(deleteCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCardsError } = cardsSlice.actions;
export default cardsSlice.reducer; 