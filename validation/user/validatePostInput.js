const _ = require("lodash");
const validator = require("validator");
const { User } = require("../../models/User");

const validatePostInput = async data => {
  let errors = {};

  data.email = _.get(data, "email", "");
  data.password = _.get(data, "password", "");
  data.password2 = _.get(data, "password2", "");
  data.DOB = _.get(data, "DOB", "");
  data.userType = _.get(data, "userType", "");
  data.phone = _.get(data, "phone", "");
  //gom 2 truong hop undefined va rong ve lam 1 la` string rong~

  //email
  if (validator.isEmpty(data.email)) {
    errors.email = "email is required";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "email is invalid";
  } else {
    const user = await User.findOne({ email: data.email });
    if (user) errors.email = "email exists";
  }

  //password
  if (validator.isEmpty(data.password)) {
    errors.password = "password is required";
  } else if (!validator.isLength(data.password, { min: 8 })) {
    errors.password = "pass needs atleast 8 chars";
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = "confirm pass is required";
  } else if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "confirm pass must matched";
  }

  //DOB
  // if (validator.isEmpty(data.DOB)) {
  //   errors.DOB = "day of birth is required";
  // } else if (!_.isDate(data.DOB)) {
  //   errors.DOB = "invalid day of birth";
  // }

  //userType
  if (validator.isEmpty(data.userType)) {
    errors.userType = "userType is required";
  } else if (
    !validator.equals(data.userType, "driver") &&
    !validator.equals(data.userType, "passenger")
  ) {
    errors.userType = "invalid userType";
  }

  //phone
  if (validator.isEmpty(data.phone)) {
    errors.phone = "phone is required";
  } else if (validator.isLength(data.phone, { min: 10, max: 10 })) {
    errors.phone = "phone must be 10 digits";
  }

  return {
    isValid: _.isEmpty(errors),
    errors
  };
};

//data la 1 object

module.exports = {
  validatePostInput
};
