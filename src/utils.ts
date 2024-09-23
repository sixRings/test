import { KEY_CHARACTERS } from "./enums";
import { Direction, Position } from "./types";

/**
 * A constant array representing the four possible movement directions on the grid.
 *
 * Each object in the array describes a direction of movement:
 * - `row: -1, col: 0` represents moving **up** (decreasing the row index).
 * - `row: 1, col: 0` represents moving **down** (increasing the row index).
 * - `row: 0, col: -1` represents moving **left** (decreasing the column index).
 * - `row: 0, col: 1` represents moving **right** (increasing the column index).
 *
 * These directions are used to navigate through a grid, where movement is constrained
 * to the four cardinal directions (up, down, left, and right).
 */
export const DIRECTIONS: Direction[] = [
    { row: -1, col: 0 }, // Up
    { row: 1, col: 0 }, // Down
    { row: 0, col: -1 }, // Left
    { row: 0, col: 1 }, // Right
];

/**
 * The filterDirections function filters out directions that are perpendicular to the current movement.
 *
 * It takes the current movement direction (up/down or left/right) and returns only the directions
 * that would allow a valid turn at an intersection, ensuring movement continues in the same axis (either row or column).
 *
 * - If the current direction is horizontal (i.e., moving left or right, where `currentDirection.row === 0`),
 *   it filters out horizontal directions and returns only vertical directions (up or down).
 *
 * - If the current direction is vertical (i.e., moving up or down, where `currentDirection.col === 0`),
 *   it filters out vertical directions and returns only horizontal directions (left or right).
 *
 * This logic is used when navigating intersections ('+') or turns, ensuring the path continues in
 * a direction perpendicular to the current movement (i.e., turning).
 *
 * @param currentDirection - The current movement direction (either vertical or horizontal).
 * @returns {Direction[]} - An array of valid directions (either horizontal or vertical, opposite to the current direction).
 */
export const filterDirections = (currentDirection: Direction): Direction[] => {
    return DIRECTIONS.filter((direction) => {
        // If moving horizontally (row is 0), only allow vertical directions (where direction.row !== 0)
        if (currentDirection.row === 0) {
            return direction.row !== 0;
        }
        // If moving vertically (col is 0), only allow horizontal directions (where direction.row === 0)
        return direction.row === 0;
    });
};

/**
 * The findPosition function searches for a specific character (char) in a 2D grid and returns its position.
 *
 * It iterates through each row and column of the grid, checking each cell to see if it matches the given character.
 * If the character is found, it returns the position as an object with the row and column indices.
 *
 * - If the character is found, the function returns an object `{ row, col }`, representing the coordinates of the character.
 * - If the character is not found in the grid, the function returns `null`.
 *
 * @param grid - A 2D array (grid) where each element is a string representing a character.
 * @param char - The specific character to search for in the grid.
 * @returns {Position | null} - The position of the character in the grid (if found), or null if not found.
 */
export const findPosition = (grid: string[][], char: string): Position | null => {
    // Loop through each row of the grid
    for (let row = 0; row < grid.length; row++) {
        // Loop through each column of the current row
        for (let col = 0; col < grid[row].length; col++) {
            // If the character in the grid matches the target character, return the position
            if (grid[row][col] === char) {
                return { row, col };
            }
        }
    }
    // If the character was not found in the grid, return null
    return null;
};

/**
 * Determines if a given position is within the valid boundaries of the grid.
 *
 * @param grid - A 2D array representing the grid.
 * @param position - The current position with `row` and `col` properties.
 * @returns A boolean value: `true` if the position is within the grid boundaries, `false` otherwise.
 *
 * This function checks whether the given position (row and column) is within the valid range of the grid.
 * It ensures that:
 * 1. The row index is between 0 (inclusive) and the number of rows in the grid (exclusive).
 * 2. The column index is between 0 (inclusive) and the number of columns in that specific row (exclusive).
 * If both conditions are met, the function returns `true`, meaning the position is valid within the grid.
 */
export const isWithinBounds = (grid: string[][], position: Position): boolean => {
    return (
        position.row >= 0 && position.row < grid.length && position.col >= 0 && position.col < grid[position.row].length
    );
};

/**
 * Checks if a given character is a valid path character.
 *
 * The function returns `true` if the character matches any of the key path characters:
 * - `KEY_CHARACTERS.MINUS_CHAR`: Represents horizontal movement ("-").
 * - `KEY_CHARACTERS.VERTICAL_CHAR`: Represents vertical movement ("|").
 * - `KEY_CHARACTERS.CHANGE_DIRECTION_CHAR`: Represents an intersection or change of direction ("+").
 *
 * These characters define valid path segments in the grid.
 *
 * @param char - The character to check.
 * @returns `true` if the character is a path character, otherwise `false`.
 */
