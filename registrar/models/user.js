'use strict';

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
    }, {
        indexes: [
            {unique: true, fields: ['email']}
        ],
    });
    });

    return User;
};
