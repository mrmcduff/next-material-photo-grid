export function makeQueryUrl (pathName: string, search?: string | string[]): string {
    const searchTerm = search ? `?search=${search}` : '';
    return `${pathName}${searchTerm}`;
}