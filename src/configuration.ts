import { App, Configuration } from '@midwayjs/decorator';
import { ILifeCycle } from '@midwayjs/core';
import { Application } from 'egg';
import { join } from 'path';
import * as consul from '@midwayjs/consul'

@Configuration({
  imports: [
    consul
  ],
  importConfigs: [join(__dirname, './config')],
  conflictCheck: true,
})
export class ContainerConfiguration {}
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: Application;

  async onReady() {}
}
