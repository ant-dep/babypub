import axios from "axios";
import { config } from "../config";

export const getCoords = (address, zip) => {
  //requète ajax vers nominatim https://nominatim.openstreetmap.org/search?q='+address+' '+zip+'&format=geocodejson
  return axios
    .get(
      "https://nominatim.openstreetmap.org/search?q=" +
        address +
        " " +
        zip +
        "&format=geocodejson"
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getPubs = () => {
  return axios
    .get(config.api_url + "/api/v1/pubs")
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const savePub = (data) => {
  return axios
    .post(`${config.api_url}/api/v1/pubs/add`, data)
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
  return axios
    .get(`${config.api_url}/api/v1/pubs/${user_id}`)
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
  return axios
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
  return axios
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
  return axios
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

export const getPubsWithFilters = (data) => {
  return axios
    .get(`${config.api_url}/api/v1/pubs/filters`, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};
