import Status from "../../../../components/status/Status";
import emptyImg from "../../../../assets/images/undraw_empty_xct9.svg";

export default function EmptyStatus(props) {
    return <Status img={emptyImg} title={props.title} text={props.text}/>
}