import { where } from "sequelize";
import User from "../entities/user.entity";
import userInfo from "../entities/userInfo.entity";

class UserRepository {

    async register(newUser: any) {
        await User.create(newUser)
    }

    async updateUser(formUpdate: any, id: number) {
        await User.update(formUpdate, { where: { id } })
    }

    async getOneUserByEmail(param?: any) {
        return await User.findOne({
            where: {
                email: param
            }
        })
    }

    async getAll() {
        return await User.findAll(
            {where:{role:1}}
        )
    }

    async getOneUserById(id: number) {
      return await User.findOne({
        where:{id},
        include: {
            model:userInfo
        }
      });
    }
}

export default UserRepository