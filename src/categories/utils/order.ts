export function createOrderFields(sort: string): {
    order: 'ASC'|'DESC',
    orderValue: string 
} {
    const order = sort[0] === '-' ? 'DESC' : 'ASC'
    const orderValue = sort[0] === '-' ? `"${sort.slice(1)}"` : `"${sort}"`

    return { order, orderValue }
}