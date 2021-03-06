const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
  values: ['ADMIN_ROLE','USER_ROLE'],
  message: '{VALUE} no es un rol válido'
};

let Schema = mongoose.Schema;

let usuario = new Schema({
    nombre: {
      type: String,
      required: [true,'El nombre es obligatorio']
    },
    email: {
      type: String,
      unique: true,
      required: [true,'El email es obligatorio']
    },
    password: {
      type: String,
      required: [true,'La contraseña es obligatoria']
    },
    img: {
      type: String,
      required: false
    },
    role: {
      type: String,
      default: 'USER_ROLE',
      enum: rolesValidos
    },
    estado: {
      type: Boolean,
      default: true
    },
    google: {
      type: Boolean,
      default: false
    }

});

usuario.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;
  return userObject;
}

usuario.plugin(uniqueValidator,{ message: '{PATH}  debe ser único' } );


module.exports = mongoose.model('Usuario',usuario);
