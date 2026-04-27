import type { IExecuteFunctions } from 'n8n-workflow';
import * as operations from './operations';
import { webhookOperations, webhookFields } from './descriptions';

export { webhookOperations, webhookFields };

export const descriptions = [...webhookOperations, ...webhookFields];

export async function execute(this: IExecuteFunctions, operation: string, index: number) {
	switch (operation) {
		case 'create':
			return await operations.create.call(this, index);
		case 'getAll':
			return await operations.getAll.call(this, index);
		case 'delete':
			return await operations.deleteWebhook.call(this, index);
		default:
			throw new Error(`Unknown operation: ${operation}`);
	}
}
