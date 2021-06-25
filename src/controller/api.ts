import { Inject, Controller, Post, Provide, Query, Get } from '@midwayjs/decorator';
import { Context } from 'egg';
import { IGetUserResponse } from '../interface';
import { UserService } from '../service/user';
import { BalancerService } from '@midwayjs/consul'
import * as Consul from 'consul'


@Provide()
@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;
  @Inject()
  balancerService: BalancerService;

  @Inject()
  userService: UserService;

  @Inject("consul:consul")
  consul: Consul.Consul;


  @Post('/get_user')
  async getUser(@Query() uid: string): Promise<IGetUserResponse> {
    const user = await this.userService.getUser({ uid });
    return { success: true, message: 'OK', data: user };
  }

  @Get('/set_doamin_switch')
  async setDomainSwitch(@Query() domain: string,@Query() value: string): Promise<any> {
    const service = await this.balancerService.getServiceBalancer().select('my-midway-project');
    // console.log(service)
    console.log(service.Address,service.ServicePort)
    await this.consul.kv.set(domain, value)
    let res = await this.consul.kv.get(domain);
    console.log(res)
    return { success: true, message: 'OK', data:domain+" now is "+ res };
  }
  @Get('/get_doamin_switch')
  async getDomainSwitch(@Query() domain: string): Promise<any> {
    
    await this.consul.kv.get(domain)
    let res = await this.consul.kv.get(domain);
    console.log(res)
    return { success: true, message: 'OK', data:res };
  }
}
