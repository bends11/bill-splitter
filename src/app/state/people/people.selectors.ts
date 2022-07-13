import { AppState } from "../app.state";
import { Person } from "../models/person";

export const selectPeople = (state: AppState): Map<string, Person> => {
  return state.people;
}
