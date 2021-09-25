 export default class FilteredListDTO {
    /**
     * @param {Book[]} bookList
     * @param {int} totalCount
     */
    constructor(bookList, totalCount) {
        this.list = bookList;
        this.totalCount = totalCount;
    }
}