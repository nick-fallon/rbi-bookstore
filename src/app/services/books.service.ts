import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IBook} from "../types/book.interface";

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private readonly http: HttpClient) { }

  public getBooks(): Observable<any> {
    return this.http.get('../../assets/data/books.json');
  }
}
