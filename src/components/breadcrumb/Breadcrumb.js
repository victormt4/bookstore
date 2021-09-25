import {Link} from "react-router-dom";
import Icon from "../icon/Icon";
import './Breadcrumb.css';

export default function Breadcrumb(props) {
    return (
        <nav className="Breadcrumb">
            {props.crumbs.map((crumb, index) => {
                //Caso o crumb seja o primeiro da lista, adicione um ícone de "home"
                if (index === 0) {
                    return <Link disabled key={crumb.path} to={crumb.path}>
                        <Icon type="home"/>
                        {crumb.text}
                        <Icon type="navigate_next"/>
                    </Link>
                }

                //Caso o crumb seja o último da lista, não é necessário adicionar um link para ele
                if (index === (props.crumbs.length - 1)) return <span key={crumb.path} >{crumb.text}</span>

                return <Link disabled key={crumb.path} to={crumb.path}>
                    {crumb.text}
                    <Icon type="navigate_next"/>
                </Link>
            })}
        </nav>
    )
}