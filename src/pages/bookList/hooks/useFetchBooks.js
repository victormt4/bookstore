//Carregando os dados dos livros
import {useEffect} from "react";
import HttpStatus from "../../../utils/HttpStatus";
import TeraApi from "../../../services/api/TeraApi";
import FilteredListDTO from "../../../services/bookFilter/dto/FilteredListDTO";

export default function useFetchBooks(setBooksStatus, setBooks, setFilteredBooks) {

    useEffect(async () => {

        try {

            setBooksStatus(HttpStatus.WAITING);
            const booksData = await TeraApi.getBooks();
            setBooks(booksData);
            setFilteredBooks(new FilteredListDTO(booksData, booksData.length));
            setBooksStatus(200);

        } catch (e) {
            setBooksStatus(HttpStatus.ON_REQUEST_ERROR);
        }

    }, []);
}