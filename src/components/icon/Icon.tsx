import React from 'react';
import './Icon.css';

type Styles = {
    color?: string
}

type Props = {
    type: string,
    color?: string
}

export default function Icon (props: Props): React.ReactElement {

    let styles: Styles = {};

    if (props.color) styles.color = props.color;

    return (
        <span style={styles} className={`Icon material-icons`}>{props.type}</span>
    )
}