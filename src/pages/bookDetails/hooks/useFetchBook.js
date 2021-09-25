import {useEffect} from "react";
import TeraApi from "../../../services/api/TeraApi";
import HttpStatus from "../../../utils/HttpStatus";

export default function useFetchBook (bookId, setBook, setStatus) {
    useEffect(async () => {
        try {
            const bookData = await TeraApi.getBook(bookId);
            setBook(bookData);
            setStatus(200);
        } catch (e) {
            setStatus(HttpStatus.ON_REQUEST_ERROR);
        }
    }, [bookId])
}