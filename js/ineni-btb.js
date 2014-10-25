var count = 0;

function loadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
	    var head = document.getElementsByTagName('head')[0];
	    var script = document.createElement('script');
	    script.type = 'text/javascript';
	    script.src = url;	
	    
	    // Then bind the event to the callback function.
	    // There are several events for cross browser compatibility.
	    script.onreadystatechange = callback;
	    script.onload = callback;

	    // Fire the loading
	    head.appendChild(script);
}

var logFunction = function() {
	console.log("logFunction begins...");
	var ineniBtbLog = new Firebase("https://ineni-btb.firebaseio.com/log/");
	var ineniBtbApps = new Firebase("https://ineni-btb.firebaseio.com/apps/");
	var appID = "PROJ0046 BarangarooSthFeatureApp";

	ineniBtbLog.push({date: retrieveDate(true), appID: appID, ip: codehelper_ip.IP, countryCode: codehelper_ip.Country, cityName:codehelper_ip.CityName});

	ineniBtbApps.set({appID: appID})
}


loadScript('http://www.codehelper.io/api/ips/?js', logFunction);


// TO RETRIEVE A DATE
function retrieveDate(bool){
	var objToday = new Date();
	if(bool){return formatDate(objToday)};
	return objToday.toString();
}

// TO FORMAT DATE
function formatDate(objDate){
	weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
	dayOfWeek = weekday[objDate.getDay()],
	domEnder = new Array( 'th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th' ),
	dayOfMonth = today + (objDate.getDate() < 10) ? '0' + objDate.getDate() + domEnder[objDate.getDate()] : objDate.getDate() + domEnder[parseFloat(("" + objDate.getDate()).substr(("" + objDate.getDate()).length - 1))],
	months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
	curMonth = months[objDate.getMonth()],
	curYear = objDate.getFullYear(),
	curHour = objDate.getHours() > 12 ? objDate.getHours() - 12 : (objDate.getHours() < 10 ? "0" + objDate.getHours() : objDate.getHours()),
	curMinute = objDate.getMinutes() < 10 ? "0" + objDate.getMinutes() : objDate.getMinutes(),
	curSeconds = objDate.getSeconds() < 10 ? "0" + objDate.getSeconds() : objDate.getSeconds(),
	curMeridiem = objDate.getHours() > 12 ? "PM" : "AM";

	var today = curHour + ":" + curMinute + ":" + curSeconds + curMeridiem + " " + dayOfWeek + " " + dayOfMonth + " of " + curMonth + ", " + curYear;
	return today;		
}

// TO CLEAN UP A SNAPSHOT ID TO MAKE IT WEB FRIENDLY
function getMessageId(snapshot) {
	return snapshot.name().replace(/[^a-z0-9\-\_]/gi,'');
}