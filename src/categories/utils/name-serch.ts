export function nameSearch<T>(name: T) {
    return `replace(category.${name}, 'ё', 'е') ILIKE replace(:${name}, 'ё', 'е')`
}