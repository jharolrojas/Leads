const { User } = require('./user.model');
const { IdentificationType } = require('./identificationType.model');
const { Lead } = require('./lead.model');
const { Service } = require('./service.model');
const { UserRole } = require('./userRole.model');

const initModels = () => {


     // 1 <-> M
     UserRole.hasMany(User,{foreignKey:"userRoleId"});
     User.belongsTo(UserRole);
  
     IdentificationType.hasMany(User,{foreignKey: "identificationTypeId"});
     User.belongsTo(IdentificationType);

     Service.hasMany(Lead ,{foreignKey: "serviceId"});
     Lead.belongsTo(Service);

     User.hasMany(Lead ,{foreignKey: "userId"});
     Lead.belongsTo(User);


};

module.exports = { initModels };
