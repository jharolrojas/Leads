const { body, validationResult } = require("express-validator");

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err) => err.msg);

    const message = errorMessages.join(". ");
    return res.status(412).json({
      status: "Error",
      data: { message },
    });
  }

  next();
};

const createUserValidators = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),
  body("lastName")
    .isString()
    .withMessage("lastName must be a string")
    .notEmpty()
    .withMessage("lastName cannot be empty")
    .isLength({ min: 3 })
    .withMessage("lastName must be at least 3 characters"),
  body("identificationNumber")
    .isNumeric()
    .withMessage("lastName must be a string")
    .notEmpty()
    .withMessage("identificationNumber cannot be empty")
    .isLength({ min: 5 })
    .withMessage("identificationNumber must be at least 5 characters"),
  //   body("birthDate")
  //     .isDate()
  //     .withMessage("birthDate must be a date")
  //     .notEmpty()
  //     .withMessage("birthDate cannot be empty"),
  body("gender")
    .isBoolean()
    .withMessage("gender must be a boolean")
    .notEmpty()
    .withMessage("gender cannot be empty"),
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  body("status")
    .isBoolean()
    .withMessage("status must be a boolean")
    .notEmpty()
    .withMessage("status cannot be empty"),
  body("identificationTypeId")
    .isNumeric()
    .withMessage("identificationTypeId must be a number")
    .notEmpty()
    .withMessage("identificationTypeId cannot be empty"),
  body("userRoleId")
    .isNumeric()
    .withMessage("userRoleId must be a number")
    .notEmpty()
    .withMessage("userRoleId cannot be empty"),
  checkValidations,
];

const createIdentificationTypeValidators = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name cannot be empty"),

  checkValidations,
];

const createLeadValidators = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),
  body("lastName")
    .isString()
    .withMessage("lastName must be a string")
    .notEmpty()
    .withMessage("lastName cannot be empty")
    .isLength({ min: 3 })
    .withMessage("lastName must be at least 3 characters"),
  body("dni")
    .isNumeric()
    .withMessage("dni must be a number")
    .notEmpty()
    .withMessage("dni cannot be empty")
    .isLength({ min: 5 })
    .withMessage("dni must be at least 5 characters"),

  body("gender")
    .isBoolean()
    .withMessage("gender must be a boolean")
    .notEmpty()
    .withMessage("gender cannot be empty"),

  body("negotationStatus")
    .isBoolean()
    .withMessage("negotationStatus must be a boolean")
    .notEmpty()
    .withMessage("negotationStatus cannot be empty"),
  body("serviceId")
    .isNumeric()
    .withMessage("serviceId must be a number")
    .notEmpty()
    .withMessage("serviceId cannot be empty"),
  checkValidations,
];

const createServiceValidators = [
  body("description")
    .isString()
    .withMessage("description must be a string")
    .notEmpty()
    .withMessage("description cannot be empty"),
  checkValidations,
];
const createUseRoleValidators = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name cannot be empty"),

  checkValidations,
];

module.exports = {
  createUserValidators,
  createIdentificationTypeValidators,
  createLeadValidators,
  createServiceValidators,
  createUseRoleValidators,
};
