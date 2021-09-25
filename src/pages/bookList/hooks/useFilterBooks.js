import {useEffect} from "react";
import cloneDeep from "lodash.clonedeep";
import BookFilterService from "../../../services/bookFilter/BookFilterService";

export default function useFilterBooks (setFilteredBooks, activeFilters, books) {
    useEffect(() => {
        //Copiando o array de livros para poder realizar filtragens sem quebrar a imutabilidade
        let newBooks = cloneDeep(books);
        setFilteredBooks(BookFilterService.applyOrderAndFilter(activeFilters, newBooks));
    }, [activeFilters, books])
}