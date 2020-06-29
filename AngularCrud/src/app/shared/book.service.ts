import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  apiURL = "http://localhost:3000/api/books";

  getBooks(): Observable<Book[]> {
    return this.http.get<any>(this.apiURL);
  }

  postBook(book: Book) {
    return this.http.post<any>(this.apiURL, book);
  }

  updateBook(book: Book) {
    return this.http.put<any>(this.apiURL + `/${book._id}`, book);
  }

  deleteBook(id: string) {
    return this.http.delete<any>(this.apiURL + `/${id}`);
  }
}
