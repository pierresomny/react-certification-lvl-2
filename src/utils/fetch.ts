import { ApiResponse } from 'src/utils/types.ts';

/**
 * Make an Api call on a specific path
 * @param {string} path
 * @param {number} page
 * @param {string} params
 * @returns {Promise<any>}
 */
export const fetchData = async (
	path: string,
	page: number   = 1,
	params: string = '',
) => {
	return await fetch(`${ import.meta.env.VITE_API_Url }${ path }?page=${ page }${ params }`, {
		headers: {
			'X-RapidAPI-Key': import.meta.env.VITE_X_Rapid_API_Key,
			'X-RapidAPI-Host': import.meta.env.VITE_X_Rapid_API_Host,
		},
	})
		.then((response: Response) => response.json());
};

/**
 * Retrieve all pages from a specific path request
 * @param {string} path
 * @param {number} page
 * @param {[string, (string | number)][]} params
 * @returns {Promise<T[]>}
 */
export const fetchAllPages = async <T>(
	path: string,
	page: number                          = 1,
	params: [ string, string | number ][] = [],
): Promise<T[]> => {
	return await fetchData(path, page, constructParams(params))
		.then(async (response: ApiResponse<T>): Promise<T[]> => {
			if (response.meta.next_page) {
				return [
					...response.data,
					...await fetchAllPages<T>(path, response.meta.next_page, params),
				];
			} else {
				return response.data;
			}
		});
};

/**
 * Construct params for http request
 * @param {[string, (string | number)][]} params
 * @returns {string}
 */
const constructParams = (params: [ string, string | number ][]): string => {
	return params.reduce(
		(query: string, [ key, value ]: [ string, string | number ]): string => `${ query }&${ key }=${ value }`,
		'',
	);
};