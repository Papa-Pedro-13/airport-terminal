import React, { useEffect, useState } from 'react';
import { getFlights } from '../api';
import FlightsTable from './FlightsTable';

interface FlightsProps {
  token: string;
}

const Flights: React.FC<FlightsProps> = ({ token }) => {
  const [flights, setFlights] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    limit: 100,
    offset: 0,
    count: 0,
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchFlights = async (offset: number = 0) => {
    setIsLoading(true);
    try {
      const data = await getFlights(token, pagination.limit, offset);
      setFlights(data.data);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching flights:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    fetchFlights();
  }, [token]);

  // Обработчики для пагинации
  const handleNext = () => {
    if (pagination.offset + pagination.limit < pagination.total) {
      fetchFlights(pagination.offset + pagination.limit);
    }
  };

  const handlePrevious = () => {
    if (pagination.offset - pagination.limit >= 0) {
      fetchFlights(pagination.offset - pagination.limit);
    }
  };

  if (isLoading) return <div>Loading flights...</div>;

  return (
    <div>
      <h2>Flights from Saint Petersburg</h2>
      <FlightsTable flights={flights} />
      <div className='pagination'>
        <button
          onClick={handlePrevious}
          disabled={pagination.offset === 0}
        >
          Previous
        </button>
        <span>
          Page {Math.floor(pagination.offset / pagination.limit) + 1} of{' '}
          {Math.ceil(pagination.total / pagination.limit)}
        </span>
        <button
          onClick={handleNext}
          disabled={pagination.offset + pagination.limit >= pagination.total}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Flights;
