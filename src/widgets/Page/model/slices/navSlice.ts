import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { lastPath, navigationSliceProps } from '../types';


function handleDragEnd(historyMap: lastPath[], sourceIndex: number, destinationIndex: number) {
  const draggedItem = historyMap[sourceIndex];
  const updatedHistoryMap = [...historyMap];

  updatedHistoryMap.splice(sourceIndex, 1);
  updatedHistoryMap.splice(destinationIndex, 0, draggedItem);

  return updatedHistoryMap;
}

const initialState: navigationSliceProps = {
    historyMap: [],
    currentUrl: ''
};

export const navSlice = createSlice({
  name: 'navSlice',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<lastPath>) => {
      if (state.historyMap.find(item => item.path === action.payload.path) === undefined) {
        state.historyMap.push(action.payload);
      }
    },
    removePath: (state, action: PayloadAction<lastPath>) => {
      state.historyMap = state.historyMap.filter(item => item.path !== action.payload.path);
    },
    setCurrentPath: (state, action: PayloadAction<string>) => {
        state.currentUrl = action.payload;
    },
    reorderHistoryMap: (state, action: PayloadAction<{ sourceIndex: number, destinationIndex: number }>) => {
      const { sourceIndex, destinationIndex } = action.payload;
      state.historyMap = handleDragEnd(state.historyMap, sourceIndex, destinationIndex);
    }
  }
});

export const { add, removePath, setCurrentPath, reorderHistoryMap } = navSlice.actions;

export default navSlice.reducer;
