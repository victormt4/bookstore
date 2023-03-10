import React, {useState} from "react";
import HttpStatus from "utils/HttpStatus";
import useFetchBook from "./hooks/useFetchBook";
import deepClone from "lodash.clonedeep";
import Api from "services/api/Api";
import Book from "model/Book";
//Components
import NotFound from "components/fetchStatus/notFound/NotFound";
import RequestError from "components/fetchStatus/requestError/RequestError";
import Breadcrumb from "components/breadcrumb/Breadcrumb";
import FallbackImage from "components/fallbackImage/FallbackImage";
import OutOfStockOverlay from "./components/OutOfStockOverlay";
import Icon from "components/icon/Icon";
import Button from "components/button/Button";
//Styles
import './BookDetails.css';

type BookDetailsProps = {
    match: { params: { id: number } }
}

export default function BookDetails(props: BookDetailsProps): React.ReactElement {
    const bookId = props.match.params.id;

    const [book, setBook] = useState<Book>(null)
    const [status, setStatus] = useState<number>(HttpStatus.WAITING);

    function toggleBookLike() {
        let newBook = deepClone(book);
        newBook.liked = !newBook.liked;
        if (newBook.liked) newBook.likes += 1;
        else newBook.likes -= 1;
        setBook(newBook);
        Api.updateBook(newBook);
    }

    useFetchBook(bookId, setBook, setStatus);

    return (
        <div className="BookDetails">
            <div className="BookDetails__breadcrumb_container">
                <Breadcrumb crumbs={[
                    {path: '/', text: 'Livros'},
                    {path: '/book', text: 'Detalhes'}
                ]}/>
            </div>
            <section className="BookDetails__content">
                <HttpStatusOrContent status={status} book={book} toggleBookLike={toggleBookLike}/>
            </section>
        </div>
    )
}

type HttpStatusOrContentProps = {
    status: number,
    toggleBookLike: () => void
    book?: Book,
}

function HttpStatusOrContent(props: HttpStatusOrContentProps) {
    if (HttpStatus.done(props.status) && props.book !== null) {
        return (
            <>
                <h1 className="BookDetails__title">{props.book.name}</h1>
                <div className="BookDetails__img__container">
                    <FallbackImage className="BookDetails__img" src={props.book.image} alt={props.book.name}/>
                    {props.book.stock === 0 && <OutOfStockOverlay/>}
                </div>
                <div className="BookDetails__info__container">
                    <div className="BookDetails__author">
                        <h2>{props.book.author}</h2>
                        <h2>{props.book.category}</h2>
                        <Button type="icon" onClick={props.toggleBookLike}>
                            <Icon type={props.book.liked ? 'favorite' : 'favorite_border'} color="#e03e3e"/>
                        </Button>
                    </div>
                    <div className="BookDetails__stock">
                        {props.book.stock > 0
                            ? <span>Em estoque: {props.book.stock} unidade(s)</span>
                            : <span>Fora de estoque</span>}
                    </div>
                </div>
                <p className="BookDetails__description">
                    {props.book.description}
                </p>
            </>
        )
    }

    if (HttpStatus.done(props.status) && props.book === null) return <NotFound title="Ops, este livro não existe"/>;
    if (HttpStatus.anyError(props.status)) return <RequestError/>;
    return <p>Carregando...</p>
}