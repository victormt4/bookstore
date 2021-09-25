//Libs/Services
import {useState, useMemo} from "react";
import useFetchBooks from "./hooks/useFetchBooks";
import useFilterBooks from "./hooks/useFilterBooks";
import useCacheFilters from "./hooks/useCacheFilters";
import HttpStatus from "../../utils/HttpStatus";
import CategoryService from "../../services/category/CategoryService";
import cloneDeep from "lodash.clonedeep";
import TeraApi from "../../services/api/TeraApi";
//Components
import BookItem from "./components/bookItem/BookItem";
import Input from "../../components/input/Input";
import Slider from "../../components/slider/Slider";
import BookFilters from "./components/bookFilters/BookFilters";
import Tag from "../../components/tag/Tag";
import Icon from "../../components/icon/Icon";
import EmptyStatus from "./components/emptyStatus/EmptyStatus";
import RequestError from "../../components/fetchStatus/requestError/RequestError";
import Pagination from "./components/pagination/Pagination";
//Styles
import './BookList.css';

function FilterButtonText(props) {

    let activeFiltersLength = 0;

    if (props.activeFilters.categories && props.activeFilters.categories.length) activeFiltersLength += 1;
    if (props.activeFilters.others && props.activeFilters.others.length) activeFiltersLength += 1;

    return <span className="BookList__slider_text_container">
        {activeFiltersLength > 0
            ? <Tag>{activeFiltersLength}</Tag>
            : <Tag><Icon type="filter_alt"/></Tag>}
        <span className="BookList__slider_text">Filtros</span></span>
}

export default function BookList(props) {

    const [booksStatus, setBooksStatus] = useState(HttpStatus.NOT_STARTED);
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState(null);

    const [sliderActive, setSliderActive] = useState(false);
    const [activeFilters, setActiveFilters] = useState({pageNumber: 1});
    const [searchTerm, setSearchTerm] = useState('');

    //Extraindo as categorias dos livros para criar uma filtragem com melhor usabilidade
    const categories = useMemo(() => CategoryService.getUniqueCategoriesFromBooks(books), [books]);

    /**
     * @param {Object} filters
     */
    function applyFilters(filters) {

        //Fecha o Slider ao aplicar/resetar os filtros
        setSliderActive(false);

        //Checando se algum filtro foi informado
        if (Object.keys(filters).length)
            setActiveFilters(prevFilters => {
                return {...prevFilters, ...filters}
            });

        //Caso contrário sete os filtros ativos para em branco
        else {
            let newActiveFilters = {};
            //Mantenha o filtro por nome ativo caso ele seja definido
            if (activeFilters.searchTerm && activeFilters.searchTerm.length)
                newActiveFilters.searchTerm = activeFilters.searchTerm;

            newActiveFilters.pageNumber = 1;

            setActiveFilters(newActiveFilters);
        }
    }

    /**
     * @param {Book} updatedBook
     */
    function likeBook(updatedBook) {

        //Atualizando o contador de likes do livro imutavelmente
        const newBooks = cloneDeep(books);

        let book = newBooks.find(book => book.id === updatedBook.id);
        book.liked = !book.liked;
        if (book.liked) book.likes += 1;
        else book.likes -= 1;

        setBooks(newBooks);

        TeraApi.saveBookList(newBooks);
    }

    function onInput(event) {
        const value = event.target.value;
        setSearchTerm(value);
        applyFilters({searchTerm: event.target.value.replace(/^\s+/gi, ''), pageNumber: 1});
    }

    function setCurrentPage(pageNumber) {
        applyFilters({pageNumber: pageNumber})
    }

    //Hook para buscar os livros da API
    useFetchBooks(setBooksStatus, setBooks, setFilteredBooks);
    //Hook que filtra/ordena a lista de livros ao alterar os filtros ativos
    useFilterBooks(setFilteredBooks, activeFilters, books);
    //Hook que armazena e aplica os filtros no cache
    useCacheFilters(activeFilters, setActiveFilters, setSearchTerm);

    const booksToShow = filteredBooks !== null && filteredBooks !== undefined && filteredBooks.list.length > 0;

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
            {HttpStatus.done(booksStatus) && booksToShow &&
            <>
                {filteredBooks.list.map(book => <div key={book.id} className="BookList__item">
                    <BookItem likeBook={likeBook} book={book}/>
                </div>)}
                <Pagination
                    onSetPage={setCurrentPage}
                    initialPage={activeFilters.pageNumber}
                    contentLength={filteredBooks.totalCount}
                    pageLength={8}
                    maxPageButtons={5}
                />
            </>}
            {HttpStatus.done(booksStatus) === true && !booksToShow &&
            <EmptyStatus title="Nenhum livro encontrado" text="Tente utilizar outros filtros"/>}
            {HttpStatus.waiting(booksStatus) === true && <span className="BookList__loading">Carregando...</span>}
            {HttpStatus.anyError(booksStatus) === true && <RequestError/>}
        </section>
    )
}