import axios from "axios";
import React from "react";
import Select from "react-select";
const options = [{ value: "abc", label: "xyz" }];
import "./style.scss";

export const AddressPicker = ({
  address,
  userInfo,
  setAddress,
  setUserInfo,
}: any) => {
  React.useEffect(() => {
    (async () =>
      setAddress({
        ...address,
        cities: await fecthLocations(FECTH_TYPES.city),
      }))();
  }, []);
  React.useEffect(() => {
    (async () =>
      setAddress({
        ...address,
        districts: await fecthLocations(
          FECTH_TYPES.district,
          address.city.value
        ),
      }))();
  }, [address.city]);
  React.useEffect(() => {
    (async () =>
      setAddress({
        ...address,
        wards: await fecthLocations(FECTH_TYPES.ward, address.district.value),
      }))();
  }, [address.district]);
  return (
    <div className="flex flex-col address-picker">
      <Select
        className="select"
        name="cityId"
        isDisabled={address.cities.length === 0}
        options={address.cities}
        onChange={(option) => {
          setAddress({ ...address, city: option });
        }}
        placeholder="Tỉnh/Thành"
        defaultValue={address.city}
      />

      <Select
        className="select"
        name="districtId"
        isDisabled={address.districts.length === 0}
        options={address.districts}
        onChange={(option) => {
          setAddress({ ...address, district: option });
        }}
        placeholder="Quận/Huyện"
        defaultValue={address.district}
      />

      <Select
        className="select"
        name="wardId"
        isDisabled={address.wards.length === 0}
        options={address.wards}
        placeholder="Phường/Xã"
        onChange={(option) => {
          setAddress({ ...address, ward: option });
        }}
        defaultValue={address.ward}
      />
      <input
        type="text"
        name=""
        id=""
        placeholder="Địa chỉ cụ thể"
        onChange={(e: any) => {
          setAddress({ ...address, detail: e.target.value });
        }}
      />
      <input
        type="text"
        name=""
        id=""
        placeholder="Tên"
        onChange={(e: any) => {
          setUserInfo({ ...userInfo, name: e.target.value });
        }}
      />
      <input
        type="text"
        name=""
        id=""
        placeholder="Số điện thoại"
        onChange={(e: any) => {
          setUserInfo({ ...userInfo, phone: e.target.value });
        }}
      />
    </div>
  );
};

export const PATHS = {
  CITIES:
    "https://raw.githubusercontent.com/nhidh99/codergamo/master/004-location-selects/locations/cities.json",
  DISTRICTS:
    "https://raw.githubusercontent.com/nhidh99/codergamo/master/004-location-selects/locations/districts",
  WARDS:
    "https://raw.githubusercontent.com/nhidh99/codergamo/master/004-location-selects/locations/wards",
  LOCATION:
    "https://raw.githubusercontent.com/nhidh99/codergamo/master/004-location-selects/locations/location.json",
};
export const fecthLocations = async (type: string, id?: any) => {
  let url = "";
  switch (type) {
    case FECTH_TYPES.city:
      url = PATHS.CITIES;
      break;
    case FECTH_TYPES.district:
      url = ` ${PATHS.DISTRICTS}/${id}.json`;
      break;
    case FECTH_TYPES.ward:
      url = ` ${PATHS.WARDS}/${id}.json`;
      break;
    default:
      break;
  }
  const locations = await axios.get(url);
  console.log("fecth", locations);
  return locations.data["data"]?.map((location: any) => {
    return {
      value: location.id,
      label: location.name,
    };
  });
};
export const FECTH_TYPES = {
  district: "district",
  city: "city",
  ward: "ward",
};
