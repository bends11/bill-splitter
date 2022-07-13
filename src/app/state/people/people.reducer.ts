import { createReducer, on } from "@ngrx/store";
import { Person } from "../models/person";
import * as peopleActions from "./people.actions";
import * as itemsActions from "../items/items.actions"
import { Share } from "../models/share";

const initialState: Map<string, Person> = new Map();

export const peopleReducer = createReducer(
  initialState,
  on(peopleActions.addPerson, (state, { person }) => {
    const people = new Map(state);
    people.set(person.name, person);
    return people;
  }),
  on(peopleActions.removePerson, (state, { person }) => {
    const people = new Map(state);
    people.delete(person.name);
    return people;
  }),
  on(itemsActions.addItem, (state, { item }) => {
    const people = new Map(state);
    const quantity = Array.from(item.shares.values()).reduce((prev: number, curr: Share): number => prev + curr.quantity, 0);
    item.shares.forEach((share: Share) => {
      people.get(share.name)?.purchases.set(item.name, {
        name: item.name,
        price: item.price * (share.quantity / quantity),
        quantity: share.quantity,
      });
    });
    return people;
  }),
  on(itemsActions.removeItem, (state, { item }) => {
    const people = new Map(state);
    item.shares.forEach((share: Share) => {
      people.get(share.name)?.purchases.delete(item.name);
    });
    return people;
  })
);
