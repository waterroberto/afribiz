import moment from 'moment';

export function formatDate(value: any) {
  const seconds = new Date(value).getTime();

  return moment(seconds).format('MMMM Do YYYY, h:mm a');
}

export function formatCurrency(amount: number) {
  const formatter = new Intl.NumberFormat(`en-US`, {
    style: 'currency',
    currency: 'USD',
  });

  const formattedAmount = formatter.format(amount);

  return formattedAmount;
}

export function generateCreditCardNumber() {
  const iin = '4'; // Start with '4' for Visa; you can change it based on the card issuer

  const accountNumber = generateRandomNumber(10 ** 11, 10 ** 12 - 1).toString();

  const luhnDigit = calculateLuhnDigit(iin + accountNumber);

  const creditCardNumber = iin + accountNumber + luhnDigit;

  return creditCardNumber;
}

export function generateRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function calculateLuhnDigit(partialCardNumber: string) {
  const digits = partialCardNumber.split('').map(Number);

  for (let i = digits.length - 2; i >= 0; i -= 2) {
    digits[i] *= 2;
    if (digits[i] > 9) {
      digits[i] -= 9;
    }
  }

  const sum = digits.reduce((acc, digit) => acc + digit, 0);
  const luhnDigit = (Math.ceil(sum / 10) * 10 - sum) % 10;

  return luhnDigit.toString();
}
