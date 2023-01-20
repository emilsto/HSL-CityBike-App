//Render individual station
import Trip from "../interfaces/trip_interface";

interface Props {
  trip: Trip;
}

const StationCard = (props: Props) => {

  //trip duration to minutes
    const duration = props.trip.durationSec / 60;
    const durationMinutes = Math.floor(duration);
  //trip distance to km
    const distance = props.trip.distanceMeters / 1000;
    const distanceKm = distance.toFixed(1);

  return (
    <tr className="trip">
      <td className="">{props.trip.depStationName}</td>
      <td className="">{props.trip.retStationName}</td>
      <td>{distanceKm} km</td>
      <td>{durationMinutes} min</td>
    </tr>
  );
};

export default StationCard;