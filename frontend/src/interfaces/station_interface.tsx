//define interfaces for data from backend

export default interface Station {
  id: number;
  objId: string;
  name: string;
  nameFi: string;
  nameSe: string;
  address: string;
  addressFi: string;
  addressSe: string;
  city: string;
  capacity: number;
  latitude: number;
  longitude: number;
}
