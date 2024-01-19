import { Injectable } from '@angular/core';
import {Observable, Subject, take} from "rxjs";
import { BooksService } from "../services/books.service";
import { Store } from "@ngrx/store";
import {addToCart, clearCart, setBooks, updateQuantity} from "../store/books.actions";
import { IBook } from "../types/book.interface";

@Injectable({
  providedIn: 'root'
})
export class BooksManager {
  books$: Observable<any>;
  currentBook: IBook;
  cart: any[] = [];
  checkout$ = new Subject<any>;
  constructor(private readonly booksService: BooksService, private store: Store<{books: {}}>) {
    this.books$ = store.select('books');
  }

  // Set the list of books as a HashMap in the state for fast access.
  public setBooks(): void {
    this.booksService.getBooks().subscribe(books => {
      let bookMap: any = {};
      books.map((book: { isbn: string }) => {
        bookMap[book.isbn] = book;
      })
      this.store.dispatch(setBooks({books: bookMap}))
    })
  }

  public getBook(bookId: string) {
    this.books$.pipe(take(1)).subscribe(books => {
      this.currentBook = books[bookId];
    })
  }

  public updateQuantity() {
    this.store.dispatch(updateQuantity({id: this.currentBook.id}))
  }

  public addToCart() {
    this.store.dispatch(addToCart({title: this.currentBook.title, price: this.currentBook.price}));
  }

  public checkout(cartItems: any, total: number, payment: string) {
    this.checkout$.next({cartItems, total, payment});
    this.store.dispatch(clearCart());
  }
}
