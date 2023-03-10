import React from "react";
import {useState} from "react";
import fallbackImgSrc from "assets/images/undraw_Bibliophile_hwqc.svg";

type FallbackImageProps = {
    src: string,
    fallbackImgSrc?: string,
    className?: string,
    alt?: string
}

export default function FallbackImage(props: FallbackImageProps): React.ReactElement {

    const [src, setSrc] = useState<string>(props.src);

    function onError() {
        setSrc(props.fallbackImgSrc ? props.fallbackImgSrc : fallbackImgSrc);
    }

    return <img
        onError={onError}
        alt={props.alt ? props.alt : 'Imagem'}
        src={src}
        className={props.className}
    />
}