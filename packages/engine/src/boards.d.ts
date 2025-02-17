export declare const getBoard: (name: string) => BoardModule;
export declare const hasBoard: (name: string) => boolean;
export declare class BoardHelper {
    readonly rulesById: Map<string, RuleSchema>;
    readonly boardModule: BoardModule;
    constructor(boardModule: BoardModule | null);
    private processRulesIntoLookupMap;
}
//# sourceMappingURL=boards.d.ts.map