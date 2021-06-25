import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = 'ciic))@jzFP';

  // add your config here
  config.middleware = [];

  config.midwayFeature = {
    // true 代表使用 midway logger
    // false 或者为空代表使用 egg-logger
    replaceEggLogger: true,
  };
  config.consul =  {
    provider: {
      // 注册本服务
      register: true,
      // 应用正常下线反注册
      deregister: true,
      // consul server 主机
      host: '192.168.3.197',				// 此处修改 consul server 的地址
      // consul server 端口
      port: 8500,									// 端口也需要进行修改
      // 调用服务的策略(默认选取 random 具有随机性)
      strategy: 'random',
    },
    service: {
      address: '192.168.3.39',				// 此处是当前这个 midway 应用的地址
      port: 7001,									// midway应用的端口
      tags: ['tag1', 'tag2'],			// 做泳道隔离等使用
      name: 'my-midway-project'
      // others consul service definition
    }
  }

  return config;
};
