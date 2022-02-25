let Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    let users = sequelize.define(
        'users',
        {
            id: {
                type: DataTypes.UUID,
                field: 'id',
                primaryKey: true,
                allowNull: false,
                defaultValue: DataTypes.UUIDV1
            },
            firstName: {
                type: DataTypes.STRING,
                field: 'first_name'
            },
            lastName: {
                type: DataTypes.STRING,
                field: 'last_name'
            },
            password: DataTypes.STRING(600),
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            status: DataTypes.BOOLEAN,
            cellPhone: {
                type: DataTypes.STRING,
                field: 'cell_phone'
            },
            address: {
                type: DataTypes.STRING,
                field: 'address'
            },
            city: {
                type: DataTypes.STRING,
                field: 'city'
            },
            state: {
                type: DataTypes.STRING,
                field: 'state'
            },
            country: {
                type: DataTypes.STRING,
                field: 'country'
            },
            pinCode: {
                type: DataTypes.STRING,
                field: 'pin_code'
            },
            createdBy: {
                type: DataTypes.UUID,
                field: 'created_by'
            },
            updatedBy: {
                type: DataTypes.UUID,
                field: 'updated_by'
            },
            profilePic: {
                type: DataTypes.STRING,
                field: 'profile_pic'
            },
            verificationStatus: {
                type: DataTypes.BOOLEAN,
                field: 'verification_status'
            },
            currentStatus: {
                type: DataTypes.STRING,
                field: 'current_status'
            },
        },
        {
            associate: function (models) {
                
            }
        }
    );
    return users;
};
