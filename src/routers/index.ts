import { Express } from "express"
import usersController from "../controllers/user.controller"
import productController from "../controllers/product.controller"
import orderItemController from "../controllers/orderItem.controller"
import paymentController from "../controllers/payment.controller"
import ratingController from "../controllers/rating.controller"
import favoriteController from "../controllers/favorite.controller"


const myRouter = (app: Express) => {
    app.use('/users', usersController)
    app.use('/products',productController)
    app.use('/order',orderItemController)
    app.use('/payment',paymentController)
    app.use('/rating',ratingController)
    app.use('/favorites',favoriteController)
}
 
export default myRouter