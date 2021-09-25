import {useEffect, useState} from "react";
import OrderTypes from "../../../../services/bookFilter/types/OrderTypes";
import OtherFilterTypes from "../../../../services/bookFilter/types/OtherFilterTypes";
import Button from "../../../../components/button/Button";
import "./BookFilters.css";

export default function BookFilters(props) {

    const [order, setOrder] = useState(null);
    const [categories, setCategories] = useState([]);
    const [others, setOthers] = useState([]);

    //Efeito que carrega os filtros padrão
    useEffect(() => {
        const defaultFilters = props.defaultFilters;
        if (defaultFilters.order) setOrder(defaultFilters.order);
        if (Array.isArray(defaultFilters.categories) && defaultFilters.categories.length) setCategories(defaultFilters.categories);
        if (Array.isArray(defaultFilters.others) && defaultFilters.others.length) setOthers(defaultFilters.others);
    }, [props.defaultFilters])

    function applyFilters() {

        let filters = {};

        filters.order = order;
        filters.categories = categories;
        filters.others = others;
        filters.pageNumber = 1;

        props.applyFilters(filters);
    }

    /**
     * Remove ou adiciona uma ordenação
     * @param {String} orderType
     */
    function toggleOrder(orderType) {
        if (orderType === order) setOrder(null);
        else setOrder(orderType);
    }

    /**
     * Remove ou adiciona uma categoria na filtragem
     * @param {String} categoryType
     */
    function toggleCategories(categoryType) {
        setCategories(prevCategories => {

            let newCategories = [...prevCategories];

            //Adicionando ou removendo a categoria das categorias selecionadas
            if (newCategories.includes(categoryType)) {
                newCategories = newCategories.filter(category => category !== categoryType);
            } else {
                newCategories.push(categoryType);
            }

            return newCategories;
        })
    }

    /**
     * Remove ou adiciona um filtro geral na filtragem
     * @param {String} otherType
     */
    function toggleOther(otherType) {
        setOthers(prevOthers => {

            let newOthers = [...prevOthers];

            //Adicionando ou removendo a categoria das categorias selecionadas
            if (newOthers.includes(otherType)) {
                newOthers = newOthers.filter(other => other !== otherType);
            } else {
                newOthers.push(otherType);
            }

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