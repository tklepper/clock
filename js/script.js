jQuery(document).ready(function() {
  var clock = function(setDate = null) {
    var setDate = jQuery(".setDate").val();
    if (setDate == "") {
      var momentCapture = moment();
    } else {
      var momentCapture = moment(setDate);
    }
    // Get todays date and time and display digital clock
    var date = momentCapture.format("MM-DD-YY");
    var time = momentCapture.format("h:mm:ss a");
    var seconds = momentCapture.format("ss");
    var minutes = momentCapture.format("mm");
    var hours = momentCapture.format("hh");
    jQuery(".date-display").html(date);
    jQuery(".time-display").html(time);

    // Set Analog Clock Hands
    rotateSeconds(seconds);
    rotateMinute(minutes);
    rotateHour(hours, minutes);

    // Run Daytime Check
    dayTimeCheck(momentCapture.format("YYYY-MM-DD"), momentCapture);
  };
  // Update every 1 second
  var x = setInterval(clock, 1000);

  var rotateSeconds = function(seconds) {
    // Calulate Second Degrees
    var secondDegree = seconds * 6;
    // Set CSS
    var secondRotate = "rotate(" + secondDegree + "deg)";
    jQuery(".second-hand").css({ "transform": secondRotate, "-ms-transform": secondRotate, "-moz-transform": secondRotate, "-webkit-transform": secondRotate, "-o-transform": secondRotate});
  };

  var rotateMinute = function(minutes) {
    // Calculate minute
    var minuteDegree = minutes * (360 / 60);
    // Set CSS
    var minuteRotate = "rotate(" + minuteDegree + "deg)";
    jQuery(".minute-hand").css({ "transform": minuteRotate, "-ms-transform": minuteRotate, "-moz-transform": minuteRotate, "-webkit-transform": minuteRotate, "-o-transform": minuteRotate });
  };

  var rotateHour = function(hours, minutes) {
    // Calculate degrees between hours
    var addMinuteDegree = parseInt(minutes) * 0.5;
    // Calculate hour degrees
    var hourDegree = hours * (360 / 12) + addMinuteDegree;
    // Set CSS
    var hourRotate = "rotate(" + hourDegree + "deg)";
    jQuery(".hour-hand").css({ "transform": hourRotate, "-ms-transform": hourRotate, "-moz-transform": hourRotate, "-webkit-transform": hourRotate, "-o-transform": hourRotate });
  };

  var dayTimeCheck = function(date, datetime) {
    var evening = moment(date + " 17:00");
    var daytime = moment(date + " 07:00");
    if (datetime >= evening || datetime <= daytime) {
      // Display Nighttime Background
      jQuery("body").css({
        "background":
          "url(https://cdn.pixabay.com/photo/2016/11/23/01/27/night-1851685__340.png) no-repeat center center fixed",
        "background-size": "cover",
        "transition": "all 1s linear"
      });
      jQuery('.hour-hand').css({
        "background":"#fff"
      });
      jQuery('.minute-hand').css({
        "background":"#fff"
      });
      jQuery('.timeChange-container').css({
        "color":"#fff"
      });
      jQuery('.digital').css({
        "color":"#fff"
      });
    } else {
      // Display Daytime Background
      jQuery("body").css({
        "background":
          "url(https://cdn.pixabay.com/photo/2016/11/21/03/56/landscape-1844227__340.png) no-repeat center center fixed",
        "background-size": "cover",
        "transition": "all 1s linear"
      });
      jQuery('.hour-hand').css({
        "background":"#000"
      });
      jQuery('.minute-hand').css({
        "background":"#000"
      });
      jQuery('.timeChange-container').css({
        "color":"#000"
      });
      jQuery('.digital').css({
        "color":"#000"
      });
    }
  };

  jQuery('.timeChange').on('click', function(){
    var newDate = moment().format('YYYY-MM-DD');
    jQuery('.hour-hand').css({
      "transition": "all 1s linear"
    });
    jQuery('.minute-hand').css({
      "transition": "all 1s linear"
    });

    switch(jQuery(this).data('time')){
      case "morning":
        var newTime = newDate + ' 08:00'
        break;
      case "night":
        var newTime = newDate + ' 00:00'

        break;
      case "now":
        var newTime = ''
        break;
    }
    jQuery('.setDate').val(newTime);
    jQuery('.hour-hand').css({
      "transition": "none"
    });
    jQuery('.minute-hand').css({
      "transition": "none"
    });
  })

});
