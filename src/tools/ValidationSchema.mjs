export const CreateUserValidationShema = {
  name: {
    notEmpty: {
      errorMessage: "name cannot be empty !!",
    },
    isLength: {
      options: {
        min: 3,
        max: 11,
      },
      errorMessage: "name must be between 3 and 11 caracters",
    },
    isString: {
      errorMessage: "name must be a string",
    },
  },
};
