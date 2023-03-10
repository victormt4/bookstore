import React from "react";
import Status from "components/status/Status";
import img from "assets/images/undraw_page_not_found_su7k.svg";

type NotFoundProps = {
    img?: string,
    title?: string
}

export default function NotFound(props: NotFoundProps): React.ReactElement {
    return <Status img={img} title={props.title ? props.title : 'Registro não encontrado'}/>
}