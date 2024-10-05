import axios from "axios";

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
