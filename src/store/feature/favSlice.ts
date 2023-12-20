import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICharacter } from "@/models/ICharacter";

interface initialState {
  favItems: ICharacter[];
}

const initialState: initialState = {
  favItems: [],
};

const favReducer = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addRemoveFav(state, action: PayloadAction<ICharacter>) {
      const isItemInList = state.favItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (isItemInList >= 0) {
        state.favItems = state.favItems.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.favItems.push(action.payload);
      }
    },
  },
});

export const { addRemoveFav } = favReducer.actions;
export default favReducer.reducer;
