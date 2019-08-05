import {OrderPartType} from "../../types";

interface Props {
  data: OrderPartType
}

const OrderPart:React.FC<Props> = (props) => {
  const {data} = props;

  return <div className="order-part">
    <p className="order-part__name"><b>Наименование:</b> {data.name}</p>
    <p className="order-part__qty"><b>Кол-во:</b> {data.qty}</p>
    <p className="order-part__price"><b>Цена:</b> {data.price}</p>
    <p className="order-part__sum"><b>Сумма:</b> {data.sum}</p>
  </div>
};


export default OrderPart
