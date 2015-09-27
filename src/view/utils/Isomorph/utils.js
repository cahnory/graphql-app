export const globalKey = 'MaGlobalKey';
export const isBrowser = !!process.browser;

export function asyncLoop(data, callbacks, onError, index) {
  index = index || 0;

  console.log(JSON.parse(JSON.stringify(data)));
  if (index < callbacks.length) {
    callbacks[index](data, function (error) {
      if (error) {
        if (onError) {
          onError(error, data);
        }
      } else {
        asyncLoop(data, callbacks, onError, index + 1)
      }
    });
  }
}