export const isPathCharacter = (char: string): boolean => {
    return (
        char === KEY_CHARACTERS.MINUS_CHAR || // Horizontal movement
        char === KEY_CHARACTERS.VERTICAL_CHAR || // Vertical movement
        char === KEY_CHARACTERS.CHANGE_DIRECTION_CHAR // Intersection or turn
    );
};

/**
 * Moves to a new position based on the current position and direction.
 *
 * This function calculates the next position by adding the direction vector
 * to the current position. The direction is represented by how many rows and
 * columns the movement involves.
 *
 * For example, moving `up` would decrement the row by 1, moving `down` increments
 * the row by 1, and similar for horizontal movement along the columns.
 *
 * @param position - The current position on the grid.
 * @param direction - The direction to move in, containing row and column offsets.
 * @returns The new position after moving in the specified direction.
 */
export const move = (position: Position, direction: Direction): Position => {
    return {
        row: position.row + direction.row, // Update the row based on the movement direction
        col: position.col + direction.col, // Update the column based on the movement direction
    };
};

/**
 * Determines if there is exactly one valid direction at a "+" position on the grid.
 *
 * This function checks if the current position is at a "+" (change direction character),
 * and if so, it checks how many valid directions (possible moves) are available.
 * It ensures there is only one valid direction to move in; otherwise, it throws an error.
 *
 * @param grid - The 2D grid of the path.
 * @param position - The current position on the grid.
 * @param currentDirection - The direction in which we are currently moving.
 * @returns `true` if there is only one valid direction, otherwise throws an error.
 */
export const haveOneValidDirection = (grid: string[][], position: Position, currentDirection: Direction): boolean => {
    // Check if the current character is the "+" (change direction) character
    if (grid[position.row][position.col] !== KEY_CHARACTERS.CHANGE_DIRECTION_CHAR) {
        return false; // Not at a "+" character
    }

    let validDirections = 0;

    // Loop through potential directions, excluding the current one
    for (const direction of filterDirections(currentDirection)) {
        const newPosition: Position = {
            row: position.row + direction.row,
            col: position.col + direction.col,
        };

        // Check if the new position is within bounds and if it leads to a valid path
        if (isWithinBounds(grid, newPosition)) {
            const nextChar = grid[newPosition.row][newPosition.col];
            // Check if it's a valid path character or a letter (A-Z or x)
            if (isPathCharacter(nextChar) || /[A-Zx]/.test(nextChar)) {
                validDirections++;
            }
        }
    }

    // If more than one valid direction is found, throw an error
    if (validDirections > 1) {
        throw new Error("The map must have only one valid direction.");
    }

    return true; // There is exactly one valid direction
};

/**
 * Checks if a given position has already been visited.
 *
 * This function determines whether the current position is already in the list of previously visited locations.
 * It helps to ensure that a location is not revisited multiple times during path traversal.
 *
 * @param location - An array of positions that have already been visited.
 * @param currentPosition - The position to check against the list of visited locations.
 * @returns `true` if the current position has already been visited; otherwise, `false`.
 */
export const isLocationAlreadyUsed = (location: Position[], currentPosition: Position): boolean => {
    return location.some((value) => value.col === currentPosition.col && value.row === currentPosition.row);
};

/**
 * Checks if a specific character appears more than once in the grid.
 *
 * This function determines whether a given character (`target`) occurs more than once in the provided 2D grid.
 * It uses a set to keep track of previously encountered characters to efficiently check for duplicates.
 *
 * @param grid - A 2D array representing the grid to search within.
 * @param target - The character to check for multiple occurrences.
 * @returns `true` if the target character appears more than once in the grid; otherwise, `false`.
 */
export const hasMultipleOccurrences = (grid: string[][], target: string): boolean => {
    // Create a set to track occurrences of the target character
    const occurrences = new Set<string>();

    // Iterate through each row of the grid
    for (let row = 0; row < grid.length; row++) {
        // Iterate through each column of the current row
        for (let col = 0; col < grid[row].length; col++) {
            // Check if the current cell contains the target character
            if (grid[row][col] === target) {
                // If the target character has already been encountered, return true
                if (occurrences.has(target)) {
                    return true; // Found the target more than once
                } else {
                    // Otherwise, add the target character to the set of occurrences
                    occurrences.add(target);
                }
            }
        }
    }

    // If no multiple occurrences were found, return false
    return false; // No multiple occurrences found
};
