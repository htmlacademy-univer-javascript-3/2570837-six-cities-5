import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppData } from '../../types/state';
import { NameSpace, SortOptions } from '@const';

const initialState: AppData = {
  city: 'Paris',
  sortOption: SortOptions.Popular,
};

export const appData = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setSortOption: (state, action: PayloadAction<SortOptions>) => {
      state.sortOption = action.payload;
    },
  },
});

export const { changeCity, setSortOption } = appData.actions;
export const appDataReducer = appData.reducer;
