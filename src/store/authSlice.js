import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: true, // Ajouter un état de chargement
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      // Sauvegarder l'utilisateur dans localStorage
      if (typeof window !== 'undefined') {
        if (action.payload) {
          localStorage.setItem('user', JSON.stringify(action.payload));
        }
      }
    },
    clearUser: (state) => {
      state.user = null;
      state.loading = false;
      // Supprimer l'utilisateur de localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, clearUser, setLoading } = authSlice.actions;

// Middleware pour initialiser l'état depuis localStorage
export const initializeAuth = () => (dispatch) => {
  try {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        dispatch(setUser(JSON.parse(storedUser)));
      } else {
        dispatch(setLoading(false));
      }
    }
  } catch (error) {
    console.error('Error initializing auth state:', error);
    dispatch(setLoading(false));
  }
};

export default authSlice.reducer;