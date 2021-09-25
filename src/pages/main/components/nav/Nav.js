import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Button from "../../../../components/button/Button";
import Icon from "../../../../components/icon/Icon";
import './Nav.css';

export default function Nav() {

    const [nightMode, setNightMode] = useState(false);

    function toggleNightMode() {
        setNightMode(prevNightMode => !prevNightMode);
    }

    //Efeito que ativa/desativa o modo noturno
    useEffect(() => {

        let metaTag = document.getElementById('meta-tag-theme-color');
        let htmlTag = document.querySelector('html');

        if (nightMode) {
            htmlTag.classList.add('Nightmode');
            metaTag.setAttribute('content', '#323232');
        } else {
            htmlTag.classList.remove('Nightmode');
            metaTag.setAttribute('content', '#F7F7F7');
        }
    }, [nightMode])

    return (
        <nav className="BookstoreNav">
            <h1><Link to="/">book<span className="BookstoreNav__logo_strong">store</span></Link></h1>
            <Button type="transparent" onClick={toggleNightMode}>
                <Icon type={nightMode ? 'light_mode' : 'dark_mode'}/>
                {nightMode ? 'Light Mode' : 'Dark Mode'}
            </Button>
        </nav>
    )
}