//Render individual station
import Station from "../interfaces/station_interface";
import "./component_styles/stationcard.css";

interface Props {
  station: Station;
}

const StationCard = (props: Props) => {
  const handleClick = () => {
    console.log("clicked");
  };

  return (
    <div className="station">
      <div className="station-name">{props.station.name}</div>
      <div className="station-address">
        {props.station.address}, {props.station.city} <br />
        {props.station.addressSe}, {props.station.city}
      </div>
    </div>
  );
};

export default StationCard;
