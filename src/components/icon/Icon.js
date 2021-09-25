import './Icon.css';

export default function Icon (props) {

    let styles = {};

    if (props.color) styles.color = props.color;

    return (
        <span style={styles} className={`Icon material-icons`}>{props.type}</span>
    )
}