export function PlusGrand(a: number, b: number) {
  return a > b ? a : b;
}

export function Fizzbuzz(nombre: number) {
  if (nombre % 3 === 0 && nombre % 5 === 0) return "FizzBuzz";
  else if (nombre % 3 === 0) return "Fizz";
  else if (nombre % 5 === 0) return "Buzz";
  return "Guez"
}
