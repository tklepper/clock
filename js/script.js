jQuery(document).ready(function() {
  var clock = function(setDate = null) {
    var setDate = jQuery(".setDate").html();
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
    jQuery(".date").html(date);
    jQuery(".time").html(time);

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
    jQuery(".second-hand").css({ transform: secondRotate });
  };

  var rotateMinute = function(minutes) {
    // Calculate minute
    var minuteDegree = minutes * (360 / 60);
    // Set CSS
    var minuteRotate = "rotate(" + minuteDegree + "deg)";
    jQuery(".minute-hand").css({ transform: minuteRotate });
  };

  var rotateHour = function(hours, minutes) {
    // Calculate degrees between hours
    var addMinuteDegree = parseInt(minutes) * 0.5;
    // Calculate hour degrees
    var hourDegree = hours * (360 / 12) + addMinuteDegree;
    // Set CSS
    var hourRotate = "rotate(" + hourDegree + "deg)";
    jQuery(".hour-hand").css({ transform: hourRotate });
  };

  var dayTimeCheck = function(date, datetime) {
    var evening = moment(date + " 17:00");
    var daytime = moment(date + " 07:00");
    if (datetime >= evening || datetime <= daytime) {
      // Display Nighttime Background
      jQuery("body").css({
        "background":
          "url(https://cdn.pixabay.com/photo/2016/11/23/01/27/night-1851685__340.png) no-repeat center center fixed",
        "background-size": "cover"
      });
    } else {
      // Display Daytime Background
      jQuery("body").css({
        "background":
          "url(https://cdn.pixabay.com/photo/2016/11/21/03/56/landscape-1844227__340.png) no-repeat center center fixed",
        "background-size": "cover"
      });
    }
  };
});
