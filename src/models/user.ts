import { DataTypes, Model } from "sequelize";
import sequelize from "./connection";

export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  role?: string;
}

class User extends Model<IUser> {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

const dataTypes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    // allowNull defaults to true
  },
  name: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING,
  },
};
User.init(dataTypes, {
  sequelize,
  modelName: "User",
});

export default User;
