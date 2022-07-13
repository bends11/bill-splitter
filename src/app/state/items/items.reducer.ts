import { createReducer, on } from "@ngrx/store";
import { Item } from "../models/item";
import * as itemsActions from "./items.actions";
import * as peopleActions from "../people/people.actions";
import { Purchase } from "../models/purchase";

const initialState: Map<string, Item> = new Map();

export const itemsReducer = createReducer(
  initialState,
  on(itemsActions.addItem, (state, { item }) => {
    const items = new Map(state);
    items.set(item.name, item);
    return items;
  }),
  on(itemsActions.removeItem, (state, { item }) => {
    const items = new Map(state);
    items.delete(item.name);
    return items;
  }),
  on(peopleActions.removePerson, (state, { person }) => {
    const items = new Map(state);
    person.purchases.forEach((purchase: Purchase) => {
      items.get(purchase.name)?.shares.delete(person.name);
    });
    return items;
  })
);
