import axios from "axios";

export function getAppUrl() {
  // return 'https://allindiaexam.azurewebsites.net/api/v1';
  return 'http://localhost:3001/api/v1';
} 

export function post(url, data, headers, onComplete, onFailure) {
  const options = {};
  headers && (options["headers"] = headers);
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
  const options = {};
  headers && (options["headers"] = headers);
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
  const options = {};
  headers && (options["headers"] = headers);
  axios
    .patch(url, data, options)
    .then(function (response) {
      onComplete(response);
    })
    .catch(function (error) {
      onFailure(error);
    });
}