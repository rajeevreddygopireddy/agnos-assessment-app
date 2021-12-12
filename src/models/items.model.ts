export interface Item {
  itemName: string;
  itemPrice: number;
  id: number;
  itemDescription?: string;
  itemType?: string;
  comboItems?: ComboItem[];
  discountPrice?: number;
}

export interface ComboItem {
  itemName: string;
  itemPrice: number;
  id: number;
}
