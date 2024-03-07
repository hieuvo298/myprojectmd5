import Admin from "./admin.entity";
import Cart from "./payment.entity";
import Category from "./category.entity";
import Favorite from "./favorite.entity";
import Order from "./orderItem";
import Products from "./products.entity";
import RateAndComment from "./rate.entity";
import productSize from "./sizes.entity";
import User from "./user.entity";
import userInfo from "./userInfo.entity";
import Payment from "./payment.entity";
import orderItem from "./orderItem";

const createTable = () => {
  User.sync().then(() => {
    console.log("user created");
  });
  Category.sync().then(() => {
    console.log("category created");
  });
  Products.sync().then(() => {
    console.log("products created");
  });
  Admin.sync().then(() => {
    console.log("admin created");
  });
  userInfo.sync().then(() => {
    console.log("user info created");
  });
  Payment.sync().then(() => {
    console.log("Payment created");
  });
  orderItem.sync().then(() => {
    console.log("orderItem created");
  });
  productSize.sync().then(() => {
    console.log("product size created");
  });
  Favorite.sync().then(() => {
    console.log("favorite created");
  });
  RateAndComment.sync().then(() => {
    console.log("rate and comment created");
  });
};

export default createTable;
