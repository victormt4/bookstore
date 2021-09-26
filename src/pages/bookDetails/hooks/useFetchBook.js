import {useEffect} from "react";
import Api from "../../../services/api/Api";
import HttpStatus from "../../../utils/HttpStatus";

export default function useFetchBook (bookId, setBook, setStatus) {
    useEffect(async () => {
        try {
            const bookData = await Api.getBook(bookId);
            setBook(bookData);
            setStatus(200);
        } catch (e) {
            setStatus(HttpStatus.ON_REQUEST_ERROR);
        }
    }, [bookId])
}