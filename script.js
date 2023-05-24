var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 25; // prędkość pisania (mniej = szybciej / więcej = wolniej)

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
};

document.addEventListener('DOMContentLoaded', function(event) {
    var container = document.getElementById('text');
    var text = container.textContent;
    container.textContent = '';

    var speed = 50;
    var index = 0;

    function typeWriter() {
        if (index < text.length) {
            container.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, speed);
        }
    }

    typeWriter();
});

// Ustal domyślny tytuł
var defaultTitle = 'w6keup';

// Funkcja do zmiany tytułu, gdy użytkownik opuszcza stronę
function changeTitleOnBlur() {
  document.getElementById('custom-title').innerText = 'Wróć na w6keup...';
}

// Dodaj obsługę zdarzenia blur
window.addEventListener('blur', changeTitleOnBlur);

// Dodaj obsługę zdarzenia focus, aby przywrócić domyślny tytuł po powrocie na stronę
window.addEventListener('focus', function() {
  document.getElementById('custom-title').innerText = defaultTitle;
});

// Funkcja do zmiany ikony skrótu, gdy użytkownik opuszcza stronę
function changeShortcutIconOnBlur() {
  var shortcutIcon = document.querySelector('link[rel="shortcut icon"]');
  shortcutIcon.href = "img/wakeup-fav2.png";
}

// Funkcja do przywracania domyślnej ikony skrótu po powrocie na stronę
function restoreShortcutIconOnFocus() {
  var shortcutIcon = document.querySelector('link[rel="shortcut icon"]');
  shortcutIcon.href = "img/wakeup-fav.png";
}

// Dodaj obsługę zdarzenia blur dla ikony skrótu
window.addEventListener('blur', changeShortcutIconOnBlur);

// Dodaj obsługę zdarzenia focus dla ikony skrótu
window.addEventListener('focus', restoreShortcutIconOnFocus);

// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("progressbar").style.width = scrolled + "%";
}