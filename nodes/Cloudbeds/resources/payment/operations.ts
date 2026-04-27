import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { cloudbedsApiRequest } from '../../shared/transport';

export async function createPayByLink(this: IExecuteFunctions, index: number) {
	const amount = this.getNodeParameter('amount', index) as number;
	const reservationId = this.getNodeParameter('reservationId', index) as string;
	const additionalFields = this.getNodeParameter('additionalFields', index) as IDataObject;

	// Get propertyId from credentials
	const authentication = this.getNodeParameter('authentication', 0) as string;
	const credentialType = authentication === 'oAuth2' ? 'cloudbedsOAuth2Api' : 'cloudbedsApi';
	const credentials = await this.getCredentials(credentialType);
	const propertyId = credentials.propertyId as string;

	const body: IDataObject = {
		paid: amount,
		propertyId: propertyId,
		inventoryObject: {
			type: 'confirmation_number',
			id: reservationId,
		},
	};

	if (additionalFields.description) {
		body.description = additionalFields.description;
	}

	if (additionalFields.expiresAfter !== undefined) {
		body.expires_after = additionalFields.expiresAfter;
	}

	if (additionalFields.authPayment !== undefined) {
		body.auth_payment = additionalFields.authPayment;
	}

	return await cloudbedsApiRequest.call(this, 'POST', '/payments/v2/pay-by-link', body);
}

export async function getPayByLink(this: IExecuteFunctions, index: number) {
	const paymentLinkId = this.getNodeParameter('paymentLinkId', index) as string;

	return await cloudbedsApiRequest.call(this, 'GET', `/payments/v2/pay-by-link/${paymentLinkId}`);
}
