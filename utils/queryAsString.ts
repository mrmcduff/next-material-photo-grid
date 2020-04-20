import { ParsedUrlQuery } from "querystring"

export const getQueryParameters = (query: ParsedUrlQuery): { search?: string, page?: number } => {
    const queryValues: { search?: string, page?: number } = {}
    if (query.search && typeof query.search === 'string') {
        queryValues.search = query.search as string;
    }
    if (query.page && typeof query.page === 'string') {
        const parsedPage = parseInt(query.page, 10);
        if (!isNaN(parsedPage)) {
            queryValues.page = parsedPage
        }
    }
    return queryValues;
}
