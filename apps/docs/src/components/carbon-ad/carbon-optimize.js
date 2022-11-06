export default {
  isRefreshAble: function () {
    return !(
      typeof document.addEventListener === "undefined" || this.browserSupport().hidden === undefined
    );
  },
  browserSupport: function () {
    let hidden;
    let visibilityChange;

    if (typeof document.hidden !== "undefined") {
      // Opera 12.10 and Firefox 18 and later support
      hidden = "hidden";
      visibilityChange = "visibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
      hidden = "msHidden";
      visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
      hidden = "webkitHidden";
      visibilityChange = "webkitvisibilitychange";
    }

    return {
      hidden: hidden,
      visibilityChange: visibilityChange,
    };
  },
  handleVisibilityChange: function () {
    const isElementInViewport = function (el) {
      let element = document.querySelector(el);
      let bounding = element.getBoundingClientRect();
      let isVisible;

      if (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.right <= window.innerWidth &&
        bounding.bottom <= window.innerHeight
      ) {
        isVisible = true;
      } else {
        isVisible = false;
      }

      return isVisible;
    };

    if (!document.hidden) {
      if (typeof _carbonads !== "undefined" && isElementInViewport("#carbonads")) {
        // eslint-disable-next-line no-undef
        _carbonads.refresh();
      }
    }
  },
  init: function () {
    if (this.isRefreshAble()) {
      document.addEventListener(
        this.browserSupport().visibilityChange,
        this.handleVisibilityChange,
        false,
      );
    }
  },
};
