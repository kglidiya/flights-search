/* eslint-disable jsx-a11y/label-has-associated-control */
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import styles from './Sorting.module.css';

export default function Sorting({
	setSortBy,
	sortBy,
}: {
	setSortBy: Dispatch<SetStateAction<string>>;
	sortBy: string;
}) {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSortBy(e.target.value);
	};
	return (
		<>
			<div className={styles.radio}>
				<input
					type="radio"
					id="ASC"
					name="sortingParam"
					value="ASC"
					checked={sortBy === 'ASC'}
					onChange={handleChange}
				/>
				<label htmlFor="ASC" className={styles.label}>
					- по возрастанию цены
				</label>
			</div>

			<div className={styles.radio}>
				<input
					type="radio"
					id="DSC"
					name="sortingParam"
					value="DSC"
					onChange={handleChange}
				/>
				<label htmlFor="DSC" className={styles.label}>
					{' '}
					- по убыванию цены
				</label>
			</div>

			<div className={styles.radio}>
				<input
					type="radio"
					id="duration"
					name="sortingParam"
					value="duration"
					onChange={handleChange}
				/>
				<label htmlFor="duration" className={styles.label}>
					- по времени в пути
				</label>
			</div>
		</>
	);
}
