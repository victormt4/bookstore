import React from "react";
import './Input.css';

type InputProps = {
    type?: string,
    placeholder?: string,
    onInput?: React.FormEventHandler,
    value?: string
}

export default function Input(props: InputProps): React.ReactElement {
    return (
        <input
            className="Input"
            type={props.type ? props.type : 'text'}
            placeholder={props.placeholder ? props.placeholder : ''}
            value={props.value}
            onInput={props.onInput}
        />
    )
}