export type pagedResponseType<T> = {
    items: T[],
    totalItems: number,
    page: number,
    pageSize: number
}