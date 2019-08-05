import {connect} from 'react-redux';
import {Operation} from '../../reducer';
import Filter from '../filter/filter'
import Orders from '../orders/orders'

const {init} = Operation;

interface Props {
  isApplicationReady: boolean
  init: () => void
}

class App extends React.PureComponent<Props> {
  constructor(props){
    super(props)
  }

  render(){
    const {isApplicationReady} = this.props;

    if (isApplicationReady) {
      return <>
        <h1 className="heading">Заказы</h1>
        <Filter/>
        <Orders/>
      </>;
    }

    return null;
  }

  componentDidMount() {
    const {
      isApplicationReady,
      init} = this.props;

    if (!isApplicationReady) {
      init();
    }
  }
}

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  isApplicationReady: state.isApplicationReady
});

const mapDispatchToProps = {
  init
};

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
