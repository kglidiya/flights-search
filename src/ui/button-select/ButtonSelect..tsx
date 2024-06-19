import styles from './ButtonSelect.module.css';

interface IButton {
	onClick?: () => void;
}
export default function ButtonSelect({ onClick }: IButton) {
	return (
		<button
			type="button"
			aria-label="button"
			className={styles.button}
			onClick={onClick}
		>
			ВЫБРАТЬ
		</button>
	);
}
