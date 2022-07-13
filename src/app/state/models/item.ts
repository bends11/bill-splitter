import { Share } from "./share";

export interface Item {
  name: string,
  price: number,
  shares: Map<string, Share>,
}
