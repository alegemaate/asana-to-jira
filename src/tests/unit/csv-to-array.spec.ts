import { csvToArray } from "@/utils/csv-to-array";

describe("csvToArray.ts", () => {
  it("converts single line", () => {
    const csv = "a,b,c";

    const arr = csvToArray(csv);

    const [firstRow] = arr;

    expect(firstRow).toHaveLength(3);
    expect(firstRow[0]).toBe("a");
    expect(firstRow[1]).toBe("b");
    expect(firstRow[2]).toBe("c");
  });

  it("converts multiple lines", () => {
    const csv = "a,b,c\nd,e,f";

    const arr = csvToArray(csv);

    const [firstRow, secondRow] = arr;

    expect(firstRow).toHaveLength(3);
    expect(firstRow[0]).toBe("a");
    expect(firstRow[1]).toBe("b");
    expect(firstRow[2]).toBe("c");

    expect(secondRow).toHaveLength(3);
    expect(secondRow[0]).toBe("d");
    expect(secondRow[1]).toBe("e");
    expect(secondRow[2]).toBe("f");
  });

  it("converts quotes", () => {
    const csv = 'a,b,"c"';

    const arr = csvToArray(csv);

    const [firstRow] = arr;

    expect(firstRow).toHaveLength(3);
    expect(firstRow[0]).toBe("a");
    expect(firstRow[1]).toBe("b");
    expect(firstRow[2]).toBe("c");
  });

  it("converts quotes with comma", () => {
    const csv = 'a,b,"c,d"';

    const arr = csvToArray(csv);

    const [firstRow] = arr;

    expect(firstRow).toHaveLength(3);
    expect(firstRow[0]).toBe("a");
    expect(firstRow[1]).toBe("b");
    expect(firstRow[2]).toBe("c,d");
  });

  it("converts quotes with newline", () => {
    const csv = 'a,b,"c\nd"';

    const arr = csvToArray(csv);

    const [firstRow] = arr;

    expect(firstRow).toHaveLength(3);
    expect(firstRow[0]).toBe("a");
    expect(firstRow[1]).toBe("b");
    expect(firstRow[2]).toBe("c\nd");
  });

  it("converts quotes with newline and comma", () => {
    const csv = 'a,b,"c\nd,e"';

    const arr = csvToArray(csv);

    const [firstRow] = arr;

    expect(firstRow).toHaveLength(3);
    expect(firstRow[0]).toBe("a");
    expect(firstRow[1]).toBe("b");
    expect(firstRow[2]).toBe("c\nd,e");
  });
});
