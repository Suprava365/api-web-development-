// ✅ Dummy string test cases (25)
describe("String Utilities", () => {
  test("Concatenation", () => {
    expect("Hello" + " " + "World").toBe("Hello World")
  })

  test("Length", () => {
    expect("Nepal".length).toBe(5)
  })

  test("CharAt", () => {
    expect("abc".charAt(0)).toBe("a")
  })

  test("Substring", () => {
    expect("hello".substring(1, 3)).toBe("el")
  })

  test("Includes", () => {
    expect("Hello World".includes("World")).toBe(true)
  })

  test("StartsWith", () => {
    expect("Nepal".startsWith("Ne")).toBe(true)
  })

  test("EndsWith", () => {
    expect("Nepal".endsWith("al")).toBe(true)
  })

  test("ToUpperCase", () => {
    expect("hello".toUpperCase()).toBe("HELLO")
  })

  test("ToLowerCase", () => {
    expect("HELLO".toLowerCase()).toBe("hello")
  })

  test("Trim", () => {
    expect("   spaced   ".trim()).toBe("spaced")
  })

  test("Split", () => {
    expect("a,b,c".split(",")).toEqual(["a", "b", "c"])
  })

  test("Replace", () => {
    expect("I love dogs".replace("dogs", "cats")).toBe("I love cats")
  })

  test("Repeat", () => {
    expect("ha".repeat(3)).toBe("hahaha")
  })

  test("PadStart", () => {
    expect("5".padStart(3, "0")).toBe("005")
  })

  test("PadEnd", () => {
    expect("7".padEnd(3, "x")).toBe("7xx")
  })

  test("Escape characters", () => {
    expect("Line1\nLine2").toContain("\n")
  })

  test("Template literals", () => {
    const name = "Sangit"
    expect(`Hello ${name}).toBe("Hello Sangit"`)
  })

  test("Backslash", () => {
    expect("C:\\Program Files").toMatch(/\\/)
  })

  test("IndexOf", () => {
    expect("elephant".indexOf("ph")).toBe(3)
  })

  test("LastIndexOf", () => {
    expect("banana".lastIndexOf("a")).toBe(5)
  })

  test("Match regex", () => {
    expect("hello123".match(/\d+/)[0]).toBe("123")
  })

  test("String fromCharCode", () => {
    expect(String.fromCharCode(65)).toBe("A")
  })

  test("localeCompare", () => {
    expect("a".localeCompare("b")).toBeLessThan(0)
  })

  test("String constructor", () => {
    expect(String(123)).toBe("123")
  })

  test("Concat method", () => {
    expect("foo".concat("bar")).toBe("foobar")
  })
})