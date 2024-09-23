import { KEY_CHARACTERS } from "./enums";
import { Position, Direction } from "./types";
import {
    DIRECTIONS,
    move,
    isWithinBounds,
    isPathCharacter,
    findPosition,
    hasMultipleOccurrences,
    isLocationAlreadyUsed,
    haveOneValidDirection,
    filterDirections,
} from "./utils";

/**
 * Determines the initial direction to move from the starting position in the grid.
 *
 * This function identifies the valid directions that can be taken from the starting position based on the surrounding
 * grid cells. It ensures that there is exactly one valid direction to move from the starting position.
 *
 * @param grid - A 2D array representing the grid with path characters and obstacles.
 * @param start - The starting position in the grid from which the initial direction needs to be determined.
 * @returns The direction to move from the starting position if exactly one valid direction is found; otherwise, throws an error.
 * @throws Error if there is not exactly one valid direction from the starting position.
 */
const findInitialDirection = (grid: string[][], start: Position): Direction | null => {
    const validDirections: Direction[] = [];

    // Check all possible directions (Up, Down, Left, Right)
    for (const dir of DIRECTIONS) {
        const potentialPosition = move(start, dir);
        // Ensure the potential position is within the grid bounds
        if (isWithinBounds(grid, potentialPosition)) {
            const nextChar = grid[potentialPosition.row][potentialPosition.col];
            // Check if the next character is part of the path or a letter
            if (isPathCharacter(nextChar) || /[A-Zx]/.test(nextChar)) {
                validDirections.push(dir); // Add valid direction to the list
            }
        }
    }

    // Ensure there is exactly one valid direction from the starting position
    if (validDirections.length === 1) {
        return validDirections[0]; // Return the valid direction
    } else {
        // If there are no valid directions or more than one, throw an error
        throw new Error("The map must contain exactly one starting path.");
    }
};

/**
 * Collects letters and constructs the path from the starting position to the ending position on the grid.
 *
 * This function follows the path from a single starting position to a single ending position on the grid. It collects
 * all letters encountered along the path and builds the full path string. It also ensures the map has exactly one start
 * and one end, and that the path is valid.
 *
 * @param grid - A 2D array representing the grid with path characters, letters, and other characters.
 * @returns An object containing:
 *   - `letters`: A string of all letters collected along the path.
 *   - `path`: A string representing the full path traversed from start to end.
 * @throws Error if:
 *   - There are no start or end positions.
 *   - There are multiple starting positions or no starting position.
 *   - The path is broken or invalid.
 */
export const collectLettersAndPath = (grid: string[][]): { letters: string; path: string } => {
    // Find the starting and ending positions on the grid
    const start = findPosition(grid, KEY_CHARACTERS.STARTING_CHAR);
    const end = findPosition(grid, KEY_CHARACTERS.ENDING_CHAR);
    const haveMultipleStart = hasMultipleOccurrences(grid, KEY_CHARACTERS.STARTING_CHAR);

    // Check if the grid has exactly one start and one end position
    if (!start || !end || haveMultipleStart) {
        throw new Error(
            `The map must contain exactly one start '${KEY_CHARACTERS.STARTING_CHAR}' and one end '${KEY_CHARACTERS.ENDING_CHAR}'.`
        );
    }

    // Find the initial direction to start traversing the grid
    let direction: Direction | null = findInitialDirection(grid, start);

    // If no valid direction is found, the starting position or map is invalid
    if (!direction) {
        throw new Error("Invalid starting position or map.");
    }

    // Move to the initial position based on the direction
    let currentPosition = move(start, direction);

    const path: string[] = [KEY_CHARACTERS.STARTING_CHAR]; // Initialize path with the starting character
    const letters: string[] = []; // List to collect letters encountered
    const location: Position[] = []; // Track positions where letters are collected

    while (true) {
        const currentChar = grid[currentPosition.row][currentPosition.col];
        path.push(currentChar); // Add current character to the path

        // Collect letters that have not been collected before
        if (/[A-Z]/.test(currentChar) && !isLocationAlreadyUsed(location, currentPosition)) {
            letters.push(currentChar);
            location.push(currentPosition); // Add the position to track collected letters
        }

        // Check if the current position is the end position
        if (currentPosition.row === end.row && currentPosition.col === end.col) {
            break; // Exit loop if the end position is reached
        }

        // Find the next step to move in the path
        const nextStep = findNextPosition(grid, currentPosition, direction);

        // If no valid next step is found, the path is invalid
        if (!nextStep) {
            throw new Error("Path is broken or invalid.");
        }

        // Update current position and direction based on the next step
        currentPosition = nextStep.nextPosition;
        direction = nextStep.newDirection;
    }

    // Return the collected letters and the full path as strings
    return { letters: letters.join(""), path: path.join("") };
};

