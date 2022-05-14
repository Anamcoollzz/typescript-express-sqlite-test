import { hashPassword } from "./../helpers/stringhelper";
import User from "../models/user";

const userSeeder = () => {
  // const options = { force: true };
  const options = {};
  User.sync(options).then(async () => {
    User.findOne({ where: { email: "hairulanamadmin@gmail.com" } }).then(async (user) => {
      if (!user) {
        await User.create({
          email: "hairulanamadmin@gmail.com",
          name: "Hairul Anam Admin",
          password: await hashPassword("123456"),
          role: "admin",
          //   id: 1,
        });
      }
    });

    User.findOne({ where: { email: "hairulanamcustomer@gmail.com" } }).then(async (user) => {
      if (!user) {
        await User.create({
          email: "hairulanamcustomer@gmail.com",
          name: "Hairul Anam Customer",
          password: await hashPassword("123456"),
          role: "customer",
          //   id: 1,
        });
      }
    });
  });
};

export default userSeeder;
