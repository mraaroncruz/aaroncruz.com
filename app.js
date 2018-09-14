(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("src/js/app.js", function(exports, require, module) {
"use strict";

var _spinning_head = _interopRequireDefault(require("src/js/spinning_head"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jQuery(function () {
  var aaron = new _spinning_head.default();
  console.log("Starting colors");
  aaron.startFuckingLogoColors();
  console.log("Starting Head");
  aaron.rotateFuckingHeadAroundFuckingName();
  console.log("Starting resize watcher");
  aaron.setupResizeWatcher();
});

});

require.register("src/js/spinning_head.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function AaronCruz() {
  this.version = "0.2";
  this.author = "Aaron Cruz";
  this.email = "aaron@aaroncruz.com";
  this.fuckingRainbow = ["red", "#FF9900", "yellow", "green", "blue", "purple"];
  this.duration = 2000;
  this.logo = jQuery("#aaroncruz");
  this.head = jQuery("#my-head img");
}

AaronCruz.prototype.startFuckingLogoColors = function () {
  this.changeColor();
};

AaronCruz.prototype.changeColor = function () {
  var color = this.fuckingRainbow.pop();
  this.fuckingRainbow.unshift(color);
  var self = this;
  this.logo.animate({
    color: color
  }, this.duration, "easeInSine", function () {
    self.changeColor();
  });

  var goWhite = function goWhite() {
    jQuery(this).css({
      backgroundColor: this.logo.css("color"),
      color: "white"
    });
  };

  var goTransparent = function goTransparent() {
    jQuery(this).css({
      backgroundColor: "transparent",
      color: "#333"
    });
  };

  jQuery(".menu li a").hover(goWhite, goTransparent);
};

AaronCruz.prototype.rotateFuckingHeadAroundFuckingName = function () {
  jQuery("#my-head").css({
    opacity: 0
  }).animate({
    opacity: 1
  }, 1000);
};

AaronCruz.prototype.stopCircularizing = function () {
  console.log("stop");
  var self = this;

  var todo = function todo() {
    return self.head.circulate("Stop");
  };

  setTimeout(todo);
};

AaronCruz.prototype.circularize = function () {
  var circulateOpts = {
    speed: 1000,
    // Speed of each quarter segment of animation, 1000 = 1 second
    height: 50,
    // Distance vertically to travel
    width: 500,
    // Distance horizontally to travel
    sizeAdjustment: 40,
    // Percentage to grow or shrink
    loop: true,
    // Circulate continuously
    zIndexValues: [1, 0, 0, 1] // Sets z-index value at each stop of animation

  };
  this.head.circulate(circulateOpts);
};

AaronCruz.prototype.setupResizeWatcher = function () {
  var self = this;

  var onResize = function onResize(e) {
    console.log("resizing");
    var width = window.innerWidth;

    if (width < 500) {
      self.head.addClass("rotating");
    } else {
      self.head.removeClass("rotating");
      self.circularize();
    }
  };

  window.onresize = onResize;
  jQuery(window).resize();
};

var _default = AaronCruz;
exports.default = _default;

});

require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map