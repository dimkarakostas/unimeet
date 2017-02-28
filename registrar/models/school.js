'use strict';

module.exports = function(sequelize, DataTypes) {
    var School = sequelize.define("School", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        indexes: [
            {unique: true, fields: ['name']}
        ],
        classMethods: {
            associate: (models) => {
                School.belongsTo(models.University, {
                    onDelete: "CASCADE",
                    foreignkey: {
                        allowNull: false
                    }
                });
                School.hasMany(models.User);
            }
        }
    });

    return School;
};
