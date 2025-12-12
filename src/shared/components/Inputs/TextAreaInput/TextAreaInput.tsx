import { useState } from 'react';
import baseStyles from '../InputBase.module.css';
import { InputBaseProps } from '../types';
import ShrinkLabel from '../ShrkinkLabel/ShrinkLabel';

interface TextAreaInputProps extends InputBaseProps {
    maxLength?: number;
}

const TextareaInput = (props: TextAreaInputProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = props.value !== undefined && props.value !== '';

    return (
        <div style={{ position: 'relative' }}>

            <ShrinkLabel label={props.placeholder ? props.placeholder : props.label} inputHasValue={hasValue} inputIsFocused={isFocused} />

            <textarea
                {...props.register}
                maxLength={props.maxLength ?? 200}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                value={props.value ?? ''}
                style={props.style}
                className={baseStyles.textarea}
            />
            {props.error && <p className={baseStyles.inputErrorText}>{props.error.message}</p>}
        </div>
    );
};

export default TextareaInput;