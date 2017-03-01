'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
        .then(() => {
            return queryInterface.createTable('Users',
            {
                "id": {
                    "type": "INTEGER",
                    "allowNull": false,
                    "primaryKey": true,
                    "autoIncrement": true
                },
                "username": {
                    "type": "VARCHAR(255)"
                },
                "email": {
                    "type": "VARCHAR(255)",
                    "allowNull": false,
                    "validate": {
                        "isEmail": true
                    }
                },
                "password_digest": {
                    "type": "VARCHAR(255)",
                    "validate": {
                        "notEmpty": true
                    }
                },
                "school": {
                    "type": "VARCHAR(255)"
                },
                "sex": {
                    "type": "TINYINT(1)",
                    "allowNull": false,
                    "defaultValue": false
                },
                "interestedIn": {
                    "type": "TINYINT(1)"
                },
                "isChatting": {
                    "type": "TINYINT(1)",
                    "allowNull": false,
                    "defaultValue": false
                },
                "createdAt": {
                    "type": "DATETIME",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": "DATETIME",
                    "allowNull": false
                },
                "SchoolId": {
                    "type": "INTEGER",
                    "allowNull": true,
                    "references": {
                        "model": "Schools",
                        "key": "id"
                    },
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE"
                },
                "UniversityId": {
                    "type": "INTEGER",
                    "allowNull": true,
                    "references": {
                        "model": "Universities",
                        "key": "id"
                    },
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE"
                }
            })
        })

        .then(() => {
            return queryInterface.addIndex(
                'Users',
                ['email']
                , {"indicesType":"UNIQUE"}
            )
        })
        .then(() => {
            return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
        .then(() => {
            return queryInterface.dropTable('Users');
        })
        .then(() => {
            return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        });
    }
};
