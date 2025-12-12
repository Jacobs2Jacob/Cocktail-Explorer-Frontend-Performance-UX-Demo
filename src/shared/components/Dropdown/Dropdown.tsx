import styles from './Dropdown.module.css';

export interface DropdownItem {
    id: string;
    name: string;
    image: string;
}

interface DropdownProps {
    items: DropdownItem[];
    onSelect: (item: DropdownItem) => void;
    maxItems?: number;
}

const Dropdown = (props: DropdownProps) => {
    return (
        <ul className={styles.dropdown}>
            {props.items.slice(0, props.maxItems ?? 10).map((item: DropdownItem) => (
                <li className={styles.resultItem} key={item.id} onClick={()=> props.onSelect(item)}>
                    {item.image && <img src={item.image} alt={item.name} className={styles.resultImage} />}
                    <span className={styles.resultText}>{item.name}</span>
                </li>
            ))}
        </ul>
    );
};

export default Dropdown;