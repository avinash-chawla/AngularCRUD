import { Component, OnInit } from '@angular/core';
import { BookService } from './../shared/book.service';
import { Book } from './../shared/book.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  constructor(private service: BookService) { }

  books: Book[];
  selectedBook: Book;

  ngOnInit(): void {
    this.refreshBookList();
    this.resetForm();
  }

  refreshBookList() {
    this.service.getBooks()
      .subscribe(
        res => this.books = res,
        err => console.log(err)
      );
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.selectedBook = {
      _id: "",
      title: "",
      author: "",
      price: null
    }
  }

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.service.postBook(form.value)
        .subscribe(res => {
          this.resetForm(form);
          this.refreshBookList();
        });
    } else {
      this.service.updateBook(form.value)
        .subscribe(res => {
          this.resetForm(form);
          this.refreshBookList();
        })
    }

  }

  onDelete(book) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.service.deleteBook(book._id)
        .subscribe(res => {
          this.refreshBookList();
        })
    }
  }

  onEdit(book) {
    this.selectedBook = book;
  }
}
