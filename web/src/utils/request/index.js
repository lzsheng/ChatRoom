import Axios from 'axios';
import { v1 as uuidv1 } from 'uuid';
let ax = null;

export function initAxios(config) {
  ax = Axios.create(config);
}

const closeLoading = function() {
  // PubSub.publish('hideLoadingEvt');
};

export function request(config) {
  if (!ax) {
    throw new Error('axios实例未初始化');
  }
  config.params = { ...(config.params || {}), requestId: uuidv1() };

  //自定义配置
  let customConfig = {
    loading: false,
  };
  try {
    //loading相关
    if (config.loading && config.loading.show) {
      customConfig.loading = true;
      // PubSub.publish('showLoadingEvt', {
      //   mask: !!config.loading.mask,
      // });
    }
    delete config.loading;
  } catch (error) {
    console.log(error);
  }

  return ax(config).then(
    resp => {
      if (customConfig.loading) {
        closeLoading();
      }
      if (resp.data && resp.data.code != 200) {
        //业务异常
        console.error(
          `接口异常 ${resp.data.code}`,
          { respData: resp.data, reqParams: config },
          { errorCode: resp.data.code },
          [resp.data.code],
        );
        return Promise.reject({ data: resp.data });
      }
      return resp.data;
    },
    error => {
      //网络异常
      if (customConfig.loading) {
        closeLoading();
      }
      console.error(
        `${error.message}`,
        {
          error: error.message,
          httpError: { ...error },
        },
        { errorCode: (error.response && error.response.status) || error.code },
        [(error.response && error.response.status) || error.code],
      );
      return Promise.reject({ data: { code: -999, msg: '网络异常，请稍后再试！' }, req: config });
    },
  );
}
