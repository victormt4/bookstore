import {useEffect} from "react";
import HttpStatus from "utils/HttpStatus";
import Book from "model/Book";
import Api from "services/api/Api";

export default function useFetchBook(bookId: number, setBook: (book: Book) => void, setStatus: (status: number) => void) {
    useEffect(() => {
        Api.getBook(bookId)
            .then(bookData => {
                setBook(bookData);
                setStatus(200);
            })
            .catch(() => HttpStatus.ON_REQUEST_ERROR)
    }, [bookId])
}