import {useEffect} from "react";
import cloneDeep from "lodash.clonedeep";
import {FilterListFN} from "../types";
import {ActiveFilters} from "services/bookFilter/types";
import Book from "model/Book";
import BookFilterService from "services/bookFilter/BookFilterService";

export default function useFilterBooks (setFilteredBooks: FilterListFN, activeFilters: ActiveFilters, books: Array<Book>): void {
    useEffect(() => {
        //Copiando o array de livros para poder realizar filtragens sem quebrar a imutabilidade
        let newBooks = cloneDeep(books);
        setFilteredBooks(BookFilterService.applyOrderAndFilter(activeFilters, newBooks));
    }, [activeFilters, books])
}