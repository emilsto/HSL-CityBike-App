//Render individual station
import Station from "../interfaces/station_interface";
import { useNavigate } from "react-router-dom";

interface Props {
  station: Station;
}

const StationCard = (props: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    //TODO: redirect to station page
    navigate("/stations/" + props.station.id);
  };

  return (
    <tr className="text-lg text-white cursor-pointer border-b hover:opacity-60" onClick={handleClick}>
      <td className="px-6 py-4">{props.station.nameFi}</td>
      <td className="px-6 py-4">{props.station.address}</td>
      <td className="px-6 py-4">{props.station.city}</td>
    </tr>
  );
};

export default StationCard;