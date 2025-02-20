import { describe, test, expect } from "vitest";
import { Fizzbuzz, PlusGrand } from "./(lib)/fonctions";

describe("PlusGrand", () => {
  test("Doit retourner le premier argument s'il est plus grand ", () => {
    const resultat = PlusGrand(2, 1);

    expect(resultat).toBe(2);
  });
});

describe("FizzBuzz" , () => {
    test("Doit retourner FizzBuzz ou fizz ou Buzz" , () => {
        const resultat = Fizzbuzz(5)
        expect(resultat).toBe("Buzz")
    })
})
