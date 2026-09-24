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
				name: 'Get Rate Plans',
				value: 'getRatePlans',
				description: 'Get available rate plans with their rate IDs and room type IDs',
				action: 'Get rate plans',
			},
			{
				name: 'Update Rate',
				value: 'update',
				description: 'Update the rate of a room type for a date range',
				action: 'Update a rate',
			},
		],
		default: 'getRatePlans',
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
				operation: ['getAll', 'update', 'getRatePlans'],
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
				operation: ['getAll', 'update', 'getRatePlans'],
			},
		},
		default: '',
		description: 'End date for the rate query or update (YYYY-MM-DD)',
	},
	// ----------------------------------------
	// getRatePlans
	// ----------------------------------------
	{
		displayName: 'Room Type ID',
		name: 'roomTypeId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['rate'],
				operation: ['getAll', 'getRatePlans'],
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
		displayName: 'Rate Plan ID',
		name: 'rateId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['rate'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'The ID of the rate plan to update. Obtain it from the Get Rate Plans operation.',
	},
	{
		displayName: 'Sunday Price',
		name: 'sunPrice',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['rate'],
				operation: ['update'],
			},
		},
		default: 0,
		description: 'Price to apply on Sundays within the date range',
	},
	{
		displayName: 'Monday Price',
		name: 'monPrice',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['rate'],
				operation: ['update'],
			},
		},
		default: 0,
		description: 'Price to apply on Mondays within the date range',
	},
	{
		displayName: 'Tuesday Price',
		name: 'tuePrice',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['rate'],
				operation: ['update'],
			},
		},
		default: 0,
		description: 'Price to apply on Tuesdays within the date range',
	},
	{
		displayName: 'Wednesday Price',
		name: 'wedPrice',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['rate'],
				operation: ['update'],
			},
		},
		default: 0,
		description: 'Price to apply on Wednesdays within the date range',
	},
	{
		displayName: 'Thursday Price',
		name: 'thuPrice',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['rate'],
				operation: ['update'],
			},
		},
		default: 0,
		description: 'Price to apply on Thursdays within the date range',
	},
	{
		displayName: 'Friday Price',
		name: 'friPrice',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['rate'],
				operation: ['update'],
			},
		},
		default: 0,
		description: 'Price to apply on Fridays within the date range',
	},
	{
		displayName: 'Saturday Price',
		name: 'satPrice',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['rate'],
				operation: ['update'],
			},
		},
		default: 0,
		description: 'Price to apply on Saturdays within the date range',
	},
];
