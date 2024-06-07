import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface lastPath
{
    name:string,
    path:string
}

export const historyMapSlice = createSlice({
  name: 'historyMap',
  initialState: [] as lastPath[],
  reducers: {
    add: (state,action) => {
      return  [...state].find(item=>item.path===action.payload.path)===undefined ? [...state].concat(action.payload) : undefined;
    },
    removePath: (state,action : PayloadAction<lastPath>) => {
      return [...state].filter((item: { path: string; }) => item.path !==action.payload.path);
    }
  },
})

export const { add, removePath} = historyMapSlice.actions

export const selectPath = (state: any) => state.historyMap

export default historyMapSlice.reducer