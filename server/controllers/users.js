import validate from '../helpers/validate';
import helpers from '../helpers';
import connection from '../database/connection';

class userController {
  static signup(request, response) {
    if (
      !request.body.firstName ||
      !request.body.lastName ||
      !request.body.email ||
      !request.body.password ||
      !request.body.confirmPassword
    ) {
      return response.status(400).json({
        status: 400,
        error: 'Ensure all fields are provided'
      });
    }

    const { value, error } = validate.signup(request.body);
    if (error) {
      return response.status(400).json({
        status: 400,
        error: 'Invalid input, ensure input values are/is correct'
      });
    }

    if (value.password !== value.confirmPassword) {
      return response.status(400).json({
        status: 400,
        error: 'Passwords do not match'
      });
    }

    const hashedPassword = helpers.encryptPassword(value.password);

    value.password = hashedPassword;

    const newUser = {
      email: value.email.toLowerCase(),
      firstName: value.firstName.toLowerCase(),
      lastName: value.lastName.toLowerCase(),
      password: hashedPassword
    };

    const query = `INSERT INTO users ("email", "firstName", "lastName", "password", "type", "isAdmin")
    VALUES('${newUser.email}','${newUser.firstName}','${newUser.lastName}','${newUser.password}', 'customer', 'false') returning * `;
    return connection
      .query(query)
      .then(result => {
        if (result.rowCount >= 1) {
          return response
            .status(201)
            .send({ status: 201, message: 'Sign up was successful' });
        }

        return response
          .status(500)
          .send({ staus: 500, message: 'Unable to signup user' });
      })
      .catch(error => {
        if (error.routine === '_bt_check_unique') {
          return response.status(400).send({
            status: 409,
            message: 'User with this Email already exist'
          });
        }
        return response.status(500).send({
          status: 500,
          message:
            'Error creating account, ensure you provide valid credentials'
        });
      });
  }
}

export default userController;
