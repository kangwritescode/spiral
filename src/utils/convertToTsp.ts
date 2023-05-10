import { type MeasurementUnit } from "~/shared/types";

export const units: MeasurementUnit[] = ['oz', 'cup', 'tsp', 'tbsp', 'cl', 'part', 'parts', 'tblsp', 'shot', 'shots'];

export const unitToTsp = {
    oz: 6,
    cup: 48,
    cups: 48,
    tsp: 1,
    tbsp: 3,
    tblsp: 3,
    cl: 2, 
    part: 1, 
    parts: 1,
    shot: 6,
    shots: 6,
};

// Define a function to convert a measurement to teaspoons
export function convertToTsp(measurement: string) {
    let total = 0;
    const measurementArr = measurement.split(' ');
    const unitIndex = measurementArr.indexOf(measurementArr.find(unit => units.includes(unit as MeasurementUnit)) as string);
    const unit = measurementArr[unitIndex] as MeasurementUnit;
    const multiplier = unitToTsp[unit];
    for (let i = 0; i < unitIndex; i++) {
        total += Number(eval(measurementArr[i] as string)) * multiplier;
    }
    return total;
}