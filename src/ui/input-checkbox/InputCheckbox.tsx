/* eslint-disable jsx-a11y/label-has-associated-control */
import { ChangeEvent, forwardRef, useImperativeHandle, useRef } from 'react';

import styles from './InputCkeckbox.module.css';

interface ICheckbox {
	name: string;

	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}
const InputCheckbox = forwardRef<HTMLInputElement, ICheckbox>(
	({ name, onChange }, ref) => {
		const innerRef = useRef<HTMLInputElement>(null);
		useImperativeHandle(ref, () => innerRef.current!, []);

		return (
			<div className={styles.container}>
				<input
					id={name}
					type="checkbox"
					className={styles.input}
					name={name}
					onChange={onChange}
					value={name}
					ref={innerRef}
				/>
				<label htmlFor={name} className={styles.label} />
			</div>
		);
	}
);

export default InputCheckbox;
