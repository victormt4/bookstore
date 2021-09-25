import "./Slider.css";
import {useState, useEffect} from "react";
import Button from "../button/Button";

export default function Slider(props) {

    const [active, setActive] = useState(props.active !== undefined ? props.active : false);

    //Efeito para abrir/fechar o Slider caso ele seja controlado por um componente pai
    useEffect(() => {
        if (props.active !== undefined) {
            setActive(props.active);
        }
    }, [props.active])

    //Efeito que esconde a barra de rolagem ao ativar o Slider
    useEffect(() => {

        if (active) document.body.style.overflowY = 'hidden';
        else document.body.style.overflowY = 'scroll';

    }, [active])

    //Habilita ou desabilita o Slider
    //Caso ele seja controlado pelo elemento pai, é necessário usar o props.setActive ao invés do setActive local
    function toggleActive() {
        if (props.setActive !== undefined) props.setActive(prevActive => !prevActive);
        else setActive(prevState => !prevState);
    }

    return (
        <div className="Slider">
            <Button onClick={toggleActive}>{props.btnText ? props.btnText : 'Slider'}</Button>
            <div className={`Slider__content ${active ? 'Slider__content--show' : ''}`}>
                <header className="Slider__header">
                    <h2 className="Slider__header_title">{props.title}</h2>
                    <Button onClick={toggleActive}>X</Button>
                </header>
                {props.children}
            </div>
        </div>
    )
}