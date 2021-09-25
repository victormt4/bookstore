import Icon from "../../../components/icon/Icon";
import './OutOfStockOverlay.css';

export default function OutOfStockOverlay() {
    return (
        <div className="OutOfStockOverlay">
            <span className="OutOfStockOverlay__message">
                <Icon type="inventory_2"/> Fora de estoque
            </span>
        </div>
    )
}