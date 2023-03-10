import React, {useState, useEffect} from "react";
import Button from "../button/Button";
import "./Slider.css";

type SliderProps = {
    title: React.ReactNode,
    children: React.ReactNode,
    btnText?: React.ReactNode,
    active?: boolean,
    setActive?: (fn: (active: boolean) => boolean) => void
}

export default function Slider(props: SliderProps): React.ReactElement {

    const [active, setActive] = useState(props.active !== undefined ? props.active : false);

    useEffect(() => {
        if (props.active !== undefined) {
            setActive(props.active);
        }
    }, [props.active])

    useEffect(() => {

        if (active) document.body.style.overflowY = 'hidden';
        else document.body.style.overflowY = 'scroll';

    }, [active])

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