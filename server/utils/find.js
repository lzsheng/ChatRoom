module.exports = {
  findDataByKey(data, dataKey, value) {
    return new Promise((resolve, reject) => {
      let res;
      for (const item of data) {
        if (item[dataKey] === value) {
          res = item;
          break;
        }
      }
      setTimeout(() => {
        resolve(res);
      }, 50);
    });
  },
};
