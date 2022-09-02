export function initalError(isSingleInput: boolean) {
  return isSingleInput ? [false] : [false, false];
}

// Determine allowed value for input
export function isDecimal(value: string) {
  return value.match(/^-?([0-9]{1,})?(\.)?([0-9]{1,})?$/);
}

// Check if value could safely set on slider
export function isCompatible(value: string, step: number) {
  return (
    !Number.isNaN(parseFloat(value)) &&
    parseFloat(value) % step === 0 &&
    !value.endsWith('.')
  );
}

// For better UX don't show error when input is empty or contains minus or dot
export function isWhitelisted(value: string) {
  return value !== '' && value !== '-' && value !== '.';
}
