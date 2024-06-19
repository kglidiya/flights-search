import { memo, useEffect, useState } from 'react';
import styles from './Card.module.css';
import {
	getFormattedDay,
	getFormattedTime,
	getTransferCount,
	toHoursAndMinutes,
} from '../../utils/helpers';
import Clock from '../../ui/icons/clock/Clock';
import ButtonSelect from '../../ui/button-select/ButtonSelect.';
import { ILegs, IPrice, ISegment } from '../../utils/types';

interface IFlight {
	carrier: { uid: string; caption: string; airlineCode: string };
	price: IPrice;
	legs: ILegs[];
}
const Card = memo(({ carrier, price, legs }: IFlight) => {
	const [segmentsDepartureForward] = useState(legs[0].segments[0]);
	const [segmentsArrivalForward, setSegmentsArrivalForward] =
		useState<ISegment>();
	const [segmentsDepartureBackward] = useState(legs[1].segments[0]);
	const [segmentsArrivalBackward, setSegmentsArrivalBackward] =
		useState<ISegment>();

	useEffect(() => {
		if (legs[0].segments.length === 1) {
			setSegmentsArrivalForward(legs[0].segments[0]);
		} else
			setSegmentsArrivalForward(legs[legs[0].segments.length - 1].segments[0]);
	}, []);

	useEffect(() => {
		if (legs[1].segments.length === 1) {
			setSegmentsArrivalBackward(legs[1].segments[0]);
		} else
			setSegmentsArrivalBackward(legs[legs[1].segments.length - 1].segments[0]);
	}, []);

	return (
		<article className={styles.wrapper}>
			<div className={styles.header}>
				<p className={styles.carrier}>{carrier.caption}</p>
				<div className={styles.priceContainer}>
					<p className={styles.price}>{`${price.total.amount} \u20bd`}</p>
					<p className={styles.note}>
						Стоимсоть для одного взрослого пассажира
					</p>
				</div>
			</div>

			<div className={styles.destination}>
				<div className={styles.details}>
					<p>{segmentsDepartureForward.departureCity.caption}, </p>
					<p>{segmentsDepartureForward.departureAirport.caption} </p>
					<p className={styles.airportUid}>
						{`(${segmentsDepartureForward.departureAirport.uid})`}
					</p>
				</div>
				<p>&nbsp; &rarr; &nbsp;</p>
				{segmentsArrivalForward && (
					<div className={styles.details}>
						<p> {segmentsArrivalForward.arrivalCity.caption}, </p>
						<p>{segmentsArrivalForward.arrivalAirport.caption} </p>
						<p
							className={styles.airportUid}
						>{`(${segmentsArrivalForward.arrivalAirport.uid})`}</p>
					</div>
				)}
			</div>
			<div className={styles.timeDate}>
				<div className={styles.details}>
					<p>{getFormattedTime(segmentsDepartureForward.departureDate)} </p>
					<p>{getFormattedDay(segmentsDepartureForward.departureDate)}</p>
				</div>
				<div className={styles.details}>
					<Clock />
					<p style={{ margin: 0 }}>{toHoursAndMinutes(legs[0].duration)}</p>
				</div>

				{segmentsArrivalForward && (
					<div className={styles.details}>
						<p>{getFormattedDay(segmentsArrivalForward.arrivalDate)}</p>
						<p>{getFormattedTime(segmentsArrivalForward.arrivalDate)}</p>
					</div>
				)}
			</div>
			<div className={styles.transfer}>
				<span className={styles.line} />
				{legs[0].segments.length > 1 && (
					<p className={styles.transferCount}>
						{getTransferCount(legs[0].segments)}
					</p>
				)}
			</div>
			<p
				className={styles.airline}
			>{`Рейс выполняет: ${segmentsDepartureForward.airline.caption}`}</p>

			<div className={styles.destination}>
				<div className={styles.details}>
					{segmentsDepartureBackward.departureCity && (
						<p>{segmentsDepartureBackward.departureCity.caption}, </p>
					)}
					<p>{segmentsDepartureBackward.departureAirport.caption} </p>
					<p className={styles.airportUid}>
						{`(${segmentsDepartureBackward.departureAirport.uid})`}
					</p>
				</div>
				<p>&nbsp; &rarr; &nbsp;</p>
				{segmentsArrivalBackward && (
					<div className={styles.details}>
						<p>{segmentsArrivalBackward.arrivalCity.caption}, </p>
						<p>{segmentsArrivalBackward.arrivalAirport.caption} </p>
						<p
							className={styles.airportUid}
						>{`(${segmentsArrivalBackward.arrivalAirport.uid})`}</p>
					</div>
				)}
			</div>
			<div className={styles.timeDate}>
				<div className={styles.details}>
					<p>{getFormattedTime(segmentsDepartureBackward.departureDate)}</p>
					<p>{getFormattedDay(segmentsDepartureBackward.departureDate)}</p>
				</div>
				<div className={styles.details}>
					<Clock />
					<p style={{ margin: 0 }}>{toHoursAndMinutes(legs[0].duration)}</p>
				</div>

				{segmentsArrivalBackward && (
					<div className={styles.details}>
						<p>{getFormattedDay(segmentsArrivalBackward.arrivalDate)}</p>

						<p>{getFormattedTime(segmentsArrivalBackward.arrivalDate)}</p>
					</div>
				)}
			</div>
			<div className={styles.transfer}>
				<span className={styles.line} />
				{legs[1].segments.length > 1 && (
					<p className={styles.transferCount}>
						{getTransferCount(legs[1].segments)}
					</p>
				)}
			</div>
			<p>{`Рейс выполняет: ${segmentsDepartureBackward.airline.caption}`}</p>
			<ButtonSelect />
		</article>
	);
});

export default Card;
