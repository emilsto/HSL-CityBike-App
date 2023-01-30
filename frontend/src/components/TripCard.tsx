//Render individual station
import Trip from "../interfaces/trip_interface";

interface Props {
  trip: Trip;
}

const StationCard = (props: Props) => {
  //trip duration to minutes
  const duration = props.trip.durationSec / 60;
  const durationMinutes = duration.toFixed(1);
  //trip distance to km
  const distance = props.trip.distanceMeters / 1000;
  const distanceKm = distance.toFixed(1);

  return (
    <tr className="text-lg text-white border-b hover:opacity-60">
      <td className="px-6 py-4">{props.trip.depStationName}</td>
      <td className="px-6 py-4">{props.trip.retStationName}</td>
      <td className="px-6 py-4">{distanceKm} km</td>
      <td className="px-6 py-4">{durationMinutes} min</td>
    </tr>
  );
};

export default StationCard;