/**
 * Determines the next position and direction to move in the grid from the current position.
 *
 * This function calculates the next position and direction based on the current position, direction, and the character
 * found at the current position. It handles cases where a direction change is required or continues moving in the current
 * direction if possible.
 *
 * @param grid - A 2D array representing the grid with path characters, letters, and other characters.
 * @param currentPosition - The current position in the grid.
 * @param currentDirection - The current direction of movement.
 * @returns An object with:
 *   - `nextPosition`: The next position to move to.
 *   - `newDirection`: The new direction to move in.
 *   - Returns `null` if no valid next position and direction are found.
 */
const findNextPosition = (
    grid: string[][],
    currentPosition: Position,
    currentDirection: Direction
): { nextPosition: Position; newDirection: Direction } | null => {
    const currentChar = grid[currentPosition.row][currentPosition.col];

    // If we are at a '+', determine the new direction to move in
    if (
        currentChar === KEY_CHARACTERS.CHANGE_DIRECTION_CHAR &&
        haveOneValidDirection(grid, currentPosition, currentDirection)
    ) {
        // Iterate over possible directions to find a valid new direction
        for (const dir of filterDirections(currentDirection)) {
            const potentialPosition = move(currentPosition, dir);

            if (isWithinBounds(grid, potentialPosition)) {
                const nextChar = grid[potentialPosition.row][potentialPosition.col];
                // Ensure the new direction is not the opposite of the current direction
                if (
                    (dir.row !== -currentDirection.row || dir.col !== -currentDirection.col) &&
                    (isPathCharacter(nextChar) || /[A-Zx]/.test(nextChar))
                ) {
                    return { nextPosition: potentialPosition, newDirection: dir };
                }
            }
        }
    } else {
        // If not at a '+', continue moving in the current direction
        const potentialPosition = move(currentPosition, currentDirection);
        if (isWithinBounds(grid, potentialPosition)) {
            const nextChar = grid[potentialPosition.row][potentialPosition.col];
            if (isPathCharacter(nextChar) || /[A-Zx]/.test(nextChar)) {
                return { nextPosition: potentialPosition, newDirection: currentDirection };
            }
        } else {
            // If moving in the current direction is not possible (out of bounds),
            // check for alternative directions at the current position (if it's a letter)
            if (/[A-Z]/.test(currentChar)) {
                for (const dir of filterDirections(currentDirection)) {
                    const potentialPosition = move(currentPosition, dir);

                    if (isWithinBounds(grid, potentialPosition)) {
                        const nextChar = grid[potentialPosition.row][potentialPosition.col];
                        // Ensure the new direction is not the opposite of the current direction
                        if (
                            (dir.row !== -currentDirection.row || dir.col !== -currentDirection.col) &&
                            (isPathCharacter(nextChar) || /[A-Zx]/.test(nextChar))
                        ) {
                            return { nextPosition: potentialPosition, newDirection: dir };
                        }
                    }
                }
            }
        }
    }

    // Return null if no valid next position and direction are found
    return null;
};
