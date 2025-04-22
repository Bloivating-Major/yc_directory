export const normalizeSearchQuery = (query: string | undefined): string => {
    if (!query) return "";
    return query.toLowerCase().trim();
};