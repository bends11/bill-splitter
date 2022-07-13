import { createAction, props } from "@ngrx/store";
import { Person } from "../models/person";

export const addPerson = createAction('[People] Add Person', props<{ person: Person }>());

export const removePerson = createAction('[People] Remove Person', props<{ person: Person }>());
