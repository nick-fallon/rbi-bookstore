import {createReducer, on} from "@ngrx/store";
import {addToCart, clearCart, setBooks, updateQuantity} from "./books.actions";

export const initialState = {cart: []};

export const booksReducer = createReducer(
  initialState,
  on(setBooks, (state, books) => {
    return {
      ...state,
      ...books.books
    }
  }),
  on(updateQuantity, (state, bookId) => {
    // @ts-ignore
    const book = state[bookId.id];
    if (!book) return state;

    const updatedBook = {
      // @ts-ignore
      ...book,
      // @ts-ignore
      quantity: book.quantity - 1
    }

    return {
      ...state,
      [bookId.id]: updatedBook
    };
  }),
  // @ts-ignore
  on(addToCart, (state, book) => {
    const newBook = {title: book.title, price: book.price};
    return {...state, cart: [...state['cart'], newBook]};
  }),
  on(clearCart, state => {
    return {...state, cart: []};
  })
);
