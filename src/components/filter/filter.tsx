import {connect} from "react-redux";
import {Operation} from "../../reducer";

const {filterOrders} = Operation;

interface Props {
  filterOrders: (filter: string) => void
}

interface State {
  value: string
}

class Filter extends React.PureComponent<Props, State> {
  constructor(props){
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({value: evt.target.value});
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.filterOrders(this.state.value)
  }

  render(){
    return <form action="" className="filter" onSubmit={this.handleSubmit}>
      <div className="filter__input-label">
        <label htmlFor="filter" className="filter__label">Фильтр:</label>
        <input name="filter" type="search" id="filter" className="filter__input" value={this.state.value} onChange={this.handleChange}/>
      </div>
    </form>
  }
}

const mapDispatchToProps = {
  filterOrders
};

export {Filter};

export default connect(null, mapDispatchToProps)(Filter);
