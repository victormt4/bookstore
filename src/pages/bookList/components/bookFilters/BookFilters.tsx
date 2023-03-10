import React, {useEffect, useState} from "react";
import OrderTypes from "services/bookFilter/types/OrderTypes";
import OtherFilterTypes from "services/bookFilter/types/OtherFilterTypes";
import {ActiveFilters} from "services/bookFilter/types";
import Button from "components/button/Button";
import "./BookFilters.css";

type BookFiltersProps = {
    defaultFilters: ActiveFilters,
    applyFilters: (filters: ActiveFilters) => void,
    categories: Array<string>
}

export default function BookFilters(props: BookFiltersProps) {

    const [order, setOrder] = useState<string | null>(null);
    const [categories, setCategories] = useState<Array<string>>([]);
    const [others, setOthers] = useState<Array<string>>([]);

    //Efeito que carrega os filtros padrão
    useEffect(() => {
        const defaultFilters = props.defaultFilters;
        if (defaultFilters.order) setOrder(defaultFilters.order);
        if (Array.isArray(defaultFilters.categories) && defaultFilters.categories.length) setCategories(defaultFilters.categories);
        if (Array.isArray(defaultFilters.others) && defaultFilters.others.length) setOthers(defaultFilters.others);
    }, [props.defaultFilters])

    function applyFilters() {

        let filters: ActiveFilters = {};

        filters.order = order;
        filters.categories = categories;
        filters.others = others;
        filters.pageNumber = 1;

        props.applyFilters(filters);
    }

    function toggleOrder(orderType: string) {
        if (orderType === order) setOrder(null);
        else setOrder(orderType);
    }

    function toggleCategories(categoryType: string) {
        setCategories(prevCategories => {
            let newCategories = [...prevCategories];
            if (newCategories.includes(categoryType)) newCategories = newCategories.filter(category => category !== categoryType);
            else newCategories.push(categoryType);
            return newCategories;
        })
    }

    function toggleOther(otherType: string) {
        setOthers(prevOthers => {
            let newOthers = [...prevOthers];
            if (newOthers.includes(otherType)) newOthers = newOthers.filter(other => other !== otherType);
            else newOthers.push(otherType);
            return newOthers;
        })
    }

    function resetAll() {
        setOrder(null);
        setCategories([]);
        setOthers([]);
        props.applyFilters({});
    }

    return (
        <div className="BookFilters">
            <section className="BookFilters__section">
                <h3>Ordenar por</h3>
                <div className="BookFilters__sub__section">
                    <Button
                        onClick={() => toggleOrder(OrderTypes.MOST_LIKED)}
                        type={order === OrderTypes.MOST_LIKED ? 'primary' : 'secondary'}
                    >
                        Melhores avaliados
                    </Button>
                    <Button
                        onClick={() => toggleOrder(OrderTypes.ALPHABETICAL)}
                        type={order === OrderTypes.ALPHABETICAL ? 'primary' : 'secondary'}
                    >
                        Ordem alfabética
                    </Button>
                </div>
            </section>
            <section className="BookFilters__section">
                <h3>Filtrar por</h3>
                {props.categories.length > 0 && (
                    <div className="BookFilters__sub__section">
                        <h4>Categorias</h4>
                        <div>
                            {props.categories.map(category =>
                                <Button
                                    key={category}
                                    onClick={() => toggleCategories(category)}
                                    type={categories.includes(category) ? 'primary' : 'secondary'}
                                >
                                    {category}
                                </Button>)}
                        </div>
                    </div>
                )}
                <div className="BookFilters__sub__section">
                    <h4>Outros</h4>
                    <div>
                        <Button
                            onClick={() => toggleOther(OtherFilterTypes.IN_STOCK)}
                            type={others.includes(OtherFilterTypes.IN_STOCK) ? 'primary' : 'secondary'}
                        >
                            Em estoque
                        </Button>
                        <Button
                            onClick={() => toggleOther(OtherFilterTypes.LIKED)}
                            type={others.includes(OtherFilterTypes.LIKED) ? 'primary' : 'secondary'}
                        >
                            Curtidos por você
                        </Button>
                    </div>
                </div>
            </section>
            <section className="BookFilters__buttons_container">
                <Button onClick={resetAll}>Resetar</Button>
                <Button onClick={applyFilters} type="primary">Aplicar</Button>
            </section>
        </div>
    )
}