import styles from './ShrinkLabel.module.css';

interface ShrinkLabelProps {
    label: string;
    inputHasValue: boolean;
    inputIsFocused: boolean;
}

const ShrinkLabel = (props: ShrinkLabelProps) => {
     
    const shouldShrink = (props.inputHasValue || props.inputIsFocused);
    const shouldShowStatic = !props.inputHasValue;

    if (!shouldShrink && !shouldShowStatic) {
        return null
    };

    return (
        <span
            className={shouldShrink ? styles.shrinkPlaceholder : styles.customPlaceholder}>
            {props.label}
        </span>
    );
};

export default ShrinkLabel;