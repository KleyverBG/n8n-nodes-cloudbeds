import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { cloudbedsApiRequest } from '../../shared/transport';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getAll(this: IExecuteFunctions, _index: number) {
	return await cloudbedsApiRequest.call(this, 'GET', '/getRooms');
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getRoomTypes(this: IExecuteFunctions, _index: number) {
	return await cloudbedsApiRequest.call(this, 'GET', '/getRoomTypes');
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getUnassigned(this: IExecuteFunctions, _index: number) {
	return await cloudbedsApiRequest.call(this, 'GET', '/getRoomsUnassigned');
}

export async function getAvailable(this: IExecuteFunctions, index: number) {
	const startDate = this.getNodeParameter('startDate', index) as string;
	const endDate = this.getNodeParameter('endDate', index) as string;
	const rooms = this.getNodeParameter('rooms', index) as number;
	const adults = this.getNodeParameter('adults', index) as number;

	const qs: IDataObject = {
		startDate,
		endDate,
		rooms,
		adults,
	};

	return await cloudbedsApiRequest.call(this, 'GET', '/getAvailableRoomTypes', {}, qs);
}

export async function blockRoom(this: IExecuteFunctions, index: number) {
	const roomId = this.getNodeParameter('roomId', index) as string;
	const startDate = this.getNodeParameter('startDate', index) as string;
	const endDate = this.getNodeParameter('endDate', index) as string;

	const body: IDataObject = {
		roomID: roomId,
		startDate,
		endDate,
	};

	return await cloudbedsApiRequest.call(this, 'POST', '/postRoomBlock', body);
}

export async function unblockRoom(this: IExecuteFunctions, index: number) {
	const roomId = this.getNodeParameter('roomId', index) as string;
	const startDate = this.getNodeParameter('startDate', index) as string;
	const endDate = this.getNodeParameter('endDate', index) as string;

	const body: IDataObject = {
		roomID: roomId,
		startDate,
		endDate,
	};

	return await cloudbedsApiRequest.call(this, 'DELETE', '/deleteRoomBlock', body);
}
