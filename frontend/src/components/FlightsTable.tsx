import { Daum } from '../types';

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  // Извлекаем компоненты даты
  const day = String(date.getDate()).padStart(2, '0'); // День (двузначное число)
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяц (двузначное число)
  const year = date.getFullYear(); // Год
  const hours = String(date.getHours()).padStart(2, '0'); // Часы (двузначное число)
  const minutes = String(date.getMinutes()).padStart(2, '0'); // Минуты (двузначное число)

  // Форматируем в DD.MM.YYYY hh:mm
  return `${day}.${month}.${year} ${hours}:${minutes}`;
};

const FlightsTable: React.FC<{ flights: Daum[] }> = ({ flights }) => {
  return (
    <div className='flights-table'>
      <h2>Flight List</h2>
      <table>
        <thead>
          <tr>
            <th>Flight Number</th>
            <th>Airline</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Status</th>
            <th>Scheduled Departure</th>
            <th>Scheduled Arrival</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight, index) => (
            <tr key={index}>
              <td>{flight.flight.number}</td>
              <td>{flight.airline.name}</td>
              <td>
                {flight.departure.airport} ({flight.departure.iata})
              </td>
              <td>
                {flight.arrival.airport} ({flight.arrival.iata})
              </td>
              <td>{flight.flight_status}</td>
              <td>{formatDate(flight.departure.scheduled)}</td>
              <td>{formatDate(flight.arrival.scheduled)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default FlightsTable;
