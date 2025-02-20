import { describe, test, expect } from "vitest";
import { CalculerMoyenne, Fizzbuzz, PlusGrand } from "./(lib)/fonctions";

describe("PlusGrand", () => {
  test("Doit retourner le premier argument s'il est plus grand ", () => {
    const resultat = PlusGrand(2, 1);
    expect(resultat).toBe(2);
  });
});

describe("FizzBuzz", () => {
  test("Doit retourner FizzBuzz", () => {
    const resultat = Fizzbuzz(15);
    expect(resultat).toBe("FizzBuzz");
  });

  test("Doit retourner Buzz ", () => {
    expect(Fizzbuzz(5)).toBe("Buzz");
  });

  test("Doit retourner Fizz ", () => {
    expect(Fizzbuzz(9)).toBe("Fizz");
  });

  test("Doit retourner Guez ", () => {
    expect(Fizzbuzz(7)).toBe("Guez");
  });
});

describe("CalculerMoyenne", () => {
  test("Doit retourner moyenne", () => {
    expect(CalculerMoyenne([])).toBe(NaN);
  });

  test("Doit retourner la moyenne du tableau avec une valeur" , () => {
    expect(CalculerMoyenne([5,15])).toBe(10)
  })
});
