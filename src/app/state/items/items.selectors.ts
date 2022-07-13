import { AppState } from "../app.state";
import { Item } from "../models/item";

export const selectItems = (state: AppState): Map<string, Item> => {
  return state.items;
}
