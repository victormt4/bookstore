import './Status.css';

export default function Status(props) {
    return (
        <section className="Status">
            <img className="Status__img" src={props.img} alt={props.title}/>
            <h2 className="Status__title">{props.title}</h2>
            {props.text !== undefined ? <p className="Status__text">{props.text}</p> : null}
        </section>
    )
}