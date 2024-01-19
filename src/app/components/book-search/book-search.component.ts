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
  bookIds: string[] = [
    'f75f6905-4c59-4733-a953-a09ddac73153',
    '853c5a34-d797-42c8-a73d-b4002d3583d3',
    'a5af0776-a0f5-4814-b174-e0225892c130',
    'bb5dac26-5ad3-4095-b35a-ea1bb9f8e804',
    '4da6660b-a6b1-441c-baef-b719187ff98d'
  ]

  ngOnInit() {
    this.inputForm = new FormGroup({
      bookId: new FormControl('')
    })
  }

  onSubmit(form: FormGroup) {
    const bookId = form.value.bookId;
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
