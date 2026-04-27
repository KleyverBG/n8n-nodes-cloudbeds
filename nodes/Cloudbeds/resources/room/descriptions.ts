import type { INodeProperties } from 'n8n-workflow';

export const roomOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['room'],
			},
		},
		options: [
			{
				name: 'Block Room',
				value: 'blockRoom',
				description: 'Block a room for a date range',
				action: 'Block a room',
			},
			{
				name: 'Get Available',
				value: 'getAvailable',
				description: 'Get available room types for a date range',
				action: 'Get available rooms',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many rooms in the property',
				action: 'Get many rooms',
			},
			{
				name: 'Get Room Types',
				value: 'getRoomTypes',
				description: 'Get all room types',
				action: 'Get room types',
			},
			{
				name: 'Get Unassigned',
				value: 'getUnassigned',
				description: 'Get all rooms that currently have no reservation assigned',
				action: 'Get unassigned rooms',
			},
			{
				name: 'Unblock Room',
				value: 'unblockRoom',
				description: 'Unblock a room',
				action: 'Unblock a room',
			},
		],
		default: 'getAll',
	},
];

export const roomFields: INodeProperties[] = [
	// Get Available, Block/Unblock
	{
		displayName: 'Start Date',
		name: 'startDate',
		type: 'dateTime',
		required: true,
		displayOptions: {
			show: {
				resource: ['room'],
				operation: ['getAvailable', 'blockRoom', 'unblockRoom'],
			},
		},
		default: '',
		description: 'Start date for the search',
	},
	{
		displayName: 'End Date',
		name: 'endDate',
		type: 'dateTime',
		required: true,
		displayOptions: {
			show: {
				resource: ['room'],
				operation: ['getAvailable', 'blockRoom', 'unblockRoom'],
			},
		},
		default: '',
		description: 'End date for the search',
	},
	// Get Available specific fields
	{
		displayName: 'Number of Rooms',
		name: 'rooms',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['room'],
				operation: ['getAvailable'],
			},
		},
		default: 1,
		description: 'Number of rooms needed',
	},
	{
		displayName: 'Number of Adults',
		name: 'adults',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['room'],
				operation: ['getAvailable'],
			},
		},
		default: 1,
	},
	// Block/Unblock Room
	{
		displayName: 'Room ID',
		name: 'roomId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['room'],
				operation: ['blockRoom', 'unblockRoom'],
			},
		},
		default: '',
	},
];
