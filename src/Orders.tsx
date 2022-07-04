import { useCallback, useEffect } from 'react';
import { useOrderContext } from './OrderContext'
import convertCentsToDollar from './utils';
import './Orders.css';

interface Order {
  customer: string;
  destination: string;
  event_name: string;
  id: string;
  item: string;
  price: number;
  sent_at_second: number;
}

const Orders = ({ socket }: any) => {
  const { ordersState, ordersDispatch } = useOrderContext();

  const orderListener = useCallback((order: Order[]) => {
    ordersDispatch({type: 'add', payload: order})
  }, [ordersDispatch]);

  useEffect(() => {
    socket.on('order_event', orderListener);

    return () => {
      socket.off('order_event', orderListener);
    };
  }, [socket, orderListener]);

  const orders = [...ordersState.data.values()];

  const filtered =  ordersState.search
    ? orders.filter(m => convertCentsToDollar(m.price) <= +ordersState.search) 
    : orders;

  return (
    <div className="order-list">
      {`${filtered.length || 0} / ${orders.length}`}

      <div
        key='order-container-header'
        className="order-container gray-bg"
      >
          <div className='item'>ID</div>
          <div className='item md'>Event Name</div>
          <div className='item'>Price ($)</div>
          <div className='item md'>Item</div>
          <div className='item md'>Customer</div>
          <div className='item big'>Destination</div>
        </div>
      {
        filtered
        .map((order: any) => (
        <div
          key={order.id}
          className="order-container"
        >
          <div className='item'>{order.id}</div>
          <div className='item md'>{order.event_name}</div>
          <div className='item'>{convertCentsToDollar(order.price)}</div>
          <div className='item md'>{order.item}</div>
          <div className='item md'>{order.customer}</div>
          <div className='item big'>{order.destination}</div>
        </div>
      ))
      }
    </div>
  );
}

export default Orders;