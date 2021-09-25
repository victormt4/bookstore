const CategoryService = {
    /**
     * @param {Book[]} books
     * @returns {string[]}
     */
    getUniqueCategoriesFromBooks: function (books) {
        //Um Set é um conjunto de valores únicos
        return [...new Set(books.map(book => book.category))]
    }
}

export default CategoryService;