import {createAction, props} from "@ngrx/store";
import {IBook} from "../types/book.interface";

export const setBooks = createAction(
  '[Main Component] Set Books',
  props<{books: IBook[]}>()
)

export const updateQuantity = createAction(
  '[Search Component] Update Quantity',
  props<{id: string}>()
)

export const addToCart = createAction(
  '[Cart Component] Add to Cart',
  props<{title: string, price: number}>()
)

export const clearCart = createAction(
  '[Cart Component] Checkout Cart'
)
