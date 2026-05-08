import type { INodeProperties } from 'n8n-workflow';

export const rateOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['rate'],
			},
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get room rates for a date range',
				action: 'Get many rates',
			},
			{
				name: 'Update Rate',
				value: 'update',
				description: 'Update the rate of a room type for a date range',
				action: 'Update a rate',
			},
			{
				name: 'Update Reservation Rate',
				value: 'updateReservationRate',
				description: 'Update the rate of a room within an existing reservation',
				action: 'Update a reservation rate',
			},
		],
		default: 'getAll',
	},
];

export const rateFields: INodeProperties[] = [
	// ----------------------------------------
	// getAll
	// ----------------------------------------
	{
		displayName: 'Start Date',
		name: 'startDate',
		type: 'dateTime',
		required: true,
		displayOptions: {
			show: {
				resource: ['rate'],
				operation: ['getAll', 'update', 'updateReservationRate'],
			},
		},
		default: '',
		description: 'Start date for the rate query or update (YYYY-MM-DD)',
	},
	{
		displayName: 'End Date',
		name: 'endDate',
		type: 'dateTime',
		required: true,
		displayOptions: {
			show: {
				resource: ['rate'],
				operation: ['getAll', 'update', 'updateReservationRate'],
			},
		},
		default: '',
		description: 'End date for the rate query or update (YYYY-MM-DD)',
	},
	{
		displayName: 'Room Type ID',
		name: 'roomTypeId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['rate'],
				operation: ['getAll'],
			},
		},
		default: '',
		placeholder: 'e.g. 671015',
		description: 'Filter results by room type ID. Leave empty to get all room types.',
	},
	// ----------------------------------------
	// update
	// ----------------------------------------
	{
		displayName: 'Room Type ID',
		name: 'roomTypeId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['rate'],
				operation: ['update'],
			},
		},
		default: '',
		placeholder: 'e.g. 671015',
		description: 'The ID of the room type whose rate will be updated',
	},
	{
		displayName: 'Price',
		name: 'price',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['rate'],
				operation: ['update', 'updateReservationRate'],
			},
		},
		default: 0,
		description: 'The new price to set',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: ['rate'],
				operation: ['update'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Apply To All Rate Plans',
				name: 'applyToAllRatePlans',
				type: 'boolean',
				default: false,
				description: 'Whether to apply the price change to all rate plans of the room type',
			},
			{
				displayName: 'Rate Plan ID',
				name: 'ratePlanID',
				type: 'string',
				default: '',
				description: 'The ID of the specific rate plan to update. Leave empty to update the default rate.',
			},
		],
	},
	// ----------------------------------------
	// updateReservationRate
	// ----------------------------------------
	{
		displayName: 'Reservation ID',
		name: 'reservationId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['rate'],
				operation: ['updateReservationRate'],
			},
		},
		default: '',
		description: 'The ID of the reservation',
	},
	{
		displayName: 'Reservation Room ID',
		name: 'reservationRoomId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['rate'],
				operation: ['updateReservationRate'],
			},
		},
		default: '',
		placeholder: 'e.g. 671015-0',
		description: 'The ID of the room within the reservation',
	},
];
