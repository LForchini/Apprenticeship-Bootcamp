import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize("database", "username", "password", {
  dialect: "sqlite",
  storage: "./restaurants2.sqlite",
  models: [__dirname + "/models/**/*.model.ts"],
  modelMatch: (filename, member) => {
    return (
      filename.substring(0, filename.indexOf(".model")) === member.toLowerCase()
    );
  },
});

export { sequelize };
