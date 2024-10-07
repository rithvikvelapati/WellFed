import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  categoryId: number | null;
  timeId: number | null;
  servings: number;
  calorieRange: [number, number];
  // Add other filters as needed
}

const initialState: FilterState = {
  categoryId: null,
  timeId: null,
  servings: 1,
  calorieRange: [0, 5000],
  // Initialize other filters with default values
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<FilterState>) {
      state.categoryId = action.payload.categoryId;
      state.timeId = action.payload.timeId;
      state.servings = action.payload.servings;
      state.calorieRange = action.payload.calorieRange;
      // Update other filters as needed
    },
    resetFilters(state) {
      state.categoryId = null;
      state.timeId = null;
      state.servings = 1;
      state.calorieRange = [0, 5000];
      // Reset other filters to initial values
    },
  },
});

export const { setFilters, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
