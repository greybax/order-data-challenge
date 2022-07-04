import { useOrderContext }from './OrderContext'

const SearchInput = () => {
  const { ordersDispatch } = useOrderContext();

  return (
    <input
      autoFocus
      placeholder="Enter price in dollars"
      onChange={(e) => {
        ordersDispatch({type: 'search', payload: e.currentTarget.value})
      }}
    />
  );
};

export default SearchInput;