
  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };


// ma
function throttles(func, wait, options) {
    let context, args, timeout
    let old = 0
    if(!options) options = {}
    let later = function() {
        old = new Date().valueOf()
        timeout = null
        func.apply(context, args)
    }

    return function() {
        context = this
        args = arguments
        let now = new Date().valueOf()
        
        // 第一次不会触发
        if(options.leading === false && !old) {
            old = now
        }
        // 
        if(now - old > wait) {
            // 第一次会直接执行
            if(timeout) {
                clearTimeout(timeout)
                timeout = null
            }
            old = now
            func.apply(context, args)
           
        } else if(!timeout && options.trailing !== false) {
            // 最后一次也会被执行
            timeout = setTimeout(() => {
                old = new Date().valueOf()
                timeout = null
                func.apply(context, args)
            }, wait) 
        }
    }
}

function debounce (func, wait, immediate) {
    var timeout, result
    return function () {
        var context = this, args = arguments

        if(timeout) clearTimeout(timeout)
        if(immediate) {
            var callNow = !timeout
            timeout = setTimeout(function() {
                timeout = null
            }, wait)
            // 立即执行
            if(callNow) func.apply(context, args)
        } else {
            // 不会立即执行
            timeout = setTimeout(function(){
                func.apply(context, args)
            }, wait)
        }
    }
}
