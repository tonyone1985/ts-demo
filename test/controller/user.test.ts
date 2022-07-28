import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';

describe('test/controller/user.test.ts', () => {

  it('POST /login', async () => {
    // create app
    const app = await createApp<Framework>();

    let start = new Date().getTime();
    // make request
    let result = await createHttpRequest(app).post('/login').send({username:'cxx',password:'1111'});
    let end = new Date().getTime();
    expect(end-start).toBeLessThan(1000)

    // use expect by jest
    expect(result.status).toBe(200);
    expect(result.body.code).toBe(400);

    await createHttpRequest(app).post('/add').send({username:'cxx',password:'1111'});

    start = new Date().getTime();
    result = await createHttpRequest(app).post('/login').send({username:'cxx',password:'1111'});
    end = new Date().getTime();
    expect(end-start).toBeLessThan(1000)
    // use expect by jest
    expect(result.status).toBe(200);
    expect(result.body.code).toBe(200);
    expect(result.body.data.token!=null).toBe(true)
    start = new Date().getTime();
    result = await createHttpRequest(app).post('/login').send({username:'cxx',password:'1112'});
    end = new Date().getTime();
    expect(end-start).toBeLessThan(1000)
    // use expect by jest
    expect(result.status).toBe(200);
    expect(result.body.code).toBe(400);


    // close app
    await close(app);
  });

});
