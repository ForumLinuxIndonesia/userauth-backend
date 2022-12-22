import ow from 'ow';

const $registerValidation = ow.object.exactShape({
  firstName: ow.string.alphabetical.nonEmpty.minLength(3),
  lastName: ow.optional.string.alphabetical.nonEmpty.minLength(3),
  email: ow.string.nonEmpty.validate((value) => /^[^\\.\\s@:](?:[^\\s@:]*[^\\s@:\\.])?@[^\\.\\s@]+(?:\\.[^\\.\\s@]+)*$/.test(value)),
  username: ow.string.nonEmpty.minLength(5),
  password: ow.string.nonEmpty.alphabetical,
});

export default $registerValidation;
