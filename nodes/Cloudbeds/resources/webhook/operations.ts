import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { cloudbedsApiRequest } from '../../shared/transport';

export async function create(this: IExecuteFunctions, index: number) {
	const webhookEventsRaw = this.getNodeParameter('webhookEvent', index) as string[] | string;
	const endpointUrl = this.getNodeParameter('endpointUrl', index) as string;
	const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;

	const webhookEvents = Array.isArray(webhookEventsRaw) ? webhookEventsRaw : [webhookEventsRaw];
	const propertyId = additionalFields.propertyId as string | undefined;

	const results: IDataObject[] = [];

	for (const event of webhookEvents) {
		const [object, action] = event.split('/');

		const body: IDataObject = {
			endpointUrl,
			object,
			action,
		};

		const qs: IDataObject = {};
		if (propertyId) {
			qs.propertyID = propertyId;
		}

		const response = await cloudbedsApiRequest.call(this, 'POST', '/postWebhook', body, qs);
		results.push({ event, ...response } as IDataObject);
	}

	return results;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getAll(this: IExecuteFunctions, _index: number) {
	const response = await cloudbedsApiRequest.call(this, 'GET', '/getWebhooks');
	return response.data || response;
}

export async function deleteWebhook(this: IExecuteFunctions, index: number) {
	const subscriptionId = this.getNodeParameter('subscriptionId', index) as string;

	const qs: IDataObject = {
		subscriptionID: subscriptionId,
	};

	return await cloudbedsApiRequest.call(this, 'DELETE', '/deleteWebhook', {}, qs);
}
