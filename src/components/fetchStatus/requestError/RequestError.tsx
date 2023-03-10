import React from "react";
import Status from "components/status/Status";
import img from "assets/images/undraw_warning_cyit.svg";

type RequestErrorProps = {
    img?: string,
    title?: string,
    text?: string
}

export default function RequestError(props: RequestErrorProps): React.ReactElement {
    return (
        <Status
            img={img}
            title={props.title ? props.title : 'Ocorreu algum erro na requisição'}
            text={props.text ? props.text : 'Entre em contato com o suporte'}
        />
    )
}