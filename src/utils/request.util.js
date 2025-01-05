import axios from "axios";

export function getAppUrl() {
  // return 'https://allindiaexam.azurewebsites.net/api/v1';
  return 'http://localhost:3001/api/v1';
} 

export function post(url, data, headers, onComplete, onFailure) {
  const token = localStorage.getItem("token");
  const options = {};
  !headers && (headers = {});
  headers && (options["headers"] = headers);
  options["headers"].Authorization = token;
  axios
    .post(url, data, options)
    .then(function (response) {
      onComplete(response);
    })
    .catch(function (error) {
      onFailure(error);
    });
}

export function get(url, headers, onComplete, onFailure) {
  const token = localStorage.getItem("token");
  const options = {};
  !headers && (headers = {});
  headers && (options["headers"] = headers);
  options["headers"].Authorization = token;
  axios
    .get(url, options)
    .then(function (response) {
      onComplete(response);
    })
    .catch(function (error) {
      onFailure(error);
    });
}

export function patch(url, data, headers, onComplete, onFailure) {
  const token = localStorage.getItem("token");
  const options = {};
  !headers && (headers = {});
  headers && (options["headers"] = headers);
  options["headers"].Authorization = token;
  axios
    .patch(url, data, options)
    .then(function (response) {
      onComplete(response);
    })
    .catch(function (error) {
      onFailure(error);
    });
}