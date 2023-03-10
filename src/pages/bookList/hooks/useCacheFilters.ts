import {useEffect} from "react";
import {ActiveFilters} from "../types";

export default function useCacheFilters(
    activeFilters: ActiveFilters,
    setActiveFilters: (filters: ActiveFilters) => void,
    setSearchTerm: (term: string) => void
): void {
    //Efeito que limpa os filtros do sessionStorage ao dar refresh na pagina
    useEffect(() => {

        function handler() {
            sessionStorage.removeItem('filters');
        }

        window.addEventListener('beforeunload', handler);

        return () => window.removeEventListener('beforeunload', handler)

    }, [])

    //O efeito para aplicar os filtros salvos do cache deve ser executado primeiro
    useEffect(() => {
        const filtersJson = sessionStorage.getItem('filters');
        if (filtersJson) {
            const filters = JSON.parse(filtersJson);
            setActiveFilters(filters);
            if (filters.searchTerm) setSearchTerm(filters.searchTerm);
        }
    }, [])

    //Armazena os filtros no cache toda vez que são alterados
    useEffect(() => {
        sessionStorage.setItem('filters', JSON.stringify(activeFilters));
    }, [activeFilters]);
}