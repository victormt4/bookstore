import React from "react";
import "./Button.css";

type Props = {
    onClick: (event: React.MouseEvent) => void
    children: React.ReactNode;
    type?: string,
    htmlType?: 'submit' | 'reset' | 'button',
}

export default function Button(props: Props): React.ReactElement {

    let classType = '';

    const buttonType = props.type ? props.type : '';

    switch (buttonType) {
        case 'primary':
            classType = 'Button--primary';
            break;
        case 'icon':
            classType = 'Button--icon';
            break;
        default:
            classType = 'Button--secondary'
    }

    return (
        <button
            onClick={props.onClick}
            type={props.htmlType ? props.htmlType : 'button'}
            className={`Button ${classType}`}
        >
            {props.children}
        </button>
    )
}