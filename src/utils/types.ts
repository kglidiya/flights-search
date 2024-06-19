export interface IFieldVales {
	priceMin: string | undefined;
	priceMax: string | undefined;
}

export interface ISegment {
	aircraft: { uid: string; caption: string };
	airline: { uid: string; caption: string; airlineCode: string };
	arrivalAirport: { uid: string; caption: string };
	arrivalCity: { uid: string; caption: string };
	arrivalDate: string;
	classOfService: { uid: string; caption: string };
	classOfServiceCode: string;
	departureAirport: { uid: string; caption: string };
	departureCity: { uid: string; caption: string };
	departureDate: string;
	flightNumber: string;
	servicesDetails: {
		fareBasis: { ADULT: string };
		freeCabinLuggage: object;
		freeLuggage: { ADULT: { nil: boolean } };
		paidCabinLuggage: object;
		paidLuggage: object;
		tariffName: string;
	};
	starting: boolean;
	stops: number;
	techStopInfos: any[];
	travelDuration: number;
}
export interface ILegs {
	duration: number;
	segments: ISegment[];
}
export interface IPassengerPrices {
	passengerCount: number;
	passengerType: { uid: string; caption: string };
	singlePassengerTotal: {
		amount: string;
		currency: string;
		currencyCode: string;
	};

	tariff: { amount: string; currency: string; currencyCode: string };
	total: { amount: string; currency: string; currencyCode: string };
}

export interface IPrice {
	passengerPrices: IPassengerPrices[];
	rates: {
		totalEur: { amount: string; currencyCode: string };
		totalUsd: { amount: string; currencyCode: string };
	};
	total: { amount: string; currency: string; currencyCode: string };
	totalFeeAndTaxes: {
		amount: string;
		currency: string;
		currencyCode: string;
	};
}

export interface ISeats {
	count: number;
	type: { uid: string; caption: string };
}

export interface IFlight {
	hasExtendedFare: boolean;
	flight: {
		carrier: { uid: string; caption: string; airlineCode: string };
		exchange: {
			ADULT: {
				exchangeAfterDeparture: {
					amount: string;
					currency: string;
					currencyCode: string;
				};
				exchangeBeforeDeparture: {
					amount: string;
					currency: string;
					currencyCode: string;
				};
				exchangeableAfterDeparture: boolean;
				exchangeableBeforeDeparture: boolean;
			};
		};
		international: boolean;
		isTripartiteContractDiscountApplied: boolean;
		legs: ILegs[];
		price: IPrice;
		refund: {
			ADULT: {
				refundableBeforeDeparture: boolean;
				refundableAfterDeparture: boolean;
			};
		};
		seats: ISeats[];
		servicesStatuses: {
			baggage: { uid: string; caption: string };
			exchange: { uid: string; caption: string };
			refund: { uid: string; caption: string };
		};
	};
	flightToken: string;
}
