import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/orm';
import { UserEntity } from '../entity/user.entity';
import { Provide } from '@midwayjs/decorator';

@Provide()
export class UserModel {
  //   @Inject()
  @InjectEntityModel(UserEntity)
  userRepo: Repository<UserEntity>;

  /**
   * 根据用户名和密码获取用户信息
   * @param username {String} 用户名
   * @param password {String} 用户密码
   */
  async getUserByUsernameAndPassword(username, password): Promise<UserEntity> {
    const findP = this.userRepo.findOne({
      where: { username: username, password: password },
    });

    const user = await this.userRepo.findOne({
      where: { username: username, password: password },
    });
    return user;
  }

  async add(username, password): Promise<boolean> {
    const addEn = await this.userRepo.create({
      username: username,
      password: password,
    });
    const result = await this.userRepo.insert(addEn);
    return true;
  }
}
