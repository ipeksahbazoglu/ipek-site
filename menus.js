// File / Edit / View / Help menus, the About dialog and status bar messages.
// Shared by work.html and play.html. Behaviour comes from data- attributes on menu items:
//   data-copy="text" data-label="Name"  copy text, confirm in the status bar
//   data-scroll="#id"                   scroll the .doc pane to that section
//   data-view="icons|list"              switch the [data-pane] icon view
//   data-about                          open the About dialog
(function () {
  var nav = document.querySelector('.menu98');
  if (!nav) return;

  var buttons = Array.prototype.slice.call(nav.querySelectorAll('.mbtn'));
  var status = document.querySelector('[data-status]');
  var open = null;
  var dialog = null;
  var returnFocus = null;

  function itemsOf(btn) {
    return Array.prototype.slice.call(btn.nextElementSibling.querySelectorAll('.item'));
  }

  function closeMenu(focusButton) {
    if (!open) return;
    open.setAttribute('aria-expanded', 'false');
    open.nextElementSibling.hidden = true;
    if (focusButton) open.focus();
    open = null;
  }

  function openMenu(btn, focusFirst) {
    if (open && open !== btn) closeMenu();
    open = btn;
    btn.setAttribute('aria-expanded', 'true');
    btn.nextElementSibling.hidden = false;
    if (focusFirst) itemsOf(btn)[0].focus();
  }

  function neighbour(btn, step) {
    var i = buttons.indexOf(btn);
    return buttons[(i + step + buttons.length) % buttons.length];
  }

  function say(msg) {
    if (status) status.textContent = msg;
  }

  function copy(text, label) {
    var done = function (ok) { say(ok ? label + ' copied to clipboard' : 'Could not copy: ' + text); };
    try {
      navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
    } catch (e) {
      done(false);
    }
  }

  function setView(view) {
    var pane = document.querySelector('[data-pane]');
    if (pane) pane.classList.toggle('view-list', view === 'list');
    nav.querySelectorAll('[data-view]').forEach(function (el) {
      el.setAttribute('aria-checked', String(el.dataset.view === view));
    });
  }

  function scrollDoc(selector) {
    var doc = document.querySelector('.doc');
    var target = document.querySelector(selector);
    if (doc && target) doc.scrollTo({ top: target.offsetTop - 12, behavior: 'smooth' });
  }

  function openAbout() {
    if (!dialog) {
      dialog = document.createElement('div');
      dialog.className = 'win98 dialog';
      dialog.setAttribute('role', 'dialog');
      dialog.setAttribute('aria-modal', 'true');
      dialog.setAttribute('aria-labelledby', 'about-title');
      dialog.innerHTML =
        '<div class="title98"><span id="about-title">About</span>' +
        '<button class="btn98 raised" type="button" aria-label="Close" data-close><svg width="8" height="7" viewBox="0 0 8 7" shape-rendering="crispEdges" aria-hidden="true"><path d="M0 0h2v1h1v1h2v-1h1v-1h2v1h-1v1h-1v1h-1v1h1v1h1v1h1v1h-2v-1h-1v-1h-2v1h-1v1h-2v-1h1v-1h1v-1h1v-1h-1v-1h-1v-1h-1z" fill="#000000"/></svg></button></div>' +
        '<div class="dialog-body"><svg width="32" height="32" viewBox="0 0 16 16" shape-rendering="crispEdges" aria-hidden="true"><path d="M5 2h6v1h2v2h1v6h-1v2h-2v1H5v-1H3v-2H2V5h1V3h2z" fill="#d1286a"/><path d="M5 6h2v2H5zM9 6h2v2H9z" fill="#ffffff"/></svg>' +
        '<div><b>İpek\'s corner of the internet</b><br>Made by hand, 2026.<br>Background ideas from teppy\'s layouts.<br>Penguin Pool photo © RIBA Library Photographs Collection.</div></div>' +
        '<div class="dialog-foot"><button class="okbtn raised" type="button" data-close>OK</button></div>';
      dialog.addEventListener('click', function (e) {
        if (e.target.closest('[data-close]')) closeAbout();
      });
      document.body.appendChild(dialog);
    }
    dialog.hidden = false;
    dialog.querySelector('.okbtn').focus();
  }

  function closeAbout() {
    dialog.hidden = true;
    if (returnFocus) returnFocus.focus();
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (open === btn) closeMenu(); else openMenu(btn);
    });
    btn.addEventListener('mouseenter', function () {
      if (open && open !== btn) openMenu(btn);
    });
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        openMenu(btn, true);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        var next = neighbour(btn, e.key === 'ArrowRight' ? 1 : -1);
        next.focus();
        if (open) openMenu(next);
      }
    });
  });

  nav.addEventListener('keydown', function (e) {
    var item = e.target.closest('.item');
    if (!item || !open) return;
    var list = itemsOf(open);
    var i = list.indexOf(item);
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      list[(i + (e.key === 'ArrowDown' ? 1 : -1) + list.length) % list.length].focus();
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      openMenu(neighbour(open, e.key === 'ArrowRight' ? 1 : -1), true);
    }
  });

  nav.addEventListener('click', function (e) {
    var item = e.target.closest('.item');
    if (!item) return;
    var d = item.dataset;
    returnFocus = open;
    if (d.copy) copy(d.copy, d.label);
    if (d.view) setView(d.view);
    if (d.scroll) { e.preventDefault(); scrollDoc(d.scroll); }
    if ('about' in d) openAbout();
    closeMenu();
  });

  nav.addEventListener('focusout', function (e) {
    if (open && e.relatedTarget && !nav.contains(e.relatedTarget)) closeMenu();
  });

  document.addEventListener('click', function (e) {
    if (open && !nav.contains(e.target)) closeMenu();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (dialog && !dialog.hidden) closeAbout();
    else closeMenu(true);
  });
})();
