import type { IExecuteFunctions } from 'n8n-workflow';
import * as operations from './operations';
import { reservationOperations, reservationFields } from './descriptions';

export { reservationOperations, reservationFields };

export const descriptions = [...reservationOperations, ...reservationFields];

export async function execute(this: IExecuteFunctions, operation: string, index: number) {
	switch (operation) {
		case 'create':
			return await operations.create.call(this, index);
		case 'get':
			return await operations.get.call(this, index);
		case 'getAll':
			return await operations.getAll.call(this, index);
		case 'updateRoom':
			return await operations.updateRoom.call(this, index);
		case 'updateStatus':
			return await operations.updateStatus.call(this, index);
		default:
			throw new Error(`Unknown operation: ${operation}`);
	}
}
