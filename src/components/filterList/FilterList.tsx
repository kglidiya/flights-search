import { ChangeEvent } from 'react';
import styles from './FilterList.module.css';
import InputCheckbox from '../../ui/input-checkbox/InputCheckbox';
import { getCheapestFlight, getSegmentCount } from '../../utils/helpers';
import data from '../../utils/flights.json';
import { IFlight } from '../../utils/types';

const flightsData = data.result.flights as IFlight[];

export default function FilterList({
	options,
	handleChange,
}: {
	options: string[] | number[];
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
	return (
		<ul className={styles.list}>
			{options.map((option) => {
				return (
					<li key={option} className={styles.item}>
						<InputCheckbox name={option as string} onChange={handleChange} />
						{option !== '1' && option !== '2' ? (
							<>
								{' '}
								<p className={styles.carrier}>{option}</p>
								<p className={styles.carrier}>
									{`от ${getCheapestFlight(flightsData, option as string)} р.`}
								</p>
							</>
						) : (
							<p className={styles.carrier}>
								{getSegmentCount(Number(option))}
							</p>
						)}
					</li>
				);
			})}
		</ul>
	);
}
