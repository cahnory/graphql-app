export const globalKey = 'if_you_set_this_var_its_really_because_you_wanted_me_to_suffer__love__cahnory';
export const isBrowser = !!process.browser;

export function asyncLoop(data, callbacks, onError, index) {
  index = index || 0;

  if (index < callbacks.length) {
    callbacks[index](data, function (error) {
      if (error) {
        if (onError) {
          onError(error, data);
        }
      } else {
        asyncLoop(data, callbacks, onError, index + 1);
      }
    });
  }
}