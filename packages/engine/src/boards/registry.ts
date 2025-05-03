import { BoardModule } from '@repo/schemas';

/**
 * Registry for board modules in the game engine
 * Provides a centralized mechanism for registering, retrieving, and listing available game boards
 */
class BoardRegistry {
  private boards: Map<string, BoardModule> = new Map();

  /**
   * Register a board module
   *
   * @param boardId Unique identifier for the board
   * @param boardModule Board module containing board schema, implementation and metadata
   */
  register(boardId: string, boardModule: BoardModule): void {
    if (!boardModule.metadata) {
      throw new Error(`Board module for '${boardId}' must have metadata defined`);
    }

    // Ensure the metadata.id matches the boardId for consistency
    if (boardModule.metadata.id !== boardId) {
      throw new Error(
        `Board module metadata.id (${boardModule.metadata.id}) must match the boardId (${boardId})`,
      );
    }

    this.boards.set(boardId, boardModule);
  }

  /**
   * Get a board module by its ID
   *
   * @param boardId Unique identifier for the board
   * @returns Board module or undefined if not found
   */
  getBoard(boardId: string): BoardModule | undefined {
    return this.boards.get(boardId);
  }

  /**
   * Check if a board exists in the registry
   *
   * @param boardId Unique identifier for the board
   * @returns True if the board exists, false otherwise
   */
  hasBoard(boardId: string): boolean {
    return this.boards.has(boardId);
  }

  /**
   * Get metadata for all available boards
   *
   * @returns Array of board metadata objects
   */
  getAvailableBoards(): BoardModule[] {
    return Array.from(this.boards.entries())
      .map(([_, module]) => module)
      .filter(Boolean);
  }
}

/**
 * Singleton instance of the board registry
 */
export const boardRegistry = new BoardRegistry();
