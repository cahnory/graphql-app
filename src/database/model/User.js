import Waterline from 'waterline';
import bcrypt from 'bcryptjs';

let SALT_WORK_FACTOR = 10;

export default Waterline.Collection.extend({

  // Define table
  identity: 'user',
  tableName: 'user',
  connection: 'mysql',

  // Define attributes
  attributes: {
    username: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    email: {
      type: 'email',
      required: true
    },

    verifyPassword: function (password) {
      console.log(password, this.password);
      bcrypt.compareSync(password, this.password);
    },
    changePassword: function(newPassword, cb){
      this.newPassword = newPassword;
      this.save((err, u) => cb(err,u));
    }
  },

  beforeCreate: function (attrs, cb) {
    bcrypt.hash(attrs.password, SALT_WORK_FACTOR, (err, hash) => {
      attrs.password = hash;
      return cb();    
    });
  },

  beforeUpdate: function (attrs, cb) {
    attrs.password = attrs.newPassword;
    if(attrs.newPassword){
      bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) {
          return cb(err);
        }

        bcrypt.hash(attrs.newPassword, salt, (err, crypted) => {
          if (!err) {
            delete attrs.newPassword;
            attrs.password = crypted;
          }

          return cb(err);
        });
      });
    } else {
      return cb();
    }
  }

});