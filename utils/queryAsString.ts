import { ParsedUrlQuery } from "querystring"

export const getQuerySearchAsStringValue = (query: ParsedUrlQuery): string => {
    if (query.search && typeof query.search === 'string') {
        return query.search as string;
    }
    return '';
}
