'use strict';

module.exports = function(sequelize, DataTypes) {
    var University = sequelize.define("University", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        indexes: [
            {unique: true, fields: ['name']}
        ],
    });

    return University;
};
