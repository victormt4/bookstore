import React, {useMemo, useState} from "react";
//Services
import useFetchBooks from "./hooks/useFetchBooks";
import useFilterBooks from "./hooks/useFilterBooks";
import useCacheFilters from "./hooks/useCacheFilters";
import HttpStatus from "utils/HttpStatus";
import CategoryService from "services/category/CategoryService";
import cloneDeep from "lodash.clonedeep";
import Api from "services/api/Api";
//Types
import Book from "model/Book";
import FilteredListDTO from "services/bookFilter/dto/FilteredListDTO";
import {ActiveFilters} from "./types";
//Components
import BookItem from "./components/bookItem/BookItem";
import BookFilters from "./components/bookFilters/BookFilters";
import EmptyStatus from "./components/emptyStatus/EmptyStatus";
import Input from "components/input/Input";
import Slider from "components/slider/Slider";
import Tag from "components/tag/Tag";
import Icon from "components/icon/Icon";
import RequestError from "components/fetchStatus/requestError/RequestError";
import Pagination from "components/pagination/Pagination";
//Styles
import './BookList.css';

function FilterButtonText(props: { activeFilters: ActiveFilters }): React.ReactElement {

    let activeFiltersLength = 0;

    if (props.activeFilters.categories && props.activeFilters.categories.length) activeFiltersLength += 1;
    if (props.activeFilters.others && props.activeFilters.others.length) activeFiltersLength += 1;

    return <span className="BookList__slider_text_container">
        {activeFiltersLength > 0
            ? <Tag>{activeFiltersLength}</Tag>
            : <Tag><Icon type="filter_alt"/></Tag>}
        <span className="BookList__slider_text">Filtros</span></span>
}

export default function BookList(): React.ReactElement {

    const [booksStatus, setBooksStatus] = useState<number>(HttpStatus.NOT_STARTED);
    const [books, setBooks] = useState<Array<Book>>([]);
    const [filteredBooks, setFilteredBooks] = useState<FilteredListDTO>(null);

    const [sliderActive, setSliderActive] = useState<boolean>(false);
    const [activeFilters, setActiveFilters] = useState<ActiveFilters>({pageNumber: 1});
    const [searchTerm, setSearchTerm] = useState<string>('');

    const categories = useMemo(() => CategoryService.getUniqueCategoriesFromBooks(books), [books]);

    function applyFilters(filters: ActiveFilters) {
        setSliderActive(false);

        if (Object.keys(filters).length)
            setActiveFilters(prevFilters => ({...prevFilters, ...filters}));
        else {
            let newActiveFilters: ActiveFilters = {};
            //Mantenha o filtro por nome ativo caso ele seja definido
            if (activeFilters.searchTerm && activeFilters.searchTerm.length)
                newActiveFilters.searchTerm = activeFilters.searchTerm;

            newActiveFilters.pageNumber = 1;

            setActiveFilters(newActiveFilters);
        }
    }

    function likeBook(updatedBook: Book) {
        const newBooks = cloneDeep(books);

        let book = newBooks.find(book => book.id === updatedBook.id);
        book.liked = !book.liked;
        if (book.liked) book.likes += 1;
        else book.likes -= 1;

        setBooks(newBooks);

        Api.saveBookList(newBooks);
    }

    function onInput(event) {
        const value = event.target.value;
        setSearchTerm(value);
        applyFilters({searchTerm: event.target.value.replace(/^\s+/gi, ''), pageNumber: 1});
    }

    function setCurrentPage(pageNumber: number) {
        applyFilters({pageNumber: pageNumber})
    }

    useFetchBooks(setBooksStatus, setBooks, setFilteredBooks);
    useFilterBooks(setFilteredBooks, activeFilters, books);
    useCacheFilters(activeFilters, setActiveFilters, setSearchTerm);

    return (
        <section className="BookList">
            <div className="BookList__search__filter__container">
                <Input onInput={onInput} value={searchTerm}
                       placeholder="Pesquise pelo título ou autor"/>
                <Slider
                    title={<span><Tag><Icon type="filter_alt"/></Tag> Filtros</span>}
                    btnText={<FilterButtonText activeFilters={activeFilters}/>} active={sliderActive}
                    setActive={setSliderActive}
                >
                    <BookFilters defaultFilters={activeFilters} applyFilters={applyFilters} categories={categories}/>
                </Slider>
            </div>
            <BooksOrHttpStatus
                filteredBooks={filteredBooks}
                bookStatus={booksStatus}
                activeFilters={activeFilters}
                likeBook={likeBook}
                setCurrentPage={setCurrentPage}
            />
        </section>
    )
}

type BooksOrHttpStatusProps = {
    filteredBooks?: FilteredListDTO,
    bookStatus: number,
    activeFilters: ActiveFilters,
    likeBook: (book: Book) => void,
    setCurrentPage: (page: number) => void
}

function BooksOrHttpStatus(props: BooksOrHttpStatusProps): React.ReactElement {

    const booksToShow = props.filteredBooks !== null && props.filteredBooks !== undefined && props.filteredBooks.list.length > 0;

    if (HttpStatus.done(props.bookStatus) && booksToShow) {
        return (
            <>
                {props.filteredBooks.list.map(book => <div key={book.id} className="BookList__item">
                    <BookItem likeBook={props.likeBook} book={book}/>
                </div>)}
                <Pagination
                    onSetPage={props.setCurrentPage}
                    initialPage={props.activeFilters.pageNumber}
                    contentLength={props.filteredBooks.totalCount}
                    pageLength={8}
                    maxPageButtons={5}
                />
            </>
        )
    }

    if (HttpStatus.done(props.bookStatus) && !booksToShow) return <EmptyStatus title="Nenhum livro encontrado" text="Tente utilizar outros filtros"/>
    if (HttpStatus.anyError(props.bookStatus)) return <RequestError/>
    return <span className="BookList__loading">Carregando...</span>
}