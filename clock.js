// Taskbar clock: HH:MM, 24-hour, ticks over on the minute.
(function () {
  var el = document.getElementById('clock');
  function tick() {
    var d = new Date();
    el.textContent = String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
    setTimeout(tick, 60000 - d.getSeconds() * 1000 - d.getMilliseconds());
  }
  tick();
})();
