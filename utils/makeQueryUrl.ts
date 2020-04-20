export function makeQueryUrl (pathName: string, page?: number, search?: string | string[]): string {
    const pageTerm = page ? `?page=${page}` : '';
    const searchTerm = search ? `${pageTerm ? '&' : '?'}search=${search}` : '';
    return `${pathName}${pageTerm}${searchTerm}`;
}