import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { cloudbedsApiRequest } from '../../shared/transport';

function toDateString(value: string): string {
	return value.substring(0, 10);
}

export async function getRatePlans(this: IExecuteFunctions, index: number) {
	const roomTypeId = this.getNodeParameter('roomTypeId', index, '') as string;
	const startDate = toDateString(this.getNodeParameter('startDate', index) as string);
	const endDate = toDateString(this.getNodeParameter('endDate', index) as string);

	const qs: IDataObject = {
		startDate,
		endDate,
		detailedRates: true,
	};

	if (roomTypeId) {
		qs.roomTypeID = roomTypeId;
	}

	return await cloudbedsApiRequest.call(this, 'GET', '/getRatePlans', {}, qs);
}

export async function getAll(this: IExecuteFunctions, index: number) {
	const roomTypeId = this.getNodeParameter('roomTypeId', index, '') as string;
	const startDate = toDateString(this.getNodeParameter('startDate', index) as string);
	const endDate = toDateString(this.getNodeParameter('endDate', index) as string);

	const qs: IDataObject = {
		startDate,
		endDate,
	};

	if (roomTypeId) {
		qs.roomTypeID = roomTypeId;
	}

	return await cloudbedsApiRequest.call(this, 'GET', '/getRate', {}, qs);
}

export async function update(this: IExecuteFunctions, index: number) {
	const rateId = this.getNodeParameter('rateId', index) as string;
	const startDate = toDateString(this.getNodeParameter('startDate', index) as string);
	const endDate = toDateString(this.getNodeParameter('endDate', index) as string);

	const dayPrices: number[] = [
		this.getNodeParameter('sunPrice', index) as number, // 0 = Sunday
		this.getNodeParameter('monPrice', index) as number, // 1 = Monday
		this.getNodeParameter('tuePrice', index) as number, // 2 = Tuesday
		this.getNodeParameter('wedPrice', index) as number, // 3 = Wednesday
		this.getNodeParameter('thuPrice', index) as number, // 4 = Thursday
		this.getNodeParameter('friPrice', index) as number, // 5 = Friday
		this.getNodeParameter('satPrice', index) as number, // 6 = Saturday
	];

	// Build one interval entry per date in the range
	const intervals: Array<{ startDate: string; endDate: string; rate: number }> = [];
	const startMs = new Date(startDate + 'T00:00:00Z').getTime();
	const endMs = new Date(endDate + 'T00:00:00Z').getTime();
	for (let ms = startMs; ms <= endMs; ms += 86400000) {
		const d = new Date(ms);
		const dateStr = d.toISOString().substring(0, 10);
		const dayOfWeek = d.getUTCDay(); // 0=Sun, 1=Mon, ... 6=Sat
		intervals.push({ startDate: dateStr, endDate: dateStr, rate: dayPrices[dayOfWeek] });
	}

	// The API limits 30 intervals per request — split into batches
	const BATCH_SIZE = 30;
	let lastResult: IDataObject = {};
	for (let i = 0; i < intervals.length; i += BATCH_SIZE) {
		const batch = intervals.slice(i, i + BATCH_SIZE);
		const body: IDataObject = {};
		body['rates[0][rateID]'] = rateId;
		for (let j = 0; j < batch.length; j++) {
			body[`rates[0][interval][${j}][startDate]`] = batch[j].startDate;
			body[`rates[0][interval][${j}][endDate]`] = batch[j].endDate;
			body[`rates[0][interval][${j}][rate]`] = batch[j].rate;
		}
		lastResult = await cloudbedsApiRequest.call(this, 'POST', '/putRate', body) as IDataObject;
	}

	return lastResult;
}
