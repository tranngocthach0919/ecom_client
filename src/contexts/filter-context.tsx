"use client"
import { createContext, Dispatch, SetStateAction, useState } from 'react';
import { defaultValues } from 'src/sections/_ecommerce/product/filters/ecommerce-filters';
import { IProductFiltersProps } from 'src/types/product';

const FilterContext = createContext<{
    filters: IProductFiltersProps;
    setFilters: Dispatch<SetStateAction<IProductFiltersProps>>;
} | null>(null);

export default FilterContext;

interface FilterProviderProps {
    children: React.ReactNode;
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
    const [filters, setFilters] = useState<IProductFiltersProps>(defaultValues);
    console.log('FilterProvider filters:', filters);

    return (
        <FilterContext.Provider value={{ filters, setFilters }}>
            {children}
        </FilterContext.Provider>
    );
};
