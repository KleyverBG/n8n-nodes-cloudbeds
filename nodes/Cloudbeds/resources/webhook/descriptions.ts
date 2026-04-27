import type { INodeProperties } from 'n8n-workflow';

export const webhookOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['webhook'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a webhook subscription',
				action: 'Create a webhook',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a webhook subscription',
				action: 'Delete a webhook',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many webhook subscriptions',
				action: 'Get many webhooks',
			},
		],
		default: 'create',
	},
];

export const webhookFields: INodeProperties[] = [
	// ----------------------------------
	//         webhook: create
	// ----------------------------------
	{
		displayName: 'Events',
		name: 'webhookEvent',
		type: 'multiOptions',
		required: true,
		default: ['reservation/created'],
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['create'],
			},
		},
		options: [
			{
				name: 'Accounting - Transaction',
				value: 'accounting/transaction',
				description: 'When any transaction occurs (payments, charges, etc.)',
			},
			{
				name: 'Allotment Block - Capacity Changed',
				value: 'allotmentBlock/capacity_changed_for_reservation',
				description: 'When allotment capacity changes due to a reservation',
			},
			{
				name: 'Allotment Block - Created',
				value: 'allotmentBlock/created',
				description: 'When an allotment block is created',
			},
			{
				name: 'Allotment Block - Deleted',
				value: 'allotmentBlock/deleted',
				description: 'When an allotment block is deleted',
			},
			{
				name: 'Allotment Block - Updated',
				value: 'allotmentBlock/updated',
				description: 'When an allotment block is modified',
			},
			{
				name: 'Door Lock - Key Cancelled',
				value: 'doorLockKey/key_cancelled',
				description: 'When a key is cancelled',
			},
			{
				name: 'Door Lock - Key Requested',
				value: 'doorLockKey/key_requested',
				description: 'When a key creation has been requested',
			},
			{
				name: 'Fiscal Document - Created',
				value: 'fiscal_document/create',
				description: 'When a fiscal document is created',
			},
			{
				name: 'Fiscal Document - Updated',
				value: 'fiscal_document/update',
				description: 'When a fiscal document is updated',
			},
			{
				name: 'Guest - Accommodation Changed',
				value: 'guest/accommodation_changed',
				description: 'When a room is changed on the Guest tab',
			},
			{
				name: 'Guest - Assigned',
				value: 'guest/assigned',
				description: 'When a guest is added to a reservation',
			},
			{
				name: 'Guest - Created',
				value: 'guest/created',
				description: 'When a new guest is created',
			},
			{
				name: 'Guest - Details Changed',
				value: 'guest/details_changed',
				description: 'When guest information is edited',
			},
			{
				name: 'Guest - Removed',
				value: 'guest/removed',
				description: 'When a guest is removed from a reservation',
			},
			{
				name: 'Housekeeping - Reservation Status Changed',
				value: 'housekeeping/housekeeping_reservation_status_changed',
				description: 'When reservation status changes by room',
			},
			{
				name: 'Housekeeping - Room Condition Changed',
				value: 'housekeeping/room_condition_changed',
				description: 'When room condition changes (dirty/clean/inspected)',
			},
			{
				name: 'Housekeeping - Room Occupancy Changed',
				value: 'housekeeping/housekeeping_room_occupancy_status_changed',
				description: 'When room occupancy changes (occupied/vacant)',
			},
			{
				name: 'Integration - App Settings Changed',
				value: 'integration/appsettings_changed',
				description: 'When app settings are modified',
			},
			{
				name: 'Integration - App State Changed',
				value: 'integration/appstate_changed',
				description: 'When app state changes (enabled/disabled)',
			},
			{
				name: 'Night Audit - Completed',
				value: 'night_audit/completed',
				description: 'When the night audit has been completed',
			},
			{
				name: 'Rate Job - Status Changed',
				value: 'api_queue_task/rate_status_changed',
				description: 'When a rate batch job status changes',
			},
			{
				name: 'Reservation - Accommodation Changed',
				value: 'reservation/accommodation_changed',
				description: 'When a room reassignment happens',
			},
			{
				name: 'Reservation - Accommodation Status Changed',
				value: 'reservation/accommodation_status_changed',
				description: 'When room occupancy status changes (occupied/unoccupied)',
			},
			{
				name: 'Reservation - Accommodation Type Changed',
				value: 'reservation/accommodation_type_changed',
				description: 'When the accommodation type is changed',
			},
			{
				name: 'Reservation - Created',
				value: 'reservation/created',
				description: 'When a new reservation is created',
			},
			{
				name: 'Reservation - Custom Fields Changed',
				value: 'reservation/custom_fields_changed',
				description: 'When reservation custom fields are created, modified or deleted',
			},
			{
				name: 'Reservation - Dates Changed',
				value: 'reservation/dates_changed',
				description: 'When stay dates are modified',
			},
			{
				name: 'Reservation - Deleted',
				value: 'reservation/deleted',
				description: 'When a reservation is deleted',
			},
			{
				name: 'Reservation - Notes Changed',
				value: 'reservation/notes_changed',
				description: 'When a reservation note is created or modified',
			},
			{
				name: 'Reservation - Status Changed',
				value: 'reservation/status_changed',
				description: 'When reservation status changes (confirmed, canceled, checked_in, etc.)',
			},
			{
				name: 'Room Block - Created',
				value: 'roomblock/created',
				description: 'When a room block is created',
			},
			{
				name: 'Room Block - Details Changed',
				value: 'roomblock/details_changed',
				description: 'When a room block is updated',
			},
			{
				name: 'Room Block - Removed',
				value: 'roomblock/removed',
				description: 'When a room block is deleted',
			},
		],
		description: 'The events to subscribe to. Cloudbeds will send a POST to your URL when these events occur. One webhook subscription is created per event.',
	},
	{
		displayName: 'Endpoint URL',
		name: 'endpointUrl',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'https://n8n.example.com/webhook/my-webhook',
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['create'],
			},
		},
		description: 'The URL that will receive the webhook POST when the event occurs',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Property ID',
				name: 'propertyId',
				type: 'string',
				default: '',
				description: 'Optional target property ID for accounts with multiple properties',
			},
		],
	},

	// ----------------------------------
	//         webhook: delete
	// ----------------------------------
	{
		displayName: 'Subscription ID',
		name: 'subscriptionId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['delete'],
			},
		},
		description: 'The ID of the webhook subscription to delete (from Get Many)',
	},
];
