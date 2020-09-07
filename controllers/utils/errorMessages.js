const postError = 'An error occurred trying to add the new record.';
const putError = 'An error occurred trying to update the record.';
const deleteError = 'An error occurred trying to delete the record.';
const idError = '"_id" must be a string of 24 hex characters';
const activeError = 'The "active" field serves as a boolean and must be either 0 or 1.';
const dateError = 'The "date" must be a valid ISO 8601 date and in YYYY-MM-DD format.';
const usernameError = 'The "username" field must be from 6 to 15 characters in length.';
const passwordError = 'The "password" field must be from 6 to 20 characters in length.';
const nothingUpdatedError = 'No content was updated via the request.';

module.exports = {
    postError,
    putError,
    deleteError,
    idError,
    activeError,
    dateError,
    usernameError,
    passwordError,
    nothingUpdatedError,
};
