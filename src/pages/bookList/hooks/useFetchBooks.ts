import {useEffect} from "react";
import HttpStatus from "utils/HttpStatus";
import Book from "model/Book";
import {FilterListFN} from "../types";
import FilteredListDTO from "services/bookFilter/dto/FilteredListDTO";
import Api from "services/api/Api";


export default function useFetchBooks(
    setBooksStatus: (status: number) => void,
    setBooks: (books: Array<Book>) => void,
    setFilteredBooks: FilterListFN
): void {

    useEffect(() => {
        setBooksStatus(HttpStatus.WAITING);
        Api.getBooks()
            .then(booksData => {
                setBooks(booksData);
                setFilteredBooks(new FilteredListDTO(booksData, booksData.length));
                setBooksStatus(200);
            })
            .catch(() => setBooksStatus(HttpStatus.ON_REQUEST_ERROR))

    }, []);
}