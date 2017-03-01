'use strict';

module.exports = function(sequelize, DataTypes) {
    var Realtime = sequelize.define("Realtime", {
        hostname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true
            }
        },
        ipv4: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIPv4: true
            }
        },
        port: DataTypes.INTEGER,
    }, {
        indexes: [
            {unique: true, fields: ['hostname']}
        ],
    });

    return Realtime;
};
