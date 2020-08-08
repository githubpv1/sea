
'use strict';

Array.prototype.slice.call(document.querySelectorAll('.Accordion')).forEach(function (accordion) {

  var allowMultiple = accordion.hasAttribute('data-allow-multiple');
  var allowToggle = (allowMultiple) ? allowMultiple : accordion.hasAttribute('data-allow-toggle');

  var triggers = Array.prototype.slice.call(accordion.querySelectorAll('.Accordion-trigger'));
  var panels = Array.prototype.slice.call(accordion.querySelectorAll('.Accordion-panel'));


  accordion.addEventListener('click', change);
  
  function change(event) {
    var target = event.target;

    if (target.classList.contains('Accordion-trigger')) {
      var isExpanded = target.getAttribute('aria-expanded') == 'true';
      var active = accordion.querySelector('[aria-expanded="true"]');

      if (!allowMultiple && active && active !== target) {
        active.setAttribute('aria-expanded', 'false');
        document.getElementById(active.getAttribute('aria-controls')).style.height = "0px";

        if (!allowToggle) {
          active.removeAttribute('aria-disabled');
        }
      }

      if (!isExpanded) {
        target.setAttribute('aria-expanded', 'true');
        var pan = document.getElementById(target.getAttribute('aria-controls'));
        pan.style.height = pan.scrollHeight + 'px';

        if (!allowToggle) {
          target.setAttribute('aria-disabled', 'true');
        }
      }
      else if (allowToggle && isExpanded) {
        target.setAttribute('aria-expanded', 'false');
        document.getElementById(target.getAttribute('aria-controls')).style.height = "0px";
      }

      event.preventDefault();
    }
  };

  accordion.addEventListener('keydown', function (event) {
    var target = event.target;
    var key = event.which.toString();

    var isExpanded = target.getAttribute('aria-expanded') == 'true';
    var allowToggle = (allowMultiple) ? allowMultiple : accordion.hasAttribute('data-allow-toggle');

    // 33 = Page Up, 34 = Page Down
    var ctrlModifier = (event.ctrlKey && key.match(/33|34/));

    // Is this coming from an accordion header?
    if (target.classList.contains('Accordion-trigger')) {
      // Up/ Down arrow and Control + Page Up/ Page Down keyboard operations
      // 38 = Up, 40 = Down
      if (key.match(/38|40/) || ctrlModifier) {
        var index = triggers.indexOf(target);
        var direction = (key.match(/34|40/)) ? 1 : -1;
        var length = triggers.length;
        var newIndex = (index + length + direction) % length;

        triggers[newIndex].focus();

        event.preventDefault();
      }
      else if (key.match(/35|36/)) {
        // 35 = End, 36 = Home keyboard operations
        switch (key) {
          // Go to first accordion
          case '36':
            triggers[0].focus();
            break;
            // Go to last accordion
          case '35':
            triggers[triggers.length - 1].focus();
            break;
        }
        event.preventDefault();

      }

    }
  });

  accordion.querySelectorAll('.Accordion-trigger').forEach(function (trigger) {

    trigger.addEventListener('focus', function (event) {
      accordion.classList.add('focus');
    });

    trigger.addEventListener('blur', function (event) {
      accordion.classList.remove('focus');
    });

  });

  if (!allowToggle) {
    var expanded = accordion.querySelector('[aria-expanded="true"]');

    if (expanded) {
      expanded.setAttribute('aria-disabled', 'true');
    }
  }

  
  var oupen = accordion.querySelector('[aria-expanded="true"]');
  if (oupen) {
    var panel = document.getElementById(oupen.getAttribute('aria-controls'));
    panel.style.height = panel.scrollHeight + 'px';
  }
   
});

