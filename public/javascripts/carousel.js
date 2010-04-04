var Carousel = {
	init: function(options) {
		this.container = $(options['element']);
		this.leftControl = $(options['leftControl']);
		this.rightControl = $(options['rightControl']);
		this.pointsContainer = $(options['pointsContainer']);
		
		this.leftControl.click(function() {
			Carousel.navigate.backward();
		});
		
		this.rightControl.click(function() {
			Carousel.navigate.forward();
		});
		
		this.items = this.container.children();
		this.currentIndex = 0;
		this.inMotion = false;
		
		this.refreshPointsHTML();
	},
	
	indexOf: function(item) {
		return jQuery.inArray(item, this.items);
	},
	
	itemAtIndex: function(index) {
		return $(this.items[index]);
	},
	
	currentItem: function() {
		return this.itemAtIndex(this.currentIndex);
	},
	
	refreshPointsHTML: function() {
		this.pointsContainer.html('');
		jQuery.each(Array(this.items.length), function(index) {
			if (index == Carousel.currentIndex) src = 'point.png'
			else src = 'point_off.png';
			$('<img id="' + index + '_point" class="point" src="' + src + '" />').appendTo(Carousel.pointsContainer);
		})
	},
	
	navigate: {
		to: function(index) {
			if (Carousel.inMotion) return;
			if (index == Carousel.currentIndex) return;
			
			if (index >= Carousel.items.length) { Carousel.newIndex = 0 }
			else if (index < 0) { Carousel.newIndex = Carousel.items.length -1 }
			else { Carousel.newIndex = index };
			
			if (Carousel.newIndex > Carousel.currentIndex) {
				filter = function(i) { return i >= Carousel.currentIndex && i < Carousel.newIndex };
				direction = -1; // forwards
			} else {
				filter = function(i) { return i < Carousel.currentIndex && i >= Carousel.newIndex };
				direction = 1; // backwards
			}
			
			var toNavigatePast = Carousel.items.filter(filter);
			var displacement = toNavigatePast.map(function() { return $(this).width() }).sum();
			var currentOffset = parseInt(Carousel.container.css('left'));
			var newOffset = currentOffset + (displacement * direction);
			
			Carousel.inMotion = true;
			
			// fade out old images and in new.
			var oldImages = Carousel.currentItem().find('.photo'),
				newImages = Carousel.itemAtIndex(Carousel.newIndex).find('.photo');
			
			if (direction > 0) {
				oldImages = $(jQuery.makeArray(oldImages).reverse()); 
				newImages = $(jQuery.makeArray(newImages).reverse());
			};

			oldImages.each(function(index, photo) {
      	setTimeout(function() { $(photo).fadeTo(350,'0.25') }, index*100);
      })
			
			setTimeout(function() {
				newImages.each(function(index, photo) {
	      	setTimeout(function() { $(photo).fadeTo(720,'1') }, index*100);
	      })	
			}, 0)
						
			Carousel.container.animate({left: newOffset}, 900, function() {
				Carousel.currentIndex = Carousel.newIndex;
				Carousel.inMotion = false;
				Carousel.refreshPointsHTML();
			});
		},
		
		forward: function(increment) {
			Carousel.navigate.to(Carousel.currentIndex + (increment || 1))
		},
		
		backward: function(decrement) {
			Carousel.navigate.to(Carousel.currentIndex - (decrement || 1))
		}
	}
};