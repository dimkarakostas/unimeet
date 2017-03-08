'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('Users', 'username')
        .then(() => {
            return queryInterface.removeColumn('Users', 'school')
            .then(() => {
                return queryInterface.removeColumn('Users', 'SchoolId');
            });
        });
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.addColumn('Users', 'username', Sequelize.STRING)
        .then(() => {
            return queryInterface.addColumn('Users', 'school', Sequelize.STRING)
            .then(() => {
                return queryInterface.addColumn('Users', 'SchoolId', Sequelize.INTEGER)
                .then(() => {
                    return queryInterface.sequelize.query('ALTER TABLE Users ADD CONSTRAINT user_school_id_fkey FOREIGN KEY (SchoolId) REFERENCES Schools (id) ON UPDATE CASCADE ON DELETE SET NULL;');
                });
            });
        });
    }
};
