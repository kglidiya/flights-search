/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import data from './utils/flights.json';
import {
	filterByPrice,
	getLegsAndCarriers,
	sortByDuration,
	sortByPriceASC,
	sortByPriceDSC,
} from './utils/helpers';
import FilterList from './components/filterList/FilterList';
import Input from './ui/input/Input';
import Card from './components/card/Card';
import Sorting from './components/sorting/Sorting';
import { IFieldVales, IFlight } from './utils/types';

const flightsData = data.result.flights as IFlight[];

function App() {
	const [legsNumber, setLegsNumber] = useState<number[]>([]);
	const [carriers, setCarriers] = useState<string[]>([]);
	const [selectedCarries, setSelectedCarries] = useState<string[]>([]);
	const [selectedTransfers, setSelectedTranfers] = useState<number[]>([]);
	const [flightsToShow, setFlightsToShow] = useState<IFlight[]>(flightsData);
	const [sortBy, setSortBy] = useState('ASC');
	const { register, setValue, getValues, handleSubmit } = useForm<IFieldVales>({
		values: { priceMin: undefined, priceMax: undefined },
	});

	useEffect(() => {
		setLegsNumber(getLegsAndCarriers(flightsData).legs);
		setCarriers(getLegsAndCarriers(flightsData).carriers);
	}, []);

	const selectCarriers = (item: string, checked: boolean) => {
		if (checked) {
			setSelectedCarries([...selectedCarries, item]);
		} else {
			setSelectedCarries((prev) => prev.filter((el) => el !== item));
		}
	};

	const selectLegs = (item: number, checked: boolean) => {
		if (checked) {
			setSelectedTranfers([...selectedTransfers, item]);
		} else {
			setSelectedTranfers((prev) => prev.filter((el) => el !== item));
		}
	};
	const handleChangeCarries = (e: ChangeEvent<HTMLInputElement>) => {
		const { target } = e;
		selectCarriers(target.value, target.checked);
	};

	const handleChangeTransfers = (e: ChangeEvent<HTMLInputElement>) => {
		const { target } = e;
		selectLegs(Number(target.value), target.checked);
	};

	const filter = () => {
		const priceMin = getValues('priceMin');
		const priceMax = getValues('priceMax');

		if (selectedCarries.length > 0 && selectedTransfers.length === 0) {
			const flightsFiltered = flightsData.filter((el) => {
				if (selectedCarries.join().includes(el.flight.carrier.caption))
					return el;
			});
			setTimeout(() => {
				if (priceMin || priceMax) {
					setFlightsToShow(filterByPrice(flightsFiltered, priceMin, priceMax));
				} else if (!priceMin || !priceMax) setFlightsToShow(flightsFiltered);
			}, 0);
		}

		if (selectedCarries.length > 0 && selectedTransfers.length > 0) {
			const flightsFiltered = flightsData.filter((el) => {
				if (selectedCarries.join().includes(el.flight.carrier.caption))
					for (let i = 1; i < el.flight.legs.length; i++) {
						if (
							selectedTransfers
								.join()
								.includes(String(el.flight.legs[i].segments.length))
						) {
							return el;
						}
					}
			});
			setTimeout(() => {
				if (priceMin || priceMax) {
					setFlightsToShow(filterByPrice(flightsFiltered, priceMin, priceMax));
				} else if (!priceMin || !priceMax) setFlightsToShow(flightsFiltered);
			}, 0);
		}

		if (selectedCarries.length === 0 && selectedTransfers.length > 0) {
			const flightsFiltered = flightsData.filter((el) => {
				for (let i = 1; i < el.flight.legs.length; i++) {
					if (
						selectedTransfers
							.join()
							.includes(String(el.flight.legs[i].segments.length))
					) {
						return el;
					}
				}
			});
			setTimeout(() => {
				if (priceMin || priceMax) {
					setFlightsToShow(filterByPrice(flightsFiltered, priceMin, priceMax));
				} else if (!priceMin || !priceMax) setFlightsToShow(flightsFiltered);
			}, 0);
		}

		if (
			selectedCarries.length === 0 &&
			selectedTransfers.length === 0 &&
			(priceMin || priceMax)
		) {
			const flightsFiltered = filterByPrice(flightsData, priceMin, priceMax);
			setFlightsToShow(flightsFiltered);
		}

		if (
			selectedCarries.length === 0 &&
			selectedTransfers.length === 0 &&
			!priceMax &&
			!priceMin
		) {
			setFlightsToShow(flightsData);
		}
	};

	useEffect(() => {
		filter();
	}, [selectedCarries, selectedTransfers]);

	const sort = (arr: IFlight[]) => {
		if (sortBy === 'ASC') {
			return sortByPriceASC(arr);
		}
		if (sortBy === 'DSC') {
			return sortByPriceDSC(arr);
		}
		if (sortBy === 'duration') {
			return sortByDuration(arr);
		}
	};
	const onSubmit = () => {
		filter();
	};

	return (
		<main className="main">
			<aside>
				<p className="filters">Сортировать</p>
				<Sorting setSortBy={setSortBy} sortBy={sortBy} />
				<p className="filters">Фильтровать</p>
				<FilterList options={legsNumber} handleChange={handleChangeTransfers} />
				<p className="filters">Цена</p>
				<form onSubmit={handleSubmit(onSubmit)} noValidate>
					<Input
						name="priceMin"
						register={register}
						setValue={setValue}
						label="От"
					/>
					<Input
						name="priceMax"
						register={register}
						setValue={setValue}
						label="До"
					/>
					<button type="submit" style={{ display: 'none' }} />
				</form>
				<p className="filters">Авиакомпания</p>
				<FilterList options={carriers} handleChange={handleChangeCarries} />
			</aside>
			<div className="flights">
				{flightsToShow.length === 0 && (
					<p style={{ textAlign: 'center' }}>Поиск не дал результата</p>
				)}
				{flightsToShow.length > 0 &&
					sort(flightsToShow)?.map((flightData: IFlight) => {
						return <Card key={flightData.flightToken} {...flightData.flight} />;
					})}
			</div>
		</main>
	);
}

export default App;
