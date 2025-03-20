import { createSlice } from '@reduxjs/toolkit';

// Safe access to browser APIs
const getStoredLanguage = () => {
  if (typeof window !== 'undefined') {
    return window.localStorage?.getItem('language');
  }
  return null;
};


const setStoredLanguage = (lang) => {
  if (typeof window !== 'undefined') {
    window.localStorage?.setItem('language', lang);
  }
};

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    current: getStoredLanguage() ||   'cs',
    supported: ['cs', 'en']
  },
  reducers: {
    setLanguage: (state, action) => {
      state.current = action.payload;
      setStoredLanguage(action.payload);
    }
  }
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;