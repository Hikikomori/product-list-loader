import {OrderType} from "./types";

const initialState = {
  orders: [],
  isApplicationReady: false
};

const ActionCreator = {
  saveOrders: (orders: []) => {
    return {
      type: `SAVE_ORDERS`,
      payload: orders,
    };
  },

  saveOrderContent: (content: [], id: number) => {
    return {
      type: `SAVE_ORDER_CONTENT`,
      payload: {
        content,
        id
      },
    };
  },

  setAppReadyFlag: (flag: boolean) => {
    return {
      type: `SET_APP_READY_FLAG`,
      payload: flag
    }
  }
};

const Operation = {
  loadOrders: (filter?: string) => (_dispatch, _getState, api) => {
    if (filter) {
      return api.get(`/order?filter=${filter}`)
        .then((response) => {
          return response.data;
        });
    }

    return api.get(`/order`)
      .then((response) => {
        return response.data;
      });
  },

  loadOrderContent: (id: number) => (_dispatch, _getState, api) => {
    return api.get(`/order/${id}`)
      .then((response) => {
        return response.data;
      });
  },

  filterOrders: (filter: string) => (dispatch) => {
    dispatch(Operation.loadOrders(filter))
      .then (
        (orders) => {
          dispatch(ActionCreator.saveOrders(orders));
        }
      )
  },

  getOrderContent: (id: number, cb: () => void) => (dispatch, getState) => {
    if(!getState().orders.find((order) => {
      return order.id === id
    }).content.length){
      dispatch(Operation.loadOrderContent(id))
        .then (
          (content) => {
            dispatch(ActionCreator.saveOrderContent(content, id));
            cb();
          }
        )
    } else {
      cb();
    }
  },

  init: () => (dispatch) => {
    dispatch(Operation.loadOrders())
      .then (
        (orders) => {
          dispatch(ActionCreator.saveOrders(orders));
          dispatch(ActionCreator.setAppReadyFlag(true));
        }
      )
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `SAVE_ORDERS`: return Object.assign({}, state, {
      orders: action.payload.map((order: OrderType) => {
        order.content = [];
        return order;
      })
    });

    case `SAVE_ORDER_CONTENT`: return Object.assign({}, state, {
      orders: state.orders.map((it) => {
        if (it.id === action.payload.id) {
          it.content = action.payload.content
        }

        return it;
      })
    });

    case `SET_APP_READY_FLAG`: return Object.assign({}, state, {
      isApplicationReady: action.payload
    });
  }

  return state;
};

export {
  ActionCreator,
  Operation,
  reducer
};
