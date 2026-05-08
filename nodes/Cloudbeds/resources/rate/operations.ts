import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { cloudbedsApiRequest } from '../../shared/transport';

export async function getAll(this: IExecuteFunctions, index: number) {
	const roomTypeId = this.getNodeParameter('roomTypeId', index, '') as string;
	const startDate = this.getNodeParameter('startDate', index) as string;
	const endDate = this.getNodeParameter('endDate', index) as string;

	const qs: IDataObject = {
		startDate,
		endDate,
	};

	if (roomTypeId) {
		qs.roomTypeID = roomTypeId;
	}

	return await cloudbedsApiRequest.call(this, 'GET', '/getRoomRates', {}, qs);
}

export async function update(this: IExecuteFunctions, index: number) {
	const roomTypeId = this.getNodeParameter('roomTypeId', index) as string;
	const startDate = this.getNodeParameter('startDate', index) as string;
	const endDate = this.getNodeParameter('endDate', index) as string;
	const price = this.getNodeParameter('price', index) as number;
	const additionalFields = this.getNodeParameter('additionalFields', index) as IDataObject;

	const body: IDataObject = {
		roomTypeID: roomTypeId,
		startDate,
		endDate,
		price,
	};

	if (additionalFields.ratePlanID) {
		body.ratePlanID = additionalFields.ratePlanID;
	}

	if (additionalFields.applyToAllRatePlans !== undefined) {
		body.applyToAllRatePlans = additionalFields.applyToAllRatePlans ? 1 : 0;
	}

	return await cloudbedsApiRequest.call(this, 'PUT', '/putRoomRate', body);
}

export async function updateReservationRate(this: IExecuteFunctions, index: number) {
	const reservationId = this.getNodeParameter('reservationId', index) as string;
	const reservationRoomId = this.getNodeParameter('reservationRoomId', index) as string;
	const startDate = this.getNodeParameter('startDate', index) as string;
	const endDate = this.getNodeParameter('endDate', index) as string;
	const price = this.getNodeParameter('price', index) as number;

	const body: IDataObject = {
		reservationID: reservationId,
		reservationRoomID: reservationRoomId,
		startDate,
		endDate,
		price,
	};

	return await cloudbedsApiRequest.call(this, 'PUT', '/putReservationRoomRate', body);
}
