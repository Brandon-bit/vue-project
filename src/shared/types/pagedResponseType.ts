export type PagedResponseType<T> = {
    items: T[],
    totalItems: number,
    page: number,
    pageSize: number
    length: number
}