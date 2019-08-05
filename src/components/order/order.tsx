import {connect} from "react-redux";
import {Operation} from "../../reducer";


import {OrderType} from "../../types";
import OrderPart from "../order-part/order-part"

const {getOrderContent} = Operation;

interface Props {
  data: OrderType
  getOrderContent: (id: number, cb: () => void) => void;
}

interface State {
  isActive: boolean
}

class Order extends React.PureComponent<Props, State>{
  constructor(props){
    super(props);

    this.state = {
      isActive: false
    };

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    const {
      data,
      getOrderContent} = this.props;

    getOrderContent(data.id,() => {
      this.setState({isActive: !this.state.isActive});
    });
  }

  render() {
    const {data} = this.props;

    return <div className="order">
      <div className="order__about">
        <button className={`order__toggle-view ${this.state.isActive ? `order__toggle-view--active` : ``}`} onClick={this.handleClick}/>
        <p className="order__doc-num"><b>Номер заказа:</b> {data.docNum}</p>
        <p className="order__doc-date"><b>Дата заказа:</b> {data.docDate}</p>
        <p className="order__description"><b>Описание:</b> {data.description}</p>
      </div>
      <ul className={`order__content-list ${this.state.isActive ? `order__content-list--visible` : ``}`}>
        {data.content.map((data, i) => {
          return <li key={i}>
            <OrderPart
              data={data}
            />
          </li>
        })}
      </ul>
    </div>
  }
}

const mapDispatchToProps = {
  getOrderContent
};

export {Order};

export default connect(null, mapDispatchToProps)(Order);
