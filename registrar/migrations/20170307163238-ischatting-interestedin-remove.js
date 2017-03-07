'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.removeColumn('Users', 'isChatting')
        .then(() => {
            return queryInterface.removeColumn('Users', 'interestedIn')
        });
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.addColumn('Users', 'isChatting', {type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false})
        .then(() => {
            return queryInterface.addColumn('Users', 'interestedIn', {type: Sequelize.BOOLEAN})
        });
    }
};
