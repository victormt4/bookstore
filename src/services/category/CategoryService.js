const CategoryService = {
    getUniqueCategoriesFromBooks: function (books) {
        return [...new Set(books.map(book => book.category))]
    }
}

export default CategoryService;