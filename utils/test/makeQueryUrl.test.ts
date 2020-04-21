import { makeQueryUrl } from '../makeQueryUrl';

describe('Simple tests for the query URL maker', () => {
    it('creates a simple query url with the search keyword', () => {
        const created = makeQueryUrl('/foo', 'bar');
        expect(created).toEqual('/foo?search=bar');
    });

    it('handles the empty query parameter case', () => {
        const created = makeQueryUrl('/hello');
        expect(created).toEqual('/hello');
    });
})
