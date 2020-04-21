import { ParsedUrlQuery } from "querystring"

export const getQueryParameters = (query: ParsedUrlQuery): { search?: string } => {
    const queryValues: { search?: string } = {}
    if (query.search && typeof query.search === 'string') {
        queryValues.search = query.search as string;
    }
    return queryValues;
}
