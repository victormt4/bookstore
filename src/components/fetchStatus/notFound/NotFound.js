import Status from "../../status/Status";
import img from "../../../assets/images/undraw_page_not_found_su7k.svg";

export default function NotFound(props) {
    return <Status img={img} title={props.title ? props.title : 'Registro não encontrado'}/>
}