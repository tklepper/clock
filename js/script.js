// Hello.
//
// This is JSHint, a tool that helps to detect errors and potential
// problems in your JavaScript code.
//
// To start, simply enter some JavaScript anywhere on this page. Your
// report will appear on the right side.
//
// Additionally, you can toggle specific options in the Configure
// menu.

jQuery(document).ready(function() {

  // Set default location info in case location is unavailable.
  var latitude = "40.7128";
  var longitude = "74.0060";
  var sunset = "18:00";
  var sunrise = "07:00";

  // Get Location For Sunset / Sunrise Times
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

  }

  // Use Latitude and Longitue to request Sunrise and Sunset times from API
  function showPosition(position) {
      sunrise = localStorage.getItem("itsgenius_sunrise");
      sunset = localStorage.getItem("itsgenius_sunset");
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      if(sunset===null){
        var jqxhr = jQuery.get( "https://api.sunrise-sunset.org/json?lat=" + latitude + "&lng=" + longitude + '&formatted=0', function(data){
          // Change from UTC
          sunrise = moment(data.results.sunrise).local().format('hh:mm:ss a');
          sunset = moment(data.results.sunset).local().format('hh:mm:ss a');
          // Save in localstorage
          localStorage.setItem("itsgenius_sunrise", sunrise);
          localStorage.setItem("itsgenius_sunset", sunset);
        });
      }


  }

  var clock = function(setDate=null) {
    if(secondOffset>0){
      jQuery('.hour-hand').addClass('transform');
      jQuery('.minute-hand').addClass('transform');
    }
    setDate = jQuery(".setDate").val();
    var momentCapture = {};
    if (setDate == "") {
      momentCapture = moment();
    } else {
      momentCapture = moment(setDate, "YYYY-MM-DD hh:mm:ss a").add(secondOffset, 'seconds');
    }
    // Get todays date and time and display digital clock
    var date = momentCapture.format("MM-DD-YY");
    var time = momentCapture.format("h:mm:ss a");
    jQuery(".date-display").html(date);
    jQuery(".time-display").html(time);

    // Set Analog Clock Hands
    var diff = momentCapture.diff(moment(date + " 00:00:00", "MM-DD-YY HH:mm:ss"));
    var hours = (diff/(1000*60*60));

    var minutes = (hours*60);
    var seconds = (minutes*60);
    jQuery('#setHours').text(momentCapture.format("hh"));
    jQuery('#setMinutes').text(momentCapture.format("mm"));
    jQuery('#setSeconds').text(momentCapture.format("ss"));
    jQuery('#setAmPm').text(momentCapture.format("A"));
    rotateSeconds(seconds);
    rotateMinute(minutes);
    rotateHour(hours, minutes);

    // Run Daytime Check
    dayTimeCheck(momentCapture.format("YYYY-MM-DD"), momentCapture);
    secondOffset = secondOffset + 1;
  };

  var rotateSeconds = function(seconds) {
    // Calulate Second Degrees
    var secondDegree = seconds * (360 / 60);
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
    var addMinuteDegree = (parseInt(minutes) * 0.5) /1000;
    // Calculate hour degrees
    var hourDegree = hours * (360 / 12) + addMinuteDegree;
    // Set CSS
    var hourRotate = "rotate(" + hourDegree + "deg)";
    jQuery(".hour-hand").css({ "transform": hourRotate, "-ms-transform": hourRotate, "-moz-transform": hourRotate, "-webkit-transform": hourRotate, "-o-transform": hourRotate });
  };

  var dayTimeCheck = function(date, datetime) {
    // Get Sunset and Sunrise time Formats
    var evening = moment(date + " " + sunset, "YYYY-MM-DD hh:mm:ss a" );
    var daytime = moment(date + " " + sunrise, "YYYY-MM-DD hh:mm:ss a");

    if (datetime < daytime || datetime >= evening) {
      // Display Nighttime Background
      jQuery("body").css({
        "background":
        "url('/clock/img/landscape-1844226.svg') center center",
        "background-size": "cover",
        "background-attachment": "fixed",
        "background-repeat": "no-repeat",
        "transition": "all 1s linear",
        "-webkit-transition": "all 1s linear"
      });

      // Change Clock face and hands to white
      jQuery('.clock').css({
        "background":
          "url('/clock/img/clock-face-white.png') no-repeat center",
          "background-size": "109%",
          "transition": "all 1s linear",
          "-webkit-transition": "all 1s linear"
      });
      jQuery('.hour-hand').css({
        "background":"#fff"
      });
      jQuery('.minute-hand').css({
        "background":"#fff"
      });

      // Change Button Text and Digital Clock text to white
      jQuery('.timeChange-container').css({
        "color":"#fff"
      });
      jQuery('.digital').css({
        "color":"#fff"
      });
    } else {

      // Display Daytime Background
      /*
      jQuery("body").css({
        "background":
          "url('/clock/img/landscape-1844227.svg') center center",
        "background-size": "cover",
        "background-attachment": "fixed",
        "background-repeat": "no-repeat",
        "transition": "all 1s linear",
        "-webkit-transition": "all 1s linear"
      });
      */
      // Change clock face and hands to black
      jQuery('.clock').css({
        "background":
          "url('/clock/img/clock-face-black.png') no-repeat center",
          "background-size": "109%",
          "transition": "all 1s linear",
          "-webkit-transition": "all 1s linear"
      });
      jQuery('.hour-hand').css({
        "background":"#000"
      });
      jQuery('.minute-hand').css({
        "background":"#000"
      });

      // Change button text and digital clock text to black
      jQuery('.timeChange-container').css({
        "color":"#000"
      });
      jQuery('.digital').css({
        "color":"#000"
      });
    }
  };


  // Get Location and Sunrise/Sunset if needed
  getLocation();

  // Set Initial Counter for Morning / Night Time
  var secondOffset = 0;

  // Fade in content on page load.
  jQuery('.container').show('slow');

  // Load time on analog clock on page load
  clock();

  // Update every 1 second
  var x = setInterval(clock, 1000);

  // Change time based on button clicked
  jQuery('.timeChange').on('click', function(){
    secondOffset = 0;
    var newTime = '';
    var newDate = moment().format('YYYY-MM-DD');
    jQuery('.hour-hand').css({
      "transition": "all 1s linear",
      "-webkit-transition": "all 1s linear"
    });
    jQuery('.minute-hand').css({
      "transition": "all 1s linear",
      "-webkit-transition": "all 1s linear"
    });

    switch(jQuery(this).data('time')){
      case "sunrise":
        newTime = newDate + ' ' + sunrise;
        break;
      case "sunset":
        newTime = newDate + ' ' + sunset;
        break;
      case "now":
        newTime = '';
        break;
    }
    jQuery('.setDate').val(newTime);

  });

  jQuery('.timeAdjust').on('click',function(){
    secondOffset = 0;
    var hour = parseInt(jQuery('#setHours').text());
    var minute = parseInt(jQuery('#setMinutes').text());
    var seconds = parseInt(jQuery('#setSeconds').text()) + 1;
    var amPm = jQuery('#setAmPm').text();
    var type = jQuery(this).data('type');
    switch(type){

      case "hourUp":
        if(hour==12){
          hour = 01;
        } else {
          if(hour==11){
            if(amPm=="AM"){
              amPm = "PM";
            } else {
              amPm = "AM";
            }
          }
          hour = hour + 1;
        }
        break;
      case "hourDown":
        if(hour==01){
          hour = 12;
        } else {
          if(hour==12){
            if(amPm=="AM"){
              amPm = "PM";
            } else {
              amPm = "AM";
            }
          }
          hour = hour - 1;
        }
        break;
      case "minUp":
        if(minute==59){
          minute = 00;
          if(hour==12){
            hour = 01;
          } else {
            if(hour==11){
              if(amPm=="AM"){
                amPm = "PM";
              } else {
                amPm = "AM";
              }
            }
            hour = hour + 1;
          }

        } else {
          minute = minute + 1;
        }
        break;
      case "minDown":
        if(minute==00){
          minute = 59;
          if(hour==01){
            hour=12;
          } else {
            if(hour==12){
              if(amPm=="AM"){
                amPm = "PM";
              } else {
                amPm = "AM";
              }
            }
            hour = hour - 1;
          }
        } else {
          minute = minute - 1;
        }
        jQuery('#setAmPm').text(amPm);
        break;
      case "amPm":
        if(amPm=="AM"){
          amPm = "PM";
        } else {
          amPm = "AM";
        }
        jQuery('#setAmPm').text(amPm);
        break;

    }

    var date = moment();
    var dateSet = date.format('YYYY-MM-DD') + ' ' + hour + ':' + minute + ':' + seconds + ' ' + amPm;
    console.log(dateSet);
    jQuery('.setDate').val(dateSet);
  });




});
