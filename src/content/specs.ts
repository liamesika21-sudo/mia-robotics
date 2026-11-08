/**
 * Approved technical specifications ONLY.
 * The figures in the source documents are drafts — do not enter them here until the client signs off.
 * The section renders only when site.specsApproved is true AND this list is non-empty.
 */
export type SpecRow = { label: { en: string; he: string }; value: { en: string; he: string } };
export const specs: SpecRow[] = [];
