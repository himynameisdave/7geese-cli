import { KR_TYPE } from '../constants.js';


export const isBinaryKr = kr => kr.measurementType === KR_TYPE.BINARY;
export const isPercentageKr = kr => kr.measurementType === KR_TYPE.PERCENTAGE;
export const isNumericKr = kr => kr.measurementType === KR_TYPE.NUMERIC;
export const isMoneyKr = kr => KR_TYPE.MONEY.includes(kr.measurementType);
