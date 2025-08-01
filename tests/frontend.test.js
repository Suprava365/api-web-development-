// ✅ Dummy math test cases (25)
describe("Math Utilities", () => {
  test("Addition works", () => {
    expect(2 + 2).toBe(4)
  })

  test("Subtraction works", () => {
    expect(5 - 3).toBe(2)
  })

  test("Multiplication", () => {
    expect(3 * 3).toBe(9)
  })

  test("Division", () => {
    expect(10 / 2).toBe(5)
  })

  test("Modulus", () => {
    expect(10 % 3).toBe(1)
  })

  test("Power", () => {
    expect(Math.pow(2, 3)).toBe(8)
  })

  test("Square root", () => {
    expect(Math.sqrt(16)).toBe(4)
  })

  test("Negative numbers", () => {
    expect(-5 + 10).toBe(5)
  })

  test("Zero multiply", () => {
    expect(0 * 999).toBe(0)
  })

  test("Precision math", () => {
    expect(0.1 + 0.2).toBeCloseTo(0.3)
  })

  test("Integer rounding", () => {
    expect(Math.round(4.4)).toBe(4)
  })

  test("Ceiling", () => {
    expect(Math.ceil(4.1)).toBe(5)
  })

  test("Floor", () => {
    expect(Math.floor(4.9)).toBe(4)
  })

  test("Absolute", () => {
    expect(Math.abs(-99)).toBe(99)
  })

  test("Max value", () => {
    expect(Math.max(1, 3, 2)).toBe(3)
  })

  test("Min value", () => {
    expect(Math.min(1, 3, 2)).toBe(1)
  })

  test("NaN check", () => {
    expect(isNaN("hello")).toBe(true)
  })

  test("Infinity check", () => {
    expect(1 / 0).toBe(Infinity)
  })

  test("Negative Infinity", () => {
    expect(-1 / 0).toBe(-Infinity)
  })

  test("Type coercion add", () => {
    expect("5" + 1).toBe("51")
  })

  test("parseInt", () => {
    expect(parseInt("123abc")).toBe(123)
  })

  test("parseFloat", () => {
    expect(parseFloat("12.34xyz")).toBeCloseTo(12.34)
  })

  test("isFinite", () => {
    expect(isFinite(100)).toBe(true)
  })

  test("toFixed", () => {
    expect((3.14159).toFixed(2)).toBe("3.14")
  })

  test("Math random range", () => {
    const n = Math.floor(Math.random() * 10)
    expect(n).toBeGreaterThanOrEqual(0)
  })
})