(function () {
  var toast = document.querySelector('.toast');
  var timer;
  function notify(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(timer);
    timer = setTimeout(function () { toast.classList.remove('show'); }, 1800);
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    var ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok ? Promise.resolve() : Promise.reject();
  }

  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      copyText(btn.getAttribute('data-copy')).then(
        function () { notify('Copied'); },
        function () { notify('Copy failed'); }
      );
    });
  });

  var share = document.getElementById('share');
  if (share) {
    share.addEventListener('click', function () {
      var data = { title: document.title, url: location.href };
      if (navigator.share) {
        navigator.share(data).catch(function () {});
      } else {
        copyText(location.href).then(function () { notify('Link copied'); });
      }
    });
  }

  var qrOpen = document.getElementById('qr-open');
  var qr = document.getElementById('qr');
  if (qrOpen && qr) {
    qrOpen.addEventListener('click', function () { qr.showModal(); });
    qr.querySelector('[data-close]').addEventListener('click', function () { qr.close(); });
    qr.addEventListener('click', function (e) { if (e.target === qr) qr.close(); });
  }
})();
