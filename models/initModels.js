const { User } = require('./user.model');
const { IdentificationType } = require('./identificationType.model');
const { Lead } = require('./lead.model');
const { Service } = require('./service.model');
const { UseRole } = require('./useRole.model');

const initModels = () => {


     // 1 <-> M
     UseRole.hasMany(User);
     User.belongsTo(UseRole);
  
     IdentificationType.hasMany(User);
     User.belongsTo(IdentificationType);

     Service.hasMany(Lead);
     Lead.belongsTo(Service);

     User.hasMany(Lead);
     Lead.belongsTo(User);


};

module.exports = { initModels };
