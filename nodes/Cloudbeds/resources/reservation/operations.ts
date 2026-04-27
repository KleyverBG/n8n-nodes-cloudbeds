import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { cloudbedsApiRequest } from '../../shared/transport';

export async function create(this: IExecuteFunctions, index: number) {
	const startDate = this.getNodeParameter('startDate', index) as string;
	const endDate = this.getNodeParameter('endDate', index) as string;
	const guestFirstName = this.getNodeParameter('guestFirstName', index) as string;
	const guestLastName = this.getNodeParameter('guestLastName', index) as string;
	const guestEmail = this.getNodeParameter('guestEmail', index) as string;
	const guestCountry = this.getNodeParameter('guestCountry', index) as string;
	const guestZip = this.getNodeParameter('guestZip', index) as string;
	const roomTypeId = this.getNodeParameter('roomTypeId', index) as string;
	const roomQuantity = this.getNodeParameter('roomQuantity', index) as number;
	const adults = this.getNodeParameter('adults', index) as number;
	const children = this.getNodeParameter('children', index) as number;
	const paymentMethod = this.getNodeParameter('paymentMethod', index) as string;
	const additionalFields = this.getNodeParameter('additionalFields', index) as IDataObject;

	// Format dates to YYYY-MM-DD
	const formatDate = (dateStr: string) => {
		if (!dateStr) return '';
		// If already in YYYY-MM-DD format, return as-is
		if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
			return dateStr;
		}
		const date = new Date(dateStr);
		if (isNaN(date.getTime())) {
			return dateStr.split('T')[0];
		}
		return date.toISOString().split('T')[0];
	};

	// Build form data - Cloudbeds requires specific array format
	const body: IDataObject = {
		startDate: formatDate(startDate),
		endDate: formatDate(endDate),
		guestFirstName,
		guestLastName,
		guestEmail,
		guestCountry,
		guestZip,
		paymentMethod,
	};

	// Add room configuration as separate parameters (Cloudbeds form-urlencoded format)
	// Each room, adults, and children entry must specify the roomTypeID
	body['rooms[0][roomTypeID]'] = String(roomTypeId);
	body['rooms[0][quantity]'] = String(roomQuantity);
	body['adults[0][roomTypeID]'] = String(roomTypeId);
	body['adults[0][quantity]'] = String(adults);
	body['children[0][roomTypeID]'] = String(roomTypeId);
	body['children[0][quantity]'] = String(children);

	// Add optional fields
	if (additionalFields.guestPhone) {
		body.guestPhone = additionalFields.guestPhone;
	}
	if (additionalFields.guestGender) {
		body.guestGender = additionalFields.guestGender;
	}
	if (additionalFields.sourceID) {
		body.sourceID = additionalFields.sourceID;
	}
	if (additionalFields.thirdPartyIdentifier) {
		body.thirdPartyIdentifier = additionalFields.thirdPartyIdentifier;
	}
	if (additionalFields.estimatedArrivalTime) {
		body.estimatedArrivalTime = additionalFields.estimatedArrivalTime;
	}
	if (additionalFields.promoCode) {
		body.promoCode = additionalFields.promoCode;
	}
	if (additionalFields.sendEmailConfirmation !== undefined) {
		body.sendEmailConfirmation = additionalFields.sendEmailConfirmation;
	}

	return await cloudbedsApiRequest.call(this, 'POST', '/postReservation', body);
}

export async function get(this: IExecuteFunctions, index: number) {
	const reservationId = this.getNodeParameter('reservationId', index) as string;

	return await cloudbedsApiRequest.call(
		this,
		'GET',
		'/getReservation',
		{},
		{ reservationID: reservationId },
	);
}

export async function getAll(this: IExecuteFunctions, index: number) {
	const returnAll = this.getNodeParameter('returnAll', index);
	const additionalFields = this.getNodeParameter('additionalFields', index) as IDataObject;

	const qs: IDataObject = {};

	if (additionalFields.checkinDateFrom) {
		qs.checkInFrom = (additionalFields.checkinDateFrom as string).substring(0, 10);
	}

	if (additionalFields.checkinDateTo) {
		qs.checkInTo = (additionalFields.checkinDateTo as string).substring(0, 10);
	}

	if (additionalFields.status) {
		qs.status = additionalFields.status;
	}

	if (!returnAll) {
		const limit = this.getNodeParameter('limit', index);
		qs.pageSize = limit;
	}

	const response = await cloudbedsApiRequest.call(
		this,
		'GET',
		'/getReservations',
		{},
		qs,
	);
	return response.data || [];
}

export async function updateRoom(this: IExecuteFunctions, index: number) {
	const reservationId = this.getNodeParameter('reservationId', index) as string;
	const reservationRoomId = this.getNodeParameter('reservationRoomId', index, '') as string;
	const roomId = this.getNodeParameter('roomId', index) as string;
	const roomTypeId = this.getNodeParameter('roomTypeId', index, '') as string;

	const body: IDataObject = {
		reservationID: reservationId,
		newRoomID: roomId,
	};

	if (reservationRoomId) {
		body.reservationRoomID = reservationRoomId;
	}

	if (roomTypeId) {
		body.roomTypeID = roomTypeId;
	}

	return await cloudbedsApiRequest.call(
		this,
		'POST',
		'/postRoomAssign',
		body,
	);
}

export async function updateStatus(this: IExecuteFunctions, index: number) {
	const reservationId = this.getNodeParameter('reservationId', index) as string;
	const status = this.getNodeParameter('status', index) as string;

	const body: IDataObject = {
		reservationID: reservationId,
		status,
	};

	return await cloudbedsApiRequest.call(this, 'PUT', '/putReservation', body);
}
