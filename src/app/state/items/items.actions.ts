import { createAction, props } from "@ngrx/store";
import { Item } from "../models/item";

export const addItem = createAction('[Items] Add Item', props<{ item: Item }>());

export const removeItem = createAction('[Items] Remove Item', props<{ item: Item }>());
