import React, {useEffect, useState} from "react";
import Button from "../button/Button";
import Icon from "../icon/Icon";
import './Pagination.css';

type PaginationProps = {
    initialPage: number,
    contentLength: number,
    pageLength: number,
    maxPageButtons: number,
    onSetPage: (page: number) => void
}

export default function Pagination(props: PaginationProps): React.ReactElement {

    const [currentPage, setCurrentPage] = useState<number>(props.initialPage);

    const contentLength = props.contentLength;
    const pageLength = props.pageLength;
    const pageCount = Math.ceil(contentLength / pageLength);
    const maxPageButtons = props.maxPageButtons;

    //Altere a página interna do component caso a página inicial seja alterada
    useEffect(() => {
        setCurrentPage(props.initialPage);
    }, [props.initialPage])

    useEffect(() => {
        props.onSetPage(currentPage);
    }, [currentPage])

    function nextPage() {
        if (currentPage < pageCount) setCurrentPage(currentPage + 1);
    }

    function prevPage() {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    }

    function itShouldShowPage(pageToShow: number): boolean {
        if (pageToShow === currentPage) return true;

        //Obtendo a quantidade de páginas a serem exibidas na esquerda e na direita da página atual
        let btnRange = Math.floor(maxPageButtons / 2);
        let btnRangeMin = currentPage - btnRange;
        let btnRangeMax = currentPage + btnRange;

        //Ajustando limites caso extrapolem
        if (btnRangeMin <= 0) btnRangeMax += (btnRangeMin * -1) + 1;
        if (btnRangeMax > pageCount) btnRangeMin -= (btnRangeMax - pageCount)

        //Se a página a ser exiba é maior que a página atual, cheque se ela é maior do que o limite mínimo
        if (pageToShow < currentPage) {
            return pageToShow >= btnRangeMin;
        }
        return pageToShow <= btnRangeMax
    }

    const pageButtons = [
        <Button onClick={prevPage} type="icon" key="prev_page"><Icon type="chevron_left"/></Button>
    ];

    //Gerando um botão para cada página disponível
    let i = 0
    do {
        const pageNumber = i + 1;
        i++;

        if (!itShouldShowPage(pageNumber)) continue;

        pageButtons.push(<Button
            onClick={() => setCurrentPage(pageNumber)}
            type={pageNumber === currentPage ? 'primary' : 'secondary'}
            key={pageNumber}>{pageNumber}
        </Button>);

    } while (i < pageCount);

    pageButtons.push(<Button onClick={nextPage} type="icon" key="next_page"><Icon type="navigate_next"/></Button>);

    return (
        <nav className="Pagination">{pageButtons}</nav>
    )
}