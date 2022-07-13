import { Item } from "./models/item";
import { Person } from "./models/person";

export interface AppState {
  people: Map<string, Person>;
  items: Map<string, Item>;
}
