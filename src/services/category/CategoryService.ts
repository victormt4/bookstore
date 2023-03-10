import Book from "model/Book";

const CategoryService = {
    getUniqueCategoriesFromBooks: function (books: Array<Book>): Array<string> {
        return [...new Set(books.map(book => book.category))]
    }
}

export default CategoryService;