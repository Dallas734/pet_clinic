import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { filterProps} from '../types';

export const propSlice = createSlice({
  name: 'propSlice',
  initialState : [] as filterProps[],
  reducers: {
    addProp: (state, action: PayloadAction<filterProps>) => {
      if (state.find(item => item.name === action.payload.name) === undefined) {
        state.push(action.payload);
      }
    },
    removeProp: (state, action: PayloadAction<filterProps>) => {
      state = state.filter(item => item.name !== action.payload.name);
    },
  }
});

export const { addProp, removeProp} = propSlice.actions;

export default propSlice.reducer;
