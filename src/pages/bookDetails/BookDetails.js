//Libs/Services
import {useState} from "react";
import HttpStatus from "../../utils/HttpStatus";
import useFetchBook from "./hooks/useFetchBook";
import deepClone from "lodash.clonedeep";
//Components
import NotFound from "../../components/fetchStatus/notFound/NotFound";
import RequestError from "../../components/fetchStatus/requestError/RequestError";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import FallbackImage from "../../components/fallbackImage/FallbackImage";
import OutOfStockOverlay from "./components/OutOfStockOverlay";
import Icon from "../../components/icon/Icon";
import Button from "../../components/button/Button";
//Styles
import './BookDetails.css';
import TeraApi from "../../services/api/TeraApi";

export default function BookDetails(props) {

    const bookId = props.match.params.id;

    const [book, setBook] = useState(null)
    const [status, setStatus] = useState(HttpStatus.WAITING);

    function toogleBookLike() {
        let newBook = deepClone(book);
        newBook.liked = !newBook.liked;
        if (newBook.liked) newBook.likes += 1;
        else newBook.likes -= 1;
        setBook(newBook);
        TeraApi.updateBook(newBook);
    }

    useFetchBook(bookId, setBook, setStatus);

    function Content() {
        if (HttpStatus.waiting(status)) return <p>Carregando...</p>
        if (HttpStatus.done(status) && book !== null) {
            return (
                <>
                    <h1 className="BookDetails__title">{book.name}</h1>
                    <div className="BookDetails__img__container">
                        <FallbackImage className="BookDetails__img" src={book.image} alt={book.name}/>
                        {book.stock === 0 && <OutOfStockOverlay/>}
                    </div>
                    <div className="BookDetails__info__container">
                        <div className="BookDetails__author">
                            <h2>{book.author}</h2>
                            <h2>{book.category}</h2>
                            <Button type="icon" onClick={toogleBookLike}>
                                <Icon type={book.liked ? 'favorite' : 'favorite_border'} color="#e03e3e"/>
                            </Button>
                        </div>
                        <div className="BookDetails__stock">
                            {book.stock > 0
                                ? <span>Em estoque: {book.stock} unidade(s)</span>
                                : <span>Fora de estoque</span>}
                        </div>
                    </div>
                    <p className="BookDetails__description">
                        {book.description}
                    </p>
                </>
            )
        }
        if (HttpStatus.done(status) && book === null) return <NotFound title="Ops, este livro não existe"/>;
        if (HttpStatus.anyError(status)) return <RequestError/>;
    }

    return (
        <div className="BookDetails">
            <div className="BookDetails__breadcrumb_container">
                <Breadcrumb crumbs={[
                    {path: '/', text: 'Livros'},
                    {path: '/book', text: 'Detalhes'}
                ]}/>
            </div>
            <section className="BookDetails__content">
                <Content/>
            </section>
        </div>
    )
}