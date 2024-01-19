import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {IBook} from "../../types/book.interface";
import {BooksManager} from "../../managers/books.manager";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-book-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './book-search.component.html',
  styleUrl: './book-search.component.scss'
})
export class BookSearchComponent implements OnInit{
  constructor(private readonly booksManager: BooksManager) {
  }

  inputForm: FormGroup;
  currentBook: IBook;
  bookIsbns: string[] = [
    '9781466853447',
    '9780593135211',
    '9780007492190',
    '9780553900347',
    '9781631066443'
  ]

  ngOnInit() {
    this.inputForm = new FormGroup({
      bookIsbn: new FormControl('')
    })
  }

  onSubmit(form: FormGroup) {
    const bookId = form.value.bookIsbn;
    if (!bookId) {
      // handle no input here – maybe show a message indicating it's required to submit
      console.log('Book search submitted with no input.')
      return;
    }
    this.getBook(bookId);
    this.booksManager.updateQuantity();
    this.booksManager.addToCart();
    this.inputForm.reset();
  }

  getBook(bookId: string) {
    this.booksManager.getBook(bookId);
    this.currentBook = this.booksManager.currentBook;
  }
}
