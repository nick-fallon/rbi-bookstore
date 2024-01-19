import { Component, OnInit } from '@angular/core';
import {BooksManager} from "../../managers/books.manager";
import {CommonModule} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];
  totalPrice: number = 0;
  paymentForm: FormGroup;
  disableCheckout = true;

  constructor(private readonly booksManager: BooksManager) { }

  ngOnInit() {
    this.booksManager.books$.subscribe(books => {
      this.cartItems = books['cart'];
      if (this.cartItems.length) {
        this.disableCheckout = false;
      }
      this.cartItems.map(item => {
        this.totalPrice += item.price;
      });
    });
    this.paymentForm = new FormGroup({
      payment: new FormControl('', Validators.required)
    })
  }

  onSubmit(form: FormGroup) {
    this.booksManager.checkout(this.cartItems, this.totalPrice, form.value.payment);
    this.cartItems = [];
    this.totalPrice = 0;
  }
}
