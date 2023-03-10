import OrderTypes from "./types/OrderTypes";
import OtherFilterTypes from "./types/OtherFilterTypes";
import FilteredListDTO from "./dto/FilteredListDTO";
import Book from "model/Book";
import {ActiveFilters} from "./types";
import StringUtils from "utils/StringUtils";

const BookFilterService = {
    orderBooks: function (orderType: string, books: Array<Book>): Array<Book> {
        let sortFunc = null;
        switch (orderType) {
            case OrderTypes.MOST_LIKED:
                sortFunc = function (bookA: Book, bookB: Book): number {
                    if (bookA.likes > bookB.likes) return -1;
                    else if (bookA.likes < bookB.likes) return 1;
                    else return 0;
                }
                break;
            case OrderTypes.ALPHABETICAL:
                sortFunc = (bookA: Book, bookB: Book) => bookA.name.localeCompare(bookB.name)
                break;
            default:
                throw new Error('Invalid sort order');
        }
        return books.sort(sortFunc);
    },

    filterBooks: function (filters: ActiveFilters, books: Array<Book>): Array<Book> {

        let filterClosures: Array<(book: Book) => boolean> = [];

        //Criando uma closure para filtrar os litros pelo nome
        if (filters.searchTerm) {
            filterClosures.push(function (book: Book) {

                if (!filters.searchTerm.length) return true;

                //Removendo acentos antes da pesquisa

                const regex = new RegExp(StringUtils.removeAccents(filters.searchTerm), 'gi');
                const bookNameWithoutAccents = StringUtils.removeAccents(book.name);
                const authorWithoutAccents = StringUtils.removeAccents(book.author);

                return regex.test(bookNameWithoutAccents) || regex.test(authorWithoutAccents);
            })
        }

        //Criando uma closure para filtrar os livros pela categoria
        if (filters.categories && filters.categories.length) {
            filterClosures.push(book => filters.categories.includes(book.category));
        }

        //Criando closures para filtrar os livros curtidos pelo usuário e/ou que estão em estoque
        if (filters.others && filters.others.length) {
            for (let otherType of filters.others) {
                switch (otherType) {
                    case OtherFilterTypes.LIKED:
                        filterClosures.push(book => book.liked)
                        break;
                    case OtherFilterTypes.IN_STOCK:
                        filterClosures.push(book => book.stock > 0)
                        break;
                    default:
                        throw new Error('Invalid OtherFilterTypes');
                }
            }
        }

        //Aplicando todos os filtros criados ao mesmo tempo (nome, categoria, com estoque, etc)
        if (filterClosures.length) {
            books = books.filter(book => {
                let valid = true;
                for (let closure of filterClosures) {
                    valid = closure(book);
                    //Caso um dos filtros não passe na validação, não é necessário checar o resto dos filtros
                    if (!valid) break;
                }
                return valid;
            })
        }

        return books;
    },

    applyOrderAndFilter: function (filters: ActiveFilters, books: Array<Book>): FilteredListDTO {

        if (filters.order) {
            books = this.orderBooks(filters.order, books);
        }

        if (filters.categories || filters.others || filters.searchTerm) {
            books = this.filterBooks(filters, books);
        }

        //Salvando a quantidade livros antes da paginação
        //Necessário para contar a quantidade de paginas que existe
        const totalCount = books.length;

        //Aplicando a paginação
        if (filters.pageNumber) {
            let pageSize = filters.pageSize ? filters.pageSize : 8;
            let sliceStart = filters.pageNumber > 1 ? ((filters.pageNumber - 1) * pageSize) : 0;
            let slideEnd = sliceStart + pageSize;
            books = books.slice(sliceStart, slideEnd);
        }

        return new FilteredListDTO(books, totalCount);
    }
}

export default BookFilterService;