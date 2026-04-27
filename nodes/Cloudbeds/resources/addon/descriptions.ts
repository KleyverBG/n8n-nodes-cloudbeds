import type { INodeProperties } from 'n8n-workflow';

export const addonOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['addon'],
			},
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Retrieve property add-ons',
				action: 'Get many addons',
			},
			{
				name: 'Add to Reservation',
				value: 'addToReservation',
				description: 'Add an addon to a reservation',
				action: 'Add addon to reservation',
			},
		],
		default: 'getAll',
	},
];

export const addonFields: INodeProperties[] = [
	// Add to Reservation
	{
		displayName: 'Reservation ID',
		name: 'reservationId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['addon'],
				operation: ['addToReservation'],
			},
		},
		default: '',
		description: 'The reservation ID to add the addon to',
	},
	{
		displayName: 'Addon ID',
		name: 'addonId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['addon'],
				operation: ['addToReservation'],
			},
		},
		default: '',
		description: 'The addon product ID (productId from Get Many addons)',
	},
	{
		displayName: 'Quantity',
		name: 'quantity',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['addon'],
				operation: ['addToReservation'],
			},
		},
		default: 1,
		description: 'Quantity of addons to add',
	},
];
