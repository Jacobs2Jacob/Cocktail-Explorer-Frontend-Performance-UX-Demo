import { useState } from 'react';
import baseStyles from '../InputBase.module.css';
import { InputBaseProps } from '../types';
import ShrinkLabel from '../ShrkinkLabel/ShrinkLabel';

interface TextInputProps extends InputBaseProps {
    type?: string;
}

const TextInput = (props: TextInputProps) => {
    const [isFocused, setIsFocused] = useState(false);

    // TODO: put it in shared utils
    const hasValue = props.value !== undefined && props.value !== '';

    return (
        <div style={{ position: 'relative' }}>
            <ShrinkLabel label={props.placeholder ? props.placeholder : props.label} inputHasValue={hasValue} inputIsFocused={isFocused} />

            <input
                {...props.register}
                type={props.type ?? 'text'}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                style={props.style}
                value={props.value ?? ''}
            />

            {props.error && <p className={baseStyles.inputErrorText}>{props.error.message}</p>}
        </div>
    );
};

export default TextInput;