//Render individual station
import Station from "../interfaces/station_interface";
import "./component_styles/stationcard.css";
import { useParams, useNavigate } from "react-router-dom";

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
    <tr className="station" onClick={handleClick}>
      <td className="">{props.station.nameFi}</td>
      <td className="">
        {props.station.address}
      </td>
      <td>{props.station.city}</td>
      <td>{props.station.capacity}</td>
    </tr>
  );
};

export default StationCard;
