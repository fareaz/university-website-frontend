import { Category } from "@/types/category";

export type IndentedCategory = Category & {
    _depth: number;
};

/**
 * Convert flat category list into indented list (WordPress style)
 */
export function buildIndentedCategories(
    categories: Category[],
    parentId: string | null = null,
    depth = 0
): IndentedCategory[] {
    let result: IndentedCategory[] = [];

    const children = categories.filter(cat =>
        parentId === null
            ? !cat.parent
            : cat.parent?._id === parentId
    );

    for (const child of children) {
        const indentedChild: IndentedCategory = {
            ...child,
            _depth: depth,
        };

        result.push(indentedChild);

        result = result.concat(
            buildIndentedCategories(categories, child._id, depth + 1)
        );
    }

    return result;
}
