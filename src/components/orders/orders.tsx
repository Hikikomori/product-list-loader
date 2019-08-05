import {connect} from "react-redux";
import {OrderType} from "../../types";
import Order from "../order/order"

interface Props {
  orders: Array<OrderType>
}

const Orders: React.FC<Props> = (props) => {
  const {orders} = props;

  return <ul className="orders">
    {orders.map((order, i) => {
      return <Order
        data = {order}
        key = {i}
      />
    })}
  </ul>
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  orders: state.orders
});

export {Orders};

export default connect(mapStateToProps, null)(Orders);
