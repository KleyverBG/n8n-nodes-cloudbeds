import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import * as reservation from './resources/reservation';
import * as property from './resources/property';
import * as room from './resources/room';
import * as event from './resources/event';
import * as addon from './resources/addon';
import * as housekeeping from './resources/housekeeping';
import * as item from './resources/item';
import * as marketSegmentation from './resources/marketSegmentation';
import * as doorLock from './resources/doorLock';
import * as integrationEvent from './resources/integrationEvent';
import * as guest from './resources/guest';
import * as payment from './resources/payment';
import * as webhook from './resources/webhook';

export class Cloudbeds implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Cloudbeds',
		name: 'cloudbeds',
		icon: 'file:cloudbeds.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume Cloudbeds API - Sistema de gestión hotelera completo',
		defaults: {
			name: 'Cloudbeds',
		},
		inputs: ['main'],
		outputs: ['main'],
		usableAsTool: true,
		credentials: [
			{
				name: 'cloudbedsApi',
				required: true,
				displayOptions: {
					show: {
						authentication: ['accessToken'],
					},
				},
			},
			{
				name: 'cloudbedsOAuth2Api',
				required: true,
				displayOptions: {
					show: {
						authentication: ['oAuth2'],
					},
				},
			},
		],
		properties: [
			{
				displayName: 'Authentication',
				name: 'authentication',
				type: 'options',
				options: [
					{
						name: 'Access Token',
						value: 'accessToken',
					},
					{
						name: 'OAuth2',
						value: 'oAuth2',
					},
				],
				default: 'accessToken',
			},
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Addon',
						value: 'addon',
						description: 'Gestionar complementos y servicios adicionales',
					},
					{
						name: 'Door Lock',
						value: 'doorLock',
						description: 'Gestionar cerraduras electrónicas',
					},
					{
						name: 'Event',
						value: 'event',
						description: 'Gestionar eventos del hotel',
					},
					{
						name: 'Guest',
						value: 'guest',
						description: 'Gestionar huéspedes',
					},
					{
						name: 'Housekeeping',
						value: 'housekeeping',
						description: 'Gestionar limpieza e inspecciones',
					},
					{
						name: 'Integration Event',
						value: 'integrationEvent',
						description: 'Gestionar eventos de integración',
					},
					{
						name: 'Item',
						value: 'item',
						description: 'Gestionar items y cargos (contabilidad)',
					},
					{
						name: 'Market Segmentation',
						value: 'marketSegmentation',
						description: 'Gestionar segmentos de mercado',
					},
					{
						name: 'Payment',
						value: 'payment',
						description: 'Gestionar pagos y links de pago (Pay By Link)',
					},
					{
						name: 'Property',
						value: 'property',
						description: 'Gestionar propiedades',
					},
					{
						name: 'Reservation',
						value: 'reservation',
						description: 'Gestionar reservas y check-in/out',
					},
					{
						name: 'Room',
						value: 'room',
						description: 'Gestionar habitaciones',
					},
					{
						name: 'Webhook',
						value: 'webhook',
						description: 'Gestionar suscripciones a webhooks (notificaciones de eventos)',
					},
				],
				default: 'reservation',
			},
			...addon.descriptions,
			...doorLock.descriptions,
			...event.descriptions,
			...guest.descriptions,
			...housekeeping.descriptions,
			...integrationEvent.descriptions,
			...item.descriptions,
			...marketSegmentation.descriptions,
			...payment.descriptions,
			...property.descriptions,
			...reservation.descriptions,
			...room.descriptions,
			...webhook.descriptions,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const resource = this.getNodeParameter('resource', 0) as string;
		let operation: string;

		try {
			operation = this.getNodeParameter('operation', 0) as string;
		} catch (error) {
			if (resource === 'webhook') {
				operation = 'create';
			} else {
				throw error;
			}
		}

		let responseData;
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				if (resource === 'reservation') {
					responseData = await reservation.execute.call(this, operation, i);
				} else if (resource === 'property') {
					responseData = await property.execute.call(this, operation, i);
				} else if (resource === 'room') {
					responseData = await room.execute.call(this, operation, i);
				} else if (resource === 'event') {
					responseData = await event.execute.call(this, operation, i);
				} else if (resource === 'addon') {
					responseData = await addon.execute.call(this, operation, i);
				} else if (resource === 'housekeeping') {
					responseData = await housekeeping.execute.call(this, operation, i);
				} else if (resource === 'item') {
					responseData = await item.execute.call(this, operation, i);
				} else if (resource === 'marketSegmentation') {
					responseData = await marketSegmentation.execute.call(this, operation, i);
				} else if (resource === 'payment') {
					responseData = await payment.execute.call(this, operation, i);
				} else if (resource === 'doorLock') {
					responseData = await doorLock.execute.call(this, operation, i);
				} else if (resource === 'integrationEvent') {
					responseData = await integrationEvent.execute.call(this, operation, i);
				} else if (resource === 'guest') {
					responseData = await guest.execute.call(this, operation, i);
				} else if (resource === 'webhook') {
					responseData = await webhook.execute.call(this, operation, i);
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData as INodeExecutionData),
					{ itemData: { item: i } },
				);

				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: error.message } });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
