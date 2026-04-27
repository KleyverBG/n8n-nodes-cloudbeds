import type { INodeProperties } from 'n8n-workflow';

export const reservationOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['reservation'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new reservation',
				action: 'Create a reservation',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a reservation',
				action: 'Get a reservation',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many reservations',
				action: 'Get many reservations',
			},
			{
				name: 'Update Room',
				value: 'updateRoom',
				description: 'Update room assignment for a reservation',
				action: 'Update reservation room',
			},
			{
				name: 'Update Status',
				value: 'updateStatus',
				description: 'Update the status of a reservation',
				action: 'Update reservation status',
			},
		],
		default: 'get',
	},
];

export const reservationFields: INodeProperties[] = [
	// Create
	{
		displayName: 'Start Date (Check-In)',
		name: 'startDate',
		type: 'dateTime',
		required: true,
		displayOptions: {
			show: {
				resource: ['reservation'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Check-in date for the reservation',
	},
	{
		displayName: 'End Date (Check-Out)',
		name: 'endDate',
		type: 'dateTime',
		required: true,
		displayOptions: {
			show: {
				resource: ['reservation'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Check-out date for the reservation',
	},
	{
		displayName: 'Guest First Name',
		name: 'guestFirstName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['reservation'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'First name of the guest',
	},
	{
		displayName: 'Guest Last Name',
		name: 'guestLastName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['reservation'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Last name of the guest',
	},
	{
		displayName: 'Guest Email',
		name: 'guestEmail',
		type: 'string',
		placeholder: 'name@email.com',
		required: true,
		displayOptions: {
			show: {
				resource: ['reservation'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Email of the guest',
	},
	{
		displayName: 'Guest Country',
		name: 'guestCountry',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['reservation'],
				operation: ['create'],
			},
		},
		default: 'MX',
		description: 'ISO 2-character country code (e.g., MX, US, ES)',
	},
	{
		displayName: 'Guest ZIP Code',
		name: 'guestZip',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['reservation'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'ZIP/Postal code of the guest',
	},
	{
		displayName: 'Room Type ID',
		name: 'roomTypeId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['reservation'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Room type ID (use Get Room Types to find available IDs)',
	},
	{
		displayName: 'Number of Rooms',
		name: 'roomQuantity',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['reservation'],
				operation: ['create'],
			},
		},
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		description: 'Number of rooms to reserve',
	},
	{
		displayName: 'Adults',
		name: 'adults',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['reservation'],
				operation: ['create'],
			},
		},
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		description: 'Number of adults',
	},
	{
		displayName: 'Children',
		name: 'children',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['reservation'],
				operation: ['create'],
			},
		},
		typeOptions: {
			minValue: 0,
		},
		default: 0,
		description: 'Number of children',
	},
	{
		displayName: 'Payment Method',
		name: 'paymentMethod',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['reservation'],
				operation: ['create'],
			},
		},
		options: [
			{ name: 'Cash', value: 'cash' },
			{ name: 'Credit Card', value: 'credit' },
			{ name: 'E-Banking', value: 'ebanking' },
			{ name: 'PayPal', value: 'pay_pal' },
		],
		default: 'cash',
		description: 'Payment method for the reservation',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['reservation'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Estimated Arrival Time',
				name: 'estimatedArrivalTime',
				type: 'string',
				default: '',
				description: 'Estimated arrival time in 24-hour format (e.g., 14:00)',
			},
			{
				displayName: 'Guest Gender',
				name: 'guestGender',
				type: 'options',
				options: [
					{ name: 'Female', value: 'F' },
					{ name: 'Male', value: 'M' },
					{ name: 'Not Specified', value: 'N/A' },
				],
				default: 'N/A',
				description: 'Gender of the guest',
			},
			{
				displayName: 'Guest Phone',
				name: 'guestPhone',
				type: 'string',
				default: '',
				description: 'Phone number of the guest',
			},
			{
				displayName: 'Promo Code',
				name: 'promoCode',
				type: 'string',
				default: '',
				description: 'Promotional code for specials and packages',
			},
			{
				displayName: 'Send Confirmation Email',
				name: 'sendEmailConfirmation',
				type: 'boolean',
				default: true,
				description: 'Whether to send confirmation email to guest',
			},
			{
				displayName: 'Source ID',
				name: 'sourceID',
				type: 'string',
				default: '',
				description: 'Third-party source ID for this reservation',
			},
			{
				displayName: 'Third Party Identifier',
				name: 'thirdPartyIdentifier',
				type: 'string',
				default: '',
				description: 'Identifier from booking channel',
			},
		],
	},
	// Get
	{
		displayName: 'Reservation ID',
		name: 'reservationId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['reservation'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'The ID of the reservation',
	},
	// Get Many
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['reservation'],
				operation: ['getAll'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['reservation'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['reservation'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Check-in Date From',
				name: 'checkinDateFrom',
				type: 'dateTime',
				default: '',
				description: 'Filter by check-in date from',
			},
			{
				displayName: 'Check-in Date To',
				name: 'checkinDateTo',
				type: 'dateTime',
				default: '',
				description: 'Filter by check-in date to',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Canceled', value: 'canceled' },
					{ name: 'Checked In', value: 'checked_in' },
					{ name: 'Checked Out', value: 'checked_out' },
					{ name: 'Confirmed', value: 'confirmed' },
					{ name: 'No Show', value: 'no_show' },
				],
				default: 'confirmed',
				description: 'Filter by reservation status',
			},
		],
	},
	// Update Room
	{
		displayName: 'Reservation ID',
		name: 'reservationId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['reservation'],
				operation: ['updateRoom'],
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
				resource: ['reservation'],
				operation: ['updateRoom'],
			},
		},
		default: '',
		description: 'The reservation room ID to assign (from unassigned[0].reservationRoomID in the reservation data)',
	},
	{
		displayName: 'Room ID',
		name: 'roomId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['reservation'],
				operation: ['updateRoom'],
			},
		},
		default: '',
		description: 'The ID of the room to assign (leave empty to unassign)',
	},
	// Update Status
	{
		displayName: 'Reservation ID',
		name: 'reservationId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['reservation'],
				operation: ['updateStatus'],
			},
		},
		default: '',
		description: 'The ID of the reservation',
	},
	{
		displayName: 'Status',
		name: 'status',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['reservation'],
				operation: ['updateStatus'],
			},
		},
		options: [
			{ name: 'Canceled', value: 'canceled' },
			{ name: 'Checked In', value: 'checked_in' },
			{ name: 'Checked Out', value: 'checked_out' },
			{ name: 'Confirmed', value: 'confirmed' },
			{ name: 'No Show', value: 'no_show' },
			{ name: 'Not Confirmed', value: 'not_confirmed' },
		],
		default: 'confirmed',
		description: 'The new status for the reservation',
	},
];
