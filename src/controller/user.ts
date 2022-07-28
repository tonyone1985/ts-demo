import { UserLoginDTO } from '../dto/user.dto';
import { UserModel } from '../model/user.model';

import { JwtService } from '@midwayjs/jwt';
// src/api/index.ts

import { ALL, Body, Controller, Inject, Post } from '@midwayjs/decorator';
import { Validate } from '@midwayjs/validate';
// import { useEntityModel } from '@midwayjs/orm';

@Controller('/')
export class HomeController {
  @Inject()
  userModel: UserModel;
  @Inject()
  jwt: JwtService;

  @Validate()
  @Post('/login')
  async login(@Body(ALL) req: UserLoginDTO): Promise<object> {
    const usr = await this.userModel.getUserByUsernameAndPassword(
      req.username,
      req.password
    );
    if (usr != null) {
      const token = await this.jwt.sign({
        username: usr.username,
        expire: new Date().getTime() + 3600000 * 12,
        id: usr.id,
      });
      return this.success({ token: token }, '登录成功');
    } else {
      return this.error('账号或密码不正确');
    }
  }

  @Validate()
  @Post('/add')
  async add(@Body(ALL) req: UserLoginDTO): Promise<object> {
    await this.userModel.add(req.username, req.password);
    return this.success(null, '添加成功');
  }

  error(msg): object {
    return {
      code: 400,
      result: 'error',
      message: msg,
      data: null,
    };
  }

  success(data, msg): object {
    return {
      code: 200,
      result: 'success',
      message: msg,
      data: data,
    };
  }
}
