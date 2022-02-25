'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
      return queryInterface.createTable('users',
            {
                id: {
                    type: Sequelize.UUID,
                    field: 'id',
                    primaryKey: true,
                    allowNull: false,
                    defaultValue: Sequelize.UUIDV1
                },
                firstName: {
                    type: Sequelize.STRING,
                    field: 'first_name'
                },
                lastName: {
                    type: Sequelize.STRING,
                    field: 'last_name'
                },
                password: Sequelize.STRING,
                email: {
                    type: Sequelize.STRING,
                    unique: true,
                    allowNull: false
                },
                status: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false
                },
                cellPhone: {
                    type: Sequelize.STRING,
                    field: 'cell_phone'
                },
                address: {
                  type: Sequelize.STRING,
                  field: 'address'
                },
                city: {
                  type: Sequelize.STRING,
                  field: 'city'
                },
                state: {
                  type: Sequelize.STRING,
                  field: 'state'
                },
                country: {
                  type: Sequelize.STRING,
                  field: 'country'
                },
                pinCode: {
                  type: Sequelize.STRING,
                  field: 'pin_code'
                },
                createdBy: {
                    type:Sequelize.UUID,
                    field: 'created_by'
                },
                updatedBy: {
                    type:Sequelize.UUID,
                    field: 'updated_by'
                },
                profilePic: {
                    type: Sequelize.STRING,
                    field: 'profile_pic'
                },
                createdAt: {
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
                },
                verificationStatus: {
                    type:Sequelize.BOOLEAN,
                    field: 'verification_status'
                },
                currentStatus: {
                    type:Sequelize.STRING,
                    field: 'current_status'
                },
            })
    },

    down: function (queryInterface, Sequelize) {
      return queryInterface.dropTable('users');
    }
};
