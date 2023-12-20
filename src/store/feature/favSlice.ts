import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICharacter } from "@/models/ICharacter";
import { getItem, setItem } from "@/helpers/utils";

interface initialState {
  favItems: ICharacter[];
}

const initialState: initialState = {
  favItems: getItem("favItems") || [],
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
        localStorage.setItem("favItems", JSON.stringify(state.favItems));
      } else {
        state.favItems.push(action.payload);
        localStorage.setItem("favItems", JSON.stringify(state.favItems));
      }
    },
  },
});

export const { addRemoveFav } = favReducer.actions;
export default favReducer.reducer;
