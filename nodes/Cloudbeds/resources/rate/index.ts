import type { IExecuteFunctions } from 'n8n-workflow';
import * as operations from './operations';
import { rateOperations, rateFields } from './descriptions';

export { rateOperations, rateFields };

export const descriptions = [...rateOperations, ...rateFields];

export async function execute(this: IExecuteFunctions, operation: string, index: number) {
	switch (operation) {
		case 'getAll':
			return await operations.getAll.call(this, index);
		case 'getRatePlans':
			return await operations.getRatePlans.call(this, index);
		case 'update':
			return await operations.update.call(this, index);
		default:
			throw new Error(`Unknown operation: ${operation}`);
	}
}
