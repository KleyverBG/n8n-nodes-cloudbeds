import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { cloudbedsApiRequest } from '../../shared/transport';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getAll(this: IExecuteFunctions, _index: number) {
	const response = await cloudbedsApiRequest.call(this, 'GET', '/addons/v1/addons');

	// Convert price from centavos to normal format (80000 -> 800)
	if (Array.isArray(response.data)) {
		for (const addon of response.data) {
			if (addon.price && addon.price.amount) {
				addon.price.amount = Number(addon.price.amount) / 100;
			}
		}
	}

	return response;
}

export async function addToReservation(this: IExecuteFunctions, index: number) {
	const reservationId = this.getNodeParameter('reservationId', index) as string;
	const addonId = this.getNodeParameter('addonId', index) as string;
	const quantity = this.getNodeParameter('quantity', index) as number;

	const body: IDataObject = {
		reservationID: reservationId,
		itemID: addonId,
		itemQuantity: quantity,
	};

	return await cloudbedsApiRequest.call(this, 'POST', '/postItem', body);
}
