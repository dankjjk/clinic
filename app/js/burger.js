(function() {
	var body = document.body;
	var burgerMenu = document.getElementsByClassName('burger__icon')[0];
	var burgerContain = document.getElementsByClassName('burger')[0];
	var burgerNav = document.getElementsByClassName('nav')[0];

  burgerMenu.addEventListener('click', function toggleClasses() {
    [body, burgerContain, burgerNav].forEach(function (el) {
      el.classList.toggle('open');
    });
  }, false);
})();