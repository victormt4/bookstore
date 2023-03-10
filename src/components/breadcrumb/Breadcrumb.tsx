import React from "react";
import {Link} from "react-router-dom";
import Icon from "../icon/Icon";
import './Breadcrumb.css';

export default function Breadcrumb(props): React.ReactElement {
    return (
        <nav className="Breadcrumb">
            {props.crumbs.map((crumb, index) => {
                //Caso o crumb seja o último da lista, não é necessário adicionar um link para ele
                if (index === (props.crumbs.length - 1)) return <span key={crumb.path}>{crumb.text}</span>

                const icon = index === 0 ? <Icon type="home"/> : null

                return <Link key={crumb.path} to={crumb.path}>
                    {icon}
                    {crumb.text}
                    <Icon type="navigate_next"/>
                </Link>
            })}
        </nav>
    )
}