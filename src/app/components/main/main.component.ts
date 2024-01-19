import {Component, OnInit} from '@angular/core';
import {BookSearchComponent} from "../book-search/book-search.component";
import {BooksManager} from "../../managers/books.manager";
import {CartComponent} from "../cart/cart.component";
import {ReceiptComponent} from "../receipt/receipt.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [BookSearchComponent, CartComponent, ReceiptComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  constructor(private readonly booksManager: BooksManager) { }

  ngOnInit() {
    this.booksManager.setBooks();
  }
}
