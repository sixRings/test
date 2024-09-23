import { collectLettersAndPath } from "..";
import { KEY_CHARACTERS } from "../enums";
import { findPosition, isWithinBounds, isPathCharacter, hasMultipleOccurrences } from "../utils";

describe("findPosition function", () => {
    test("should return correct position of the target character", () => {
        const grid = [
            [" ", " ", "@"],
            [" ", " ", " "],
            [" ", "x", " "],
        ];

        const result = findPosition(grid, "@");
        expect(result).toEqual({ row: 0, col: 2 });
    });

    test("should return null if the target character is not found", () => {
        const grid = [
            [" ", " ", " "],
            [" ", " ", " "],
            [" ", " ", "x"],
        ];

        const result = findPosition(grid, "@");
        expect(result).toBeNull();
    });
});

describe("isWithinBounds function", () => {
    test("should return true for valid positions within grid bounds", () => {
        const grid = [
            ["@", "-", "A"],
            [" ", "|", "x"],
        ];

        const position = { row: 1, col: 1 };
        const result = isWithinBounds(grid, position);
        expect(result).toBe(true);
    });

    test("should return false for positions outside grid bounds", () => {
        const grid = [
            ["@", "-", "A"],
            [" ", "|", "x"],
        ];

        const position = { row: 2, col: 1 }; // Out of bounds
        const result = isWithinBounds(grid, position);
        expect(result).toBe(false);
    });
});

describe("isPathCharacter function", () => {
    test("should return true for valid path characters", () => {
        expect(isPathCharacter(KEY_CHARACTERS.MINUS_CHAR)).toBe(true);
        expect(isPathCharacter(KEY_CHARACTERS.VERTICAL_CHAR)).toBe(true);
        expect(isPathCharacter(KEY_CHARACTERS.CHANGE_DIRECTION_CHAR)).toBe(true);
    });

    test("should return false for non-path characters", () => {
        expect(isPathCharacter("A")).toBe(false);
        expect(isPathCharacter("@")).toBe(false);
    });
});

describe("hasMultipleOccurrences function", () => {
    test("should return true when the grid contains multiple occurrences of a character", () => {
        const grid = [
            ["@", "-", "A"],
            [" ", "|", "@"],
        ];
        expect(hasMultipleOccurrences(grid, "@")).toBe(true);
    });

    test("should return false when the grid contains only one occurrence of a character", () => {
        const grid = [
            ["@", "-", "A"],
            [" ", "|", "x"],
        ];
        expect(hasMultipleOccurrences(grid, "@")).toBe(false);
    });
});

describe("collectLettersAndPath function", () => {
    test("should throw error for map with multiple start characters", () => {
        const grid = [
            ["@", "-", "A", "-", "@"],
            [" ", " ", "|", " ", "x"],
        ];

        expect(() => collectLettersAndPath(grid)).toThrow(
            "The map must contain exactly one start '@' and one end 'x'."
        );
    });

    test("should throw error for broken path", () => {
        const grid = [
            ["@", "-", "A", "-", "+"],
            [" ", " ", "|", " ", " "],
            [" ", " ", "B", " ", "x"],
        ];

        expect(() => collectLettersAndPath(grid)).toThrow("Path is broken or invalid.");
    });

    test("should collect letters and path correctly", () => {
        const grid = [
            ["@", "-", "A", "-", "+"],
            [" ", " ", "|", " ", "x"],
        ];

        const result = collectLettersAndPath(grid);
        expect(result).toEqual({ letters: "A", path: "@-A-+x" });
    });

    test("should throw error for fork in path", () => {
        const grid = [
            ["@", "-", "A", "-", "+"],
            [" ", " ", "|", " ", "C"],
            ["x", "+", " ", " ", " "],
        ];

        expect(() => collectLettersAndPath(grid)).toThrow("Path is broken or invalid.");
    });
});
