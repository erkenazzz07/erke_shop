export const CHECKOUT_FIELDS = ["email", "name", "address", "city", "postcode", "country", "cardNumber", "cardExpiry", "cardCvc"] as const;
export type CheckoutField = (typeof CHECKOUT_FIELDS)[number];
export type CheckoutValues = Record<CheckoutField, string>;
export type CheckoutErrors = Partial<Record<CheckoutField, string>>;

export const COUNTRIES = ["United States", "Canada", "United Kingdom", "Germany", "France", "Kazakhstan", "Australia", "Japan"] as const;

const digitsOnly = (value: string) => value.replace(/\D/g, "");

function passesLuhn(digits: string): boolean {
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    let digit = Number(digits[digits.length - 1 - i]);
    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }
  return sum % 10 === 0;
}

function isFutureExpiry(value: string, now: Date): boolean {
  const match = value.match(/^(\d{2})\s*\/\s*(\d{2})$/);
  if (!match) return false;
  const month = Number(match[1]);
  const year = 2000 + Number(match[2]);
  if (month < 1 || month > 12) return false;
  return year > now.getFullYear() || (year === now.getFullYear() && month >= now.getMonth() + 1);
}

export function validateCheckout(values: CheckoutValues, now = new Date()): CheckoutErrors {
  const errors: CheckoutErrors = {};
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Enter a valid email, like you@example.com.";
  if (values.name.trim().length < 2) errors.name = "Enter the full name for delivery.";
  if (values.address.trim().length < 5) errors.address = "Enter a street address.";
  if (values.city.trim().length < 2) errors.city = "Enter a city.";
  if (values.postcode.trim().length < 3) errors.postcode = "Enter a postal code.";
  if (!(COUNTRIES as readonly string[]).includes(values.country)) errors.country = "Choose a country.";
  const card = digitsOnly(values.cardNumber);
  if (card.length < 13 || card.length > 19 || !passesLuhn(card)) errors.cardNumber = "Check the card number.";
  if (!isFutureExpiry(values.cardExpiry, now)) errors.cardExpiry = "Use MM/YY, and a date that hasn't passed.";
  if (!/^\d{3,4}$/.test(values.cardCvc.trim())) errors.cardCvc = "Enter the 3 or 4 digits on the back.";
  return errors;
}

export function formatCardNumber(value: string): string {
  return digitsOnly(value).slice(0, 19).replace(/(\d{4})(?=\d)/g, "$1 ");
}

export function formatExpiry(value: string): string {
  const digits = digitsOnly(value).slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
}
