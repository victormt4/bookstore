import FilteredListDTO from "services/bookFilter/dto/FilteredListDTO";

export type ActiveFilters = {
    categories?: Array<string>,
    others?: Array<string>,
    searchTerm?: string,
    pageNumber?: number,
    order?: string
}

export type FilterListFN = (filteredList: FilteredListDTO) => void