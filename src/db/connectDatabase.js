import sequelize from "./sequelize.js";

const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Successfully connect database");
    // await Category.sync({ alter: true });
    //     await Contact.sync({ alter: true });
  } catch (error) {
    console.log(`Error connect database: ${error.message}`);
    throw error;
  }
};

export default connectDatabase;
