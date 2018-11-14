const products = (sequelize, DataTypes) => {
  return sequelize.define("accounts", {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  });
};

module.exports = products;
