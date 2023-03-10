import React from "react";
import Status from "components/status/Status";
import img from "assets/images/undraw_page_not_found_su7k.svg";

export default function PageNotFound(): React.ReactElement {
    return <Status img={img} title="Página não encontrada"/>
}