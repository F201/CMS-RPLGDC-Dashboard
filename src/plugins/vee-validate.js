import { required, email, image, numeric } from "vee-validate/dist/rules";
import { extend } from "vee-validate";

extend("required", {
  ...required,
  message: "This field is required"
});

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