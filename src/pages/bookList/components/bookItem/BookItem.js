import {Link} from "react-router-dom";
import Button from "../../../../components/button/Button";
import Icon from "../../../../components/icon/Icon";
import FallbackImage from "../../../../components/fallbackImage/FallbackImage";
import "./BookItem.css";

export default function BookItem(props) {
    return (
        <div className="BookItem">
            <div className="BookItem__containerImage">
                <Link to={`/book/${props.book.id}`}>
                    <FallbackImage
                        className="BookItem__image"
                        src={props.book.image}
                        alt={props.book.name}
                    />
                </Link>
            </div>
            <div className="BookItem__info">
                <div className="BookItem__info_text">
                    <h2><Link to={`/book/${props.book.id}`}>{props.book.name}</Link></h2>
                    <h3>{props.book.author}</h3>
                    <h3>{props.book.category}</h3>
                </div>
                <Button type="icon" onClick={() => props.likeBook(props.book)}>
                    <Icon color="#e03e3e" type={props.book.liked ? 'favorite' : 'favorite_border'}/>
                </Button>
            </div>
        </div>
    )
}