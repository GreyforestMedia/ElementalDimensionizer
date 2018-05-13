///////////////////////////////////////////////////////////////////////////////////////////////
//
// GREYFOREST Elemental Dimensionalizer
//
///////////////////////////////////////////////////////////////////////////////////////////////
// 
// OPTIONS: 
// dimension-x-inverse: invert x rotation
// dimension-y-inverse: invert y rotation
// dimension-x-sensitivity: sensitivity of x rotation
// dimension-y-sensitivity: sensitivity of y rotation
//
///////////////////////////////////////////////////////////////////////////////////////////////
// 
// USAGE:
// ElementalDimensionizer(element, log);
//
// element: set ID of parent element that contains layers
// log: true or false for small box to display coordinates legend
//
///////////////////////////////////////////////////////////////////////////////////////////////

function ElementalDimensionizer(element, log) {

	// if log are set to true, display coordinates legend
	if ( log == true ) { 
		if ( $('#element-logs').length ) {}
		else { $("<div id='element-logs' style='font-family:Courier New, monospace;font-size:10px;text-transform:uppercase;position:fixed;top:0;left:0;z-index:99999;background:#000;color:#fff;padding:1em;font-size:10px;'></div>").appendTo('body'); }
	}

	// if screengrabber isn't set, set it
	if ( $('#element-frame').length ) {}
	else { $("<div id='element-frame' style='position:fixed;top:0;left:0;width:100%;height:100%;display:block;z-index:-1000'></div>").appendTo('body'); }

	// test for touch events
	var isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));
	
	
$( document ).on( "mousemove touchmove", function( event ) {
	
	// set coordinates capture code based on mobile/desktop
	if ( isTouch == true ) { 
	var getX = event.changedTouches[0].pageX; 
	var getY = event.changedTouches[0].pageY; 
	}
	else if ( isTouch === 'undefined' || !isTouch || isTouch === false ) { 
	var getX = event.pageX; 
	var getY = event.pageY; 
	}
	
	// get coordinate percentages of page width and current screen height with center as origin
	var x = parseFloat(((getX / $('#element-frame').width())*100)-50).toFixed(0);
	var y = parseFloat(((getY / $('#element-frame').height())*100)-50).toFixed(0);
	
	// if log legend exists, display coordinates in realtime
	if ( log == true ) { 
	$('#element-logs').html("pageX: " + x + "%, pageY: " + y + "%<br>pageX: " + getX + ", pageY: " + getY);
	}
	
	// start layer loop to find each instance inside parent
	$(element + ' .element-dimension').each( function() {

	// get data attributes for each layer if set
	var sensitivityx = $(this).data('dimension-x-sensitivity');
	var sensitivityy = $(this).data('dimension-y-sensitivity');
	var inversex = $(this).data('dimension-x-inverse');
	var inversey = $(this).data('dimension-y-inverse');
 
	// set default sensitivity of x
	if ( typeof sensitivityx === 'undefined' || !sensitivityx )  { var sensitivityx = -1; }

	// set default sensitivity of y
	if ( typeof sensitivityy === 'undefined' || !sensitivityy )  { var sensitivityy = -1; }
  
	// set default inverse option of x
	if ( typeof inversex === 'undefined' || !inversex )  { var inversex = false; }	
	
	// set default inverse option of y
	if ( typeof inversey === 'undefined' || !inversey )  { var inversey = false; }
  
	// bridge x sensitivity and inverse
	if ( inversey === true ) { xdegree = sensitivityx*x*-1; }
	else { xdegree = sensitivityx*x*1; }
	
	// bridge y sensitivity and inverse
	if ( inversex === true ) { ydegree = sensitivityy*y*-1; }
	else { ydegree = sensitivityy*y*1; }
  
	// apply rotate css in realtime
	$(this).css({
	'transform':'rotateY('+ xdegree +'deg) rotateX('+ ydegree +'deg)',
	'-webkit-transform':'rotateY('+ xdegree +'deg) rotateX('+ ydegree +'deg)',		
	'transform-origin':'center',
	'-webkit-transform-origin':'center',		
	'transition':'.000001s',
	'-webkit-transition':'.000001s'
  	});	
	
	}); // end each loop
});
}
