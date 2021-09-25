import './Input.css';

export default function Input(props) {

    const inheritedProps = {};

    if (props.onInput) {
        inheritedProps.onInput = props.onInput;
    }

    if (props.value !== undefined) inheritedProps.value = props.value;

    return (
        <input
            className="Input"
            type={props.type ? props.type : 'text'}
            placeholder={props.placeholder ? props.placeholder : ''}
            {...inheritedProps}
        />
    )
}