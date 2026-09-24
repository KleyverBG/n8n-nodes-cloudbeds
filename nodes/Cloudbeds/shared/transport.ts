import type { IExecuteFunctions, IHttpRequestMethods, IDataObject, IHttpRequestOptions } from 'n8n-workflow';

export async function cloudbedsApiRequest(
	this: IExecuteFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
	option: IDataObject = {},
): Promise<IDataObject> {
	const authentication = this.getNodeParameter('authentication', 0) as string;
	const credentialType = authentication === 'oAuth2' ? 'cloudbedsOAuth2Api' : 'cloudbedsApi';

	// Determine base URL based on endpoint
	let baseUrl = 'https://api.cloudbeds.com/api/v1.3';
	const needsPropertyHeader = endpoint.startsWith('/addons/') || endpoint.startsWith('/integration/') || endpoint.startsWith('/events/') || endpoint.startsWith('/payments/');
	if (needsPropertyHeader) {
		baseUrl = 'https://api.cloudbeds.com';
	}

	const headers: IDataObject = {};

	// Endpoints that require form-urlencoded (per Cloudbeds API docs)
	const formEncodedEndpoints = ['/postReservation', '/putReservation', '/postPayment', '/postItem', '/postWebhook', '/postRoomAssign', '/putRate'];
	const useFormEncoded = formEncodedEndpoints.some(ep => endpoint === ep);

	// Set Content-Type for non-GET methods
	if (method !== 'GET') {
		headers['Content-Type'] = useFormEncoded 
			? 'application/x-www-form-urlencoded' 
			: 'application/json';
	}

	// Add X-Property-ID header for endpoints that require it
	if (needsPropertyHeader) {
		const credentials = await this.getCredentials(credentialType);
		if (credentials.propertyId) {
			headers['X-Property-ID'] = credentials.propertyId as string;
		}
	}

	const options: IHttpRequestOptions = {
		method,
		body,
		qs,
		url: `${baseUrl}${endpoint}`,
		headers,
		json: !useFormEncoded,
	};

	if (Object.keys(body).length === 0) {
		delete options.body;
	}

	if (Object.keys(qs).length === 0) {
		delete options.qs;
	}

	Object.assign(options, option);

	return await this.helpers.httpRequestWithAuthentication.call(this, credentialType, options);
}

export async function cloudbedsApiRequestAllItems(
	this: IExecuteFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
): Promise<IDataObject[]> {
	const returnData: IDataObject[] = [];

	let responseData;
	qs.limit = 100;
	qs.offset = 0;

	do {
		responseData = await cloudbedsApiRequest.call(this, method, endpoint, body, qs);
		
		if (responseData.data) {
			returnData.push(...(responseData.data as IDataObject[]));
		}

		qs.offset = (qs.offset as number) + (qs.limit as number);
	} while (responseData.data && (responseData.data as IDataObject[]).length >= (qs.limit as number));

	return returnData;
}
