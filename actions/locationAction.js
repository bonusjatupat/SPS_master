import config from "../misc/config";
import { calculateDistance } from "../misc/utils";

import axios from "axios";

export function fetchLocations(lat, long, keyword) {
  return dispatch => {
    dispatch({ type: "FETCH_LOCATION_PENDING" });
    var stores = [];
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?location=${lat},${long}&input=${keyword}&radius=5000&types=establishment&key=${
          config.GOOGLE_PLACE_API_KEY
        }`,
        null,
        null
      )
      .then(response => {
        const formatting = cb => {
          response.data.predictions.map((item, index) => {
            var store = {};
            store.id = index + 1;
            store.name = item.structured_formatting.main_text;
            store.address = item.structured_formatting.secondary_text;
            axios
              .get(
                `https://maps.googleapis.com/maps/api/place/details/json?input=bar&placeid=${
                  item.place_id
                }&key=${config.GOOGLE_PLACE_API_KEY}`,
                null,
                null
              )
              .then(response => {
                if (response.data) {
                  store.latitude = response.data.result.geometry.location.lat;
                  store.longitude = response.data.result.geometry.location.lng;
                  stores.push(store);
                }
              });
          });
          cb(stores);
        };
        formatting(result => {
          dispatch({ type: "FETCH_LOCATION_FULFILLED", payload: result });
        });
      })
      .catch(error => {
        dispatch({ type: "FETCH_LOCATION_REJECTED", payload: error });
      });
  };
}
