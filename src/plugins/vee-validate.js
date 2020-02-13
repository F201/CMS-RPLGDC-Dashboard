import { required, email, image, numeric } from "vee-validate/dist/rules";
import { extend } from "vee-validate";

/* eslint-disable */

extend("required", {
  ...required,
  message: "This field is required"
});

extend("url", {
  params: ['target'],
  validate(value) {
    return value.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/) 
  },
  message: "This field is not a valid url"
})

extend("numeric", {
  ...numeric,
  message: "This field may only contain numeric characters"
});

extend("image", {
  ...image,
  message: "This field must be an image"
});

extend("email", {
  ...email,
  message: "This field must be a valid email"
});