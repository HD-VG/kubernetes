export function limitPrecision (value: number, precision: number, scale: number): number {
   if (value === null || value === undefined) return null;
   const multiplier = Math.pow(10, scale);
   const roundedValue = Math.round(value * multiplier) / multiplier;
   const [integerPart] = roundedValue.toString().split('.');
   if (integerPart.length > precision - scale) {
       const maxIntegerValue = Math.pow(10, precision - scale) - 1;
       return Math.trunc(maxIntegerValue * multiplier) / multiplier;
   }
   return roundedValue;
};
