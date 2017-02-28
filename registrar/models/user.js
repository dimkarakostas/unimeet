'use strict';

var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password_digest: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: DataTypes.VIRTUAL,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        password_confirmation: {
            type: DataTypes.VIRTUAL
        },
        school: DataTypes.STRING,
        university: DataTypes.STRING,
        }
    }, {
        indexes: [
            {unique: true, fields: ['email']}
        ],
        instanceMethods: {
            authenticate: function(value) {
                if (bcrypt.compareSync(value, this.password_digest))
                    return this;
                else
                    return false;
            }
        }
    });

    const hasSecurePassword = (user, options, callback) => {
        if (user.password != user.password_confirmation) {
            throw new sequelize.ValidationError("Password confirmation: Password confirmation doesn't match Password");
        }
        if (user.password.length < 6) {
            throw new sequelize.ValidationError("Password should be at least 6 characters");
        }
        bcrypt.hash(user.get('password'), 10, function(err, hash) {
            if (err) return callback(err);
            user.set('password_digest', hash);
            return callback(null, options);
        });
    };

    User.beforeCreate(function(user, options, callback) {
        user.email = user.email.toLowerCase();
        if (user.password)
            hasSecurePassword(user, options, callback);
        else
            return callback(null, options);
    });

    User.beforeUpdate(function(user, options, callback) {
        user.email = user.email.toLowerCase();
        if (user.password)
            hasSecurePassword(user, options, callback);
        else
            return callback(null, options);
    });

    return User;
};
