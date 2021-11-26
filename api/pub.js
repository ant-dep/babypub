import axios from "axios";
import { config } from "../config";

export const getCoords = (address, zip) => {
  //requète ajax vers nominatim
  axios
    .get(
      `https://nominatim.openstreetmap.org/search?q=${address}&format=json&addressdetails=1&limit=1`
    )
    .then((response) => {
      // console.log(response.data[0]);
      return response.data[0];
    })
    .catch((error) => {
      console.log(error);
    });
};

export const savePub = (data) => {
  axios
    .post(`${config.api_url}/api/v1/pub/add`, data)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const getPubByUser = (user_id) => {
  axios
    .get(`${config.api_url}/api/v1/pub/${user_id}`)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const getOnePub = (id) => {
  axios
    .get(`${config.api_url}/api/v1/pub/${id}`)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const editOnePub = (data, id) => {
  axios
    .put(`${config.api_url}/api/v1/pubs/update/${id}`, data)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const deleteOnePub = (id) => {
  axios
    .delete(`${config.api_url}/api/v1/pubs/delete/${id}`)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const getPubWithFilters = (data) => {
  axios
    .post(`${config.api_url}/api/v1/pubs/filters`, data)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
