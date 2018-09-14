function AaronCruz() {
  this.version = "0.2"
  this.author = "Aaron Cruz"
  this.email = "aaron@aaroncruz.com"
  this.fuckingRainbow = ["red", "#FF9900", "yellow", "green", "blue", "purple"]
  this.duration = 2000
  this.logo = jQuery("#aaroncruz")
  this.head = jQuery("#my-head img")
}

AaronCruz.prototype.startFuckingLogoColors = function () {
  this.changeColor()
}

AaronCruz.prototype.changeColor = function () {
  const color = this.fuckingRainbow.pop();
  this.fuckingRainbow.unshift(color);
  var self = this
  this.logo.animate({ color }, this.duration, "easeInSine", function () {
    self.changeColor()
  })

  var goWhite = function () {
    jQuery(this).css({
      backgroundColor: this.logo.css("color"),
      color: "white"
    })
  }

  var goTransparent = function () {
    jQuery(this).css({
      backgroundColor: "transparent",
      color: "#333"
    })
  }

  jQuery(".menu li a").hover(goWhite, goTransparent)
}

AaronCruz.prototype.rotateFuckingHeadAroundFuckingName = function () {
  jQuery("#my-head").css({
    opacity: 0
  }).animate({
    opacity: 1
  }, 1000)
}

AaronCruz.prototype.stopCircularizing = function () {
  console.log("stop")
  const self = this;
  const todo = () => self.head.circulate("Stop")
  setTimeout(todo)
}

AaronCruz.prototype.circularize = function () {
  var circulateOpts = {
    speed: 1000, // Speed of each quarter segment of animation, 1000 = 1 second
    height: 50, // Distance vertically to travel
    width: 500, // Distance horizontally to travel
    sizeAdjustment: 40, // Percentage to grow or shrink
    loop: true, // Circulate continuously
    zIndexValues: [1, 0, 0, 1], // Sets z-index value at each stop of animation
  }
  this.head.circulate(circulateOpts)
}

AaronCruz.prototype.setupResizeWatcher = function () {
  var self = this
  var onResize = function (e) {
    console.log("resizing")
    var width = window.innerWidth
    if (width < 500) {
      self.head.addClass("rotating")
    } else {
      self.head.removeClass("rotating")
      self.circularize()
    }
  }
  window.onresize = onResize
  jQuery(window).resize()
}

export default AaronCruz
