export const basicExampleMap = [
    ["@", "-", "-", "-", "A", "-", "-", "-", "+"],
    ["", "", "", "", "", "", "", "", "|"],
    ["x", "-", "B", "-", "+", "", "", "", "C"],
    ["", "", "", "", "|", "", "", "", "|"],
    ["", "", "", "", "+", "-", "-", "-", "+"],
];

export const goStraightThroughIntersectionsMap = [
    ["@", "", "", "", "", "", "", "", "", ""],
    ["|", "", "+", "-", "C", "-", "-", "+", "", ""],
    ["A", "", "|", "", "", "", "", "|", "", ""],
    ["+", "-", "-", "-", "B", "-", "-", "+", "", ""],
    ["", "", "|", "", "", "", "", "", "", "x"],
    ["", "", "|", "", "", "", "", "", "", "|"],
    ["", "", "+", "-", "-", "-", "D", "-", "-", "+"],
];

export const lettersMayBeFoundOnTurnsMap = [
    ["@", "-", "-", "-", "A", "-", "-", "-", "+"],
    ["", "", "", "", "", "", "", "", "|"],
    ["x", "-", "B", "-", "+", "", "", "", "|"],
    ["", "", "", "", "|", "", "", "", "|"],
    ["", "", "", "", "+", "-", "-", "-", "C"],
];

export const doNotCollectLetterFromSameLocationTwiceMap = [
    ["", "", "", "", "+", "-", "O", "-", "N", "-", "+", "", ""],
    ["", "", "", "", "|", "", "", "", "", "", "|", "", ""],
    ["", "", "", "", "|", "", "", "", "+", "-", "I", "-", "+"],
    ["@", "-", "G", "-", "O", "-", "+", "", "|", "", "|", "", "|"],
    ["", "", "", "", "|", "", "|", "", "+", "-", "+", "", "E"],
    ["", "", "", "", "+", "-", "+", "", "", "", "", "", "S"],
    ["", "", "", "", "", "", "", "", "", "", "", "", "|"],
    ["", "", "", "", "", "", "", "", "", "", "", "", "x"],
];

export const keepDirectionEvenInCompactSpaceMap = [
    ["", "+", "-", "L", "-", "+"],
    ["", "|", "", "", "+", "A", "-", "+"],
    ["@", "B", "+", "", "+", "+", "", "H"],
    ["", "+", "+", "", "", "", "", "x"],
];

export const ignoreStuffAfterEndOfPathMap = [
    ["@", "-", "A", "-", "-", "+"],
    ["", "", "", "", "", "|"],
    ["", "", "", "", "", "+", "-", "B", "-", "-", "x", "-", "C", "-", "-", "D"],
];

export const missingStartCharacterMap = [
    ["", "", "-", "A", "-", "-", "+"],
    ["", "", "", "", "", "", "|"],
    ["x", "-", "B", "-", "+", "", "C"],
    ["", "", "|", " ", "|", "", ""],
    ["", "", "+", "-", "-", "-", "+"],
];

export const missingEndCharacterMap = [
    ["@", "-", "-", "A", "-", "-", "-", "+"],
    ["", "", "", "", "", "", "", "|"],
    ["", "", "B", "-", "+", "", "", "C"],
    ["", "", "|", "", "|", "", "", "|"],
    ["", "", "+", "-", "-", "-", "-", "+"],
];

export const multipleStart1Map = [
    ["@", "-", "-", "A", "-", "@", "-", "+"],
    [" ", " ", " ", " ", " ", " ", " ", "|"],
    ["x", "-", "B", "-", "+", " ", " ", "C"],
    [" ", " ", " ", "|", " ", " ", " ", "|"],
    [" ", " ", " ", "+", "-", "-", "-", "+"],
];

export const multipleStart2Map = [
    ["@", "-", "-", "A", "-", "-", "-", "+"],
    [" ", " ", " ", " ", " ", " ", " ", "|"],
    [" ", " ", " ", " ", " ", " ", " ", "C"],
    [" ", " ", " ", " ", " ", " ", " ", "x"],
    [" ", " ", " ", "@", "-", "B", "-", "+"],
];

export const multipleStart3Map = [
    [" ", "@", "-", "-", "A", "-", "-", "x"],
    [" "],
    ["x", "-", "B", "-", "+"],
    [" ", " ", " ", " ", "|"],
    [" ", " ", " ", " ", "@"],
];

export const forkInPathMap = [
    [" ", " ", " ", " ", " ", " ", "x", "-", "B"],
    [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
    [" ", "@", "-", "-", "A", "-", "-", "-", "+"],
    [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
    [" ", " ", " ", " ", " ", "x", "+", " ", "C"],
    [" ", " ", " ", " ", " ", " ", "|", " ", "|"],
    [" ", " ", " ", " ", " ", " ", "+", "-", "-", "+"],
];

export const brokenPathMap = [
    [" ", " ", " ", "@", "-", "-", "A", "-", "+"],
    [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
    [" "],
    [" ", " ", " ", " ", " ", " ", " ", "B", "-", "x"],
];

export const mapWithMultipleStartingPaths = [["x", "-", "B", "-", "@", "-", "A", "-", "x"]];

export const fakeTurnMap = [["@", "-", "A", "-", "+", "-", "B", "-", "x"]];