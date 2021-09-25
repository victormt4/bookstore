import {useState} from "react";
import fallbackImgSrc from "../../assets/images/undraw_Bibliophile_hwqc.svg";

export default function FallbackImage(props) {

    const [src, setSrc] = useState(props.src);

    function onError() {
        setSrc(props.fallbackImgSrc ? props.fallbackImgSrc : fallbackImgSrc);
    }

    let inheritedProps = {};

    if (props.className) {
        inheritedProps.className = props.className;
    }

    return <img
        onError={onError}
        alt={props.alt ? props.alt : 'Imagem'}
        src={src}
        {...inheritedProps}
    />
}