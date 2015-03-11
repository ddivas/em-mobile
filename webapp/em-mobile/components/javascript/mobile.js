
$(document).ready(function(){/* off-canvas sidebar toggle */

$('[data-toggle=offcanvas]').click(function() {
  	$(this).toggleClass('visible-xs text-center');
    $(this).find('i').toggleClass('glyphicon-chevron-right glyphicon-chevron-left');
    $('.row-offcanvas').toggleClass('active');
    $('#lg-menu').toggleClass('hidden-xs').toggleClass('visible-xs');
    $('#xs-menu').toggleClass('visible-xs').toggleClass('hidden-xs');
    $('#btnShow').toggle();
});

loadInto = function(inLink,cell)
{
	jQuery.get(inLink, {}, function(data) 
	{
		cell.html(data);
	});
}

jQuery('.playerclink').bind('click',function(e)
{
	e.preventDefault();
	var link = $(this);

	var hidden = $("#hiddenoverlay");

	loadInto(link.attr("href") + "&oemaxlevel=1",hidden);

	//Now show overlay
	hidden.show();
	
});

	jQuery('.addfilter').bind('click',function(e)
	{	
		e.preventDefault();
		//TODO: Why not update the results with new data like VD does?
			var link = $(this);
			var picked = link.data("filtertype");
			jQuery('#filtertype').val(picked);
			var value = link.data("filtervalue");
			jQuery('#filtervalue').val(value);
			var label = link.data("filterlabel");
			jQuery('#filterlabel').val(label);

			jQuery('#dontshow').submit();
			
	});

	$(document).on('click',"#closebutton",function(e)
	{	
		e.preventDefault();
		var hidden = $("#hiddenoverlay");
		hidden.hide();
	});
	
	$(document).on('click',"#playbutton",function(e)
			{	
				e.preventDefault();
				var div = $(this);
				div.removeClass("glyphicon-play");
				div.addClass("glyphicon-pause");
				console.log("Now Play slideshow");
			});

	
});

doResize = function() 
{
	var fixedheight = 300;
	var sofarused = 0;
	var totalwidth = 0;
	var totalavailable = $(".masonry-grid ").width(); 
	var row = [];
	$(".masonry-grid .masonry-grid-cell").each(function()
	{		
		var cell = $(this);
		var w = cell.data("width");
		if( !w )
		{
			w = 100;
		}
		
		var h = cell.data("height");
		if( !h )
		{
			h = 100;
		}
		w = parseInt(w);
		h = parseInt(h);
		var a = w / h;  
		if( a > 1)
		{
			//this is an extra wide one so we need to set
		}
		//var hratio = h / fixedheight;  
		var neww = Math.floor( fixedheight * a );
		
		sofarused = sofarused + neww + 20;
		row.push( {cell:$(cell), aspect:a, width:w, height:h} );
		if( sofarused > totalavailable )
		{
			//TODO: set the height of this row
			var overage = totalavailable / sofarused;
			var newheight = fixedheight * overage;
			var newheightrounded = Math.floor(newheightrounded);
			$.each( row, function()
				{
					var newcell = this;
					var newwidth = Math.floor(newheight * newcell.aspect); 
					//newcell.cell.height(newheight);
					newcell.cell.width(newwidth);
				}	
			);
			row = [];
			sofarused = 0;			
		}
		
		
	});
	
	
	

}

$(window).resize(function(){
	doResize();
});