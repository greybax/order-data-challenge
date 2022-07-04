import React from 'react';

const OrderContext = React.createContext();

export function useOrderContext() {
  return React.useContext(OrderContext);
}

export default OrderContext;