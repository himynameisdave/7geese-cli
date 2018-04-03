import { SG_BASE_URL } from '../constants.js';

//  For making 7Geese request URLs
export const getSGUrl = endpoint => `${SG_BASE_URL}${endpoint}`;
//  Simplify jsonifying fetch responses
export const jsonifyResponse = res => res.json();
