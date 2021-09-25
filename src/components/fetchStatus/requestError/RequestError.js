import Status from "../../status/Status";
import img from "../../../assets/images/undraw_warning_cyit.svg";

export default function RequestError(props) {
    return <Status
        img={img}
        title={props.title ? props.title : 'Ocorreu algum erro na requisição'}
        text={props.text ? props.text : 'Entre em contato com o suporte'}
    />
}