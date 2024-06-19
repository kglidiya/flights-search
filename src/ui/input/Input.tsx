import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import styles from './Input.module.css';
import { IFieldVales } from '../../utils/types';

interface IInput {
	label: string;
	name: 'priceMin' | 'priceMax';
	register: UseFormRegister<IFieldVales>;
	setValue?: UseFormSetValue<IFieldVales>;
}
const Input = ({ label, name, register }: IInput) => {
	return (
		<div className={styles.container}>
			<label className={styles.label} htmlFor={name}>
				{label}
			</label>
			<input
				type="number"
				autoComplete="off"
				{...register(name)}
				className={styles.input}
			/>
		</div>
	);
};

export default Input;
