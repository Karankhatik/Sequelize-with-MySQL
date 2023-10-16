const { Sequelize, DataTypes, Model } = require("sequelize");

// Passing parameters separately (other dialects)
const sequelize = new Sequelize("employee", "root", "asdf", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
  port: 3306,
});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
}

const db = {};
db.Sequelize=Sequelize;
db.sequelize = sequelize;

db.user = require('./user')(sequelize, DataTypes, Model)
db.contact =  require('./contacts')(sequelize, DataTypes);

// db.user.hasOne(db.contact, { foreignKey:'user_id', as: 'contactDetails'});

// db.user.hasMany(db.contact, { foreignKey:'user_id', as: 'contactDetails'});
// db.contact.belongsTo(db.user, { foreignKey:'user_id', as: 'userDetails'});

db.user.belongsToMany(db.contact, { through: 'user_contact' });
db.contact.belongsToMany(db.user, { through: 'user_contact' });

db.sequelize.sync({force:false});

module.exports = db;
