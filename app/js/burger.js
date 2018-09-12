$('.burger__icon').on('click', function(e) {
	e.preventDefault;
	$(this).toggleClass('burger__icon-active');
	$('.header__logo').toggleClass('header__logo-active');
	$('.header__block').toggleClass('header__block-active');
	$('.nav').toggleClass('nav__active');
	$('.burger').toggleClass('burger__active');
})