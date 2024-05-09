import axios from "axios";
import Jsona from "jsona";

const jsona = new Jsona();

function get() {
  const options = {
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json"
    }
  };

  // return Vue.prototype.$http.get(`/me?include=roles`, options).then(response => {
  //   return {
  //     list: jsona.deserialize(response.data),
  //     meta: response.data.meta
  //   };
  // });
}

function update(profile) {
  const payload = jsona.serialize({
    stuff: profile,
    includeNames: []
  });

  const options = {
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json"
    }
  };

  return axios
    .patch(`${url}/me?include=roles`, payload, options)
    .then(response => {
      return jsona.deserialize(response.data);
    });
}

export default {
  get,
  update
};
