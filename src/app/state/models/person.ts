import { Purchase } from "./purchase";

export interface Person {
  name: string,
  purchases: Map<string, Purchase>,
}
