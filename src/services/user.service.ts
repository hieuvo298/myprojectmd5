import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserRepository from "../repositories/user.repository";

class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(newUser:any): Promise<void> {
    await this.userRepository.register(newUser);
  }

  async updateUser(formUpdate: any, id: number): Promise<void> {
    await this.userRepository.updateUser(formUpdate, id);
  }

  async login(loginForm: any) {
    try {
      const checkEmail = await this.userRepository.getOneUserByEmail(
        loginForm.email
      );
      if (checkEmail?.dataValues) {
        const comparePassword = await bcrypt.compare(
          loginForm.password,
          checkEmail.dataValues.password
        );
        console.log(loginForm.password);
        console.log(checkEmail.dataValues);
        console.log(comparePassword);
        const { password, createdAt, updatedAt, ...restUser } =
          checkEmail.dataValues;
        const accessToken = jwt.sign(restUser, "daylascret");
        if (comparePassword) {
          return {
            data: restUser,
            accessToken,
          };
        } else {
          return 2;
        }
      } else {
        return 1;
      }
    } catch (error) {
      throw error;
    }
  }

  async getAll(): Promise<any[]> {
    return await this.userRepository.getAll();
  }

  async getUserById(id: number) {
    return await this.userRepository.getOneUserById(id);
  }
}

export default UserService;
