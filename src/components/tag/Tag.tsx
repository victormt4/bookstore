import React from 'react';
import './Tag.css';

export default function Tag(props: { children: React.ReactNode }) {
    return (<span className="Tag">{props.children}</span>)
}