import {Component, OnInit} from '@angular/core';
import {BooksManager} from "../../managers/books.manager";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-receipt',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './receipt.component.html',
  styleUrl: './receipt.component.scss'
})
export class ReceiptComponent implements OnInit {
  constructor(private readonly booksManager: BooksManager) { }

  checkout: any;

  ngOnInit() {
    this.booksManager.checkout$.subscribe(checkout => {
      this.checkout = checkout;
    })
  }
}
