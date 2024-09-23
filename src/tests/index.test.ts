import { KEY_CHARACTERS } from "../enums";
import { collectLettersAndPath } from "../index";
import {
    basicExampleMap,
    brokenPathMap,
    doNotCollectLetterFromSameLocationTwiceMap,
    fakeTurnMap,
    forkInPathMap,
    goStraightThroughIntersectionsMap,
    ignoreStuffAfterEndOfPathMap,
    keepDirectionEvenInCompactSpaceMap,
    lettersMayBeFoundOnTurnsMap,
    mapWithMultipleStartingPaths,
    missingEndCharacterMap,
    missingStartCharacterMap,
    multipleStart1Map,
    multipleStart2Map,
    multipleStart3Map,
} from "../maps";

describe("High-Level Acceptance Tests", () => {
    test("Basic example", () => {
        const result = collectLettersAndPath(basicExampleMap);
        expect(result.letters).toBe("ACB");
        expect(result.path).toBe("@---A---+|C|+---+|+-B-x");
    });

    test("Go straight through intersections", () => {
        const result = collectLettersAndPath(goStraightThroughIntersectionsMap);
        expect(result.letters).toBe("ABCD");
        expect(result.path).toBe("@|A+---B--+|+--C-+|-||+---D--+|x");
    });

    test("Letters may be found on turns", () => {
        const result = collectLettersAndPath(lettersMayBeFoundOnTurnsMap);
        expect(result.letters).toBe("ACB");
        expect(result.path).toBe("@---A---+|||C---+|+-B-x");
    });

    test("Do not collect a letter from the same location twice", () => {
        const result = collectLettersAndPath(doNotCollectLetterFromSameLocationTwiceMap);
        expect(result.letters).toBe("GOONIES");
        expect(result.path).toBe("@-G-O-+|+-+|O||+-O-N-+|I|+-+|+-I-+|ES|x");
    });

    test("Keep direction, even in a compact space", () => {
        const result = collectLettersAndPath(keepDirectionEvenInCompactSpaceMap);
        expect(result.letters).toBe("BLAH");
        expect(result.path).toBe("@B+++B|+-L-+A+++A-+Hx");
    });

    test("Ignore stuff after end of path", () => {
        const result = collectLettersAndPath(ignoreStuffAfterEndOfPathMap);
        expect(result.letters).toBe("AB");
        expect(result.path).toBe("@-A--+|+-B--x");
    });
});

describe("Invalid maps Tests", () => {
    test("Missing start character", () => {
        expect(() => collectLettersAndPath(missingStartCharacterMap)).toThrow(
            "The map must contain exactly one start '@' and one end 'x'."
        );
    });

    test("Missing end character", () => {
        expect(() => collectLettersAndPath(missingEndCharacterMap)).toThrow(
            "The map must contain exactly one start '@' and one end 'x'."
        );
    });

    test("Multiple start 1", () => {
        expect(() => collectLettersAndPath(multipleStart1Map)).toThrow(
            `The map must contain exactly one start '${KEY_CHARACTERS.STARTING_CHAR}' and one end '${KEY_CHARACTERS.ENDING_CHAR}'.`
        );
    });

    test("Multiple start 2", () => {
        expect(() => collectLettersAndPath(multipleStart2Map)).toThrow(
            `The map must contain exactly one start '${KEY_CHARACTERS.STARTING_CHAR}' and one end '${KEY_CHARACTERS.ENDING_CHAR}'.`
        );
    });

    test("Multiple start 3", () => {
        expect(() => collectLettersAndPath(multipleStart3Map)).toThrow(
            `The map must contain exactly one start '${KEY_CHARACTERS.STARTING_CHAR}' and one end '${KEY_CHARACTERS.ENDING_CHAR}'.`
        );
    });

    test("should throw an error when there is a fork in the path", () => {
        expect(() => collectLettersAndPath(forkInPathMap)).toThrow("The map must have only one valid direction.");
    });

    test("should throw an error when there is a broken path", () => {
        expect(() => collectLettersAndPath(brokenPathMap)).toThrow("Path is broken or invalid.");
    });

    test("should throw an error when there are multiple starting paths", () => {
        expect(() => collectLettersAndPath(mapWithMultipleStartingPaths)).toThrow(
            `The map must contain exactly one starting path.`
        );
    });

    test("should throw an error when there is a fake turn", () => {
        expect(() => collectLettersAndPath(fakeTurnMap)).toThrow("Path is broken or invalid.");
    });
});
