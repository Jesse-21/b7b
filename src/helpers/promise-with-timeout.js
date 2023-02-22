export const promiseWithTimeout = (prom, time, exception) => {
  let timer;
  return Promise.race([
    prom,
    new Promise(
      (resolve, reject) => (timer = setTimeout(reject, time, exception))
    ),
  ]).finally(() => clearTimeout(timer));
};
