import type { INodeProperties } from 'n8n-workflow';

export const paymentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['payment'],
			},
		},
		options: [
			{
				name: 'Create Pay By Link',
				value: 'createPayByLink',
				description: 'Generate a payment link for a reservation',
				action: 'Create a pay by link',
			},
			{
				name: 'Get Pay By Link',
				value: 'getPayByLink',
				description: 'Retrieve an existing payment link',
				action: 'Get a pay by link',
			},
		],
		default: 'createPayByLink',
	},
];

export const paymentFields: INodeProperties[] = [
	// Create Pay By Link
	{
		displayName: 'Amount',
		name: 'amount',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['payment'],
				operation: ['createPayByLink'],
			},
		},
		typeOptions: {
			minValue: 0.01,
			numberPrecision: 2,
		},
		default: 0,
		description: 'Amount to charge (must be greater than 0)',
	},
	{
		displayName: 'Reservation ID',
		name: 'reservationId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['payment'],
				operation: ['createPayByLink'],
			},
		},
		default: '',
		description: 'The reservation ID (confirmation number) to associate the payment with',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['payment'],
				operation: ['createPayByLink'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the payment',
			},
			{
				displayName: 'Expires After (Days)',
				name: 'expiresAfter',
				type: 'number',
				typeOptions: {
					minValue: 0,
					maxValue: 30,
				},
				default: 7,
				description: 'Number of days until the link expires (0-30)',
			},
			{
				displayName: 'Auth Payment',
				name: 'authPayment',
				type: 'boolean',
				default: false,
				description: 'Whether to authorize the payment without capturing',
			},
		],
	},
	// Get Pay By Link
	{
		displayName: 'Payment Link ID',
		name: 'paymentLinkId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['payment'],
				operation: ['getPayByLink'],
			},
		},
		default: '',
		description: 'The ID of the payment link to retrieve',
	},
];
