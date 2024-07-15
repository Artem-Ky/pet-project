import { Profile, ValidateProfileError } from '../../types/profile';

export const validateProfileData = (profile?: Profile) => {
    if (!profile) {
        return [ValidateProfileError.NO_DATA];
    }
    const {
        first, lastname, username, currency,
    } = profile;

    const errors: ValidateProfileError[] = [];

    if (!first || !lastname) {
        errors.push(ValidateProfileError.INCORRECT_USER_DATA);
    }

    if (!username) {
        errors.push(ValidateProfileError.INCORRECT_USERNAME);
    }

    if (!currency) {
        errors.push(ValidateProfileError.INCORRECT_CURRENCY);
    }

    return errors;
};
