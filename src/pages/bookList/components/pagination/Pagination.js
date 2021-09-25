import {useEffect, useState} from "react";
import Button from "../../../../components/button/Button";
import Icon from "../../../../components/icon/Icon";
import './Pagination.css';

export default function Pagination(props) {

    const [page, setPage] = useState(props.initialPage);

    const contentLength = props.contentLength;
    const pageLength = props.pageLength;
    const pageCount = Math.floor(contentLength / pageLength);
    const maxPageButtons = props.maxPageButtons;

    //Altere a página interna do component caso a página inicial seja alterada
    useEffect(() => {
        setPage(props.initialPage);
    }, [props.initialPage])

    useEffect(() => {
        props.onSetPage(page);
    }, [page])

    const pageButtons = [
        <Button onClick={prevPage} type="icon" key="prev_page"><Icon type="chevron_left"/></Button>
    ];

    //Calcula se o botão da página deve ser exibido na paginação
    function calcButtonShow(pageToShow) {

        if (pageToShow === page) return true;

        //Obtendo a quantidade de páginas a serem exibidas na esquerda e na direita da página atual
        let btnRange = Math.floor(maxPageButtons / 2);
        let btnRangeMin = page - btnRange;
        let btnRangeMax = page + btnRange;

        //Ajustando limites caso extrapolem
        if (btnRangeMin <= 0) btnRangeMax += (btnRangeMin * -1) + 1;
        if (btnRangeMax > pageCount)  btnRangeMin -= (btnRangeMax - pageCount)

        //Se a página a ser exiba é maior que a página atual, cheque se ela é maior do que o limite mínimo
        if (pageToShow < page) {
            return pageToShow >= btnRangeMin;
        }
        return pageToShow <= btnRangeMax
    }

    //Gerando um botão para cada página disponível
    let i = 0
    do {
        const pageNumber = i + 1;
        i++;

        if (!calcButtonShow(pageNumber)) continue;

        pageButtons.push(<Button
            onClick={() => setPage(pageNumber)}
            type={pageNumber === page ? 'primary' : 'secondary'}
            key={pageNumber}>{pageNumber}
        </Button>);

    } while (i < pageCount);

    pageButtons.push(<Button onClick={nextPage} type="icon" key="next_page"><Icon type="navigate_next"/></Button>);

    function nextPage() {
        if (page < pageCount) setPage(page + 1);
    }

    function prevPage() {
        if (page > 1) setPage(page - 1);
    }

    return (
        <nav className="Pagination">{pageButtons}</nav>
    )
}