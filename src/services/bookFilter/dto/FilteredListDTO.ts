import Book from "model/Book";

export default class FilteredListDTO {
     public list: Array<Book>;
     public totalCount: number;
    constructor(bookList: Array<Book>, totalCount: number) {
        this.list = bookList;
        this.totalCount = totalCount;
    }
}