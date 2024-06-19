/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */

import { IFlight, ISegment } from './types';

const removeDuplcates = (arr: string[] | number[] | null[]) => {
	const set = new Set<string | number | null>(arr);
	return Array.from(set) as any;
};

export const getLegsAndCarriers = (arr: IFlight[]) => {
	const legs = [] as string[];
	const carriers = [] as string[];
	arr.forEach((flights) => {
		flights.flight.legs.forEach((leg) =>
			legs.push(String(leg.segments.length))
		);

		carriers.push(flights.flight.carrier.caption);
	});

	return { legs: removeDuplcates(legs), carriers: removeDuplcates(carriers) };
};

export const filterByPrice = (
	arr: IFlight[],
	priceMin?: string,
	priceMax?: string
) => {
	return arr.filter((el) => {
		if (!priceMax && priceMin && +el.flight.price.total.amount >= +priceMin) {
			return el;
		}
		if (!priceMin && priceMax && +el.flight.price.total.amount <= +priceMax) {
			return el;
		}
		if (
			priceMax &&
			priceMin &&
			+el.flight.price.total.amount >= +priceMin &&
			+el.flight.price.total.amount <= +priceMax
		) {
			return el;
		}
	});
};

export const getTransferCount = (segments: ISegment[]) => {
	if (segments.length === 1) return 'без пересадок';
	if (segments.length === 2) return '1 пересадка';
	if (segments.length === 3) return '2 пересадки';
};

export const getFormattedTime = (dateData: string) => {
	if (dateData) {
		const date = new Date(dateData);
		return `${String(date.getHours()).padStart(2, '0')}:${String(
			date.getMinutes()
		).padStart(2, '0')}`;
	}
};

export const getFormattedDay = (dateData: string) => {
	if (dateData) {
		const date = new Date(dateData);
		const dayFormatted = new Intl.DateTimeFormat('ru', {
			day: 'numeric',
			month: 'short',
			weekday: 'short',
		}).format(date);
		return dayFormatted;
	} else return '';
};

export const toHoursAndMinutes = (totalMinutes: number) => {
	const minutes = totalMinutes % 60;
	const hours = Math.floor(totalMinutes / 60);

	return `${hours} ч ${minutes > 0 ? ` ${minutes} мин` : ''}`;
};

export const getSegmentCount = (segments: number) => {
	let count = '';

	if (segments === 1) count = 'без пересадок';
	if (segments === 2) count = '1 пересадка';
	if (segments === 3) count = '2 пересадки';

	return count;
};

export const sortByPriceASC = (arr: IFlight[]) => {
	return arr.sort(
		(a, b) =>
			Number(a.flight.price.total.amount) - Number(b.flight.price.total.amount)
	);
};

export const sortByPriceDSC = (arr: IFlight[]) => {
	return arr.sort(
		(a, b) =>
			Number(b.flight.price.total.amount) - Number(a.flight.price.total.amount)
	);
};

const getFlightDuration = (flight: IFlight) => {
	let duration = 0;
	flight.flight.legs.forEach((leg) => {
		duration += leg.duration;
	});
	return duration;
};

export const sortByDuration = (arr: IFlight[]) => {
	return arr.sort((a, b) => {
		return getFlightDuration(a) - getFlightDuration(b);
	});
};

export const getCheapestFlight = (arr: IFlight[], airline: string) => {
	const flightsFiltered = arr.filter((el) => {
		if (el.flight.carrier.caption === airline) {
			return el;
		}
	});
	return sortByPriceASC(flightsFiltered)[0]?.flight.price.total.amount;
};
