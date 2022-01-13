import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from "sequelize-typescript";
import Restaurant from "./Restaurant.model";

@Table
export default class Menu extends Model {
  @ForeignKey(() => Restaurant)
  @Column(DataType.INTEGER)
  restaurant_id: number = 0;
}
