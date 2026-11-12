/* P3LBA — navbar & footer bersama untuk semua halaman publik.
 * Pemakaian:
 *   <body data-page="tentang">
 *     <script src="assets/js/layout.js"></script>      ← menyisipkan navbar di posisi ini
 *     ...konten...
 *     <script>P3LBA.footer()</script>                  ← menyisipkan footer di posisi ini
 * Disisipkan secara sinkron sebelum Alpine.js (defer) berjalan, jadi x-data di navbar tetap aktif.
 */
(function () {
  var NAV = [
    { id: 'beranda',   href: 'index.html',     label: 'Beranda' },
    { id: 'tentang',   href: 'tentang.html',   label: 'Tentang Kami' },
    { id: 'program',   href: 'program.html',   label: 'Program Kerja' },
    { id: 'dampak',    href: 'dampak.html',    label: 'Dampak &amp; Cerita' },
    { id: 'publikasi', href: 'publikasi.html', label: 'Publikasi' },
    { id: 'kontak',    href: 'kontak.html',    label: 'Kontak' },
  ];
  var page = document.body.getAttribute('data-page') || 'beranda';

  function here(s) {
    var el = document.currentScript;
    el.insertAdjacentHTML('beforebegin', s);
  }

  function header() {
    var desk = NAV.map(function (n) {
      return n.id === page
        ? '<li><a href="' + n.href + '" aria-current="page" class="border-b-2 border-white pb-0.5 text-white">' + n.label + '</a></li>'
        : '<li><a href="' + n.href + '" class="hover:text-white">' + n.label + '</a></li>';
    }).join('');
    var mobile = NAV.map(function (n) {
      return '<li><a href="' + n.href + '"' + (n.id === page ? ' aria-current="page"' : '') +
             ' class="block rounded px-3 py-2 ' + (n.id === page ? 'bg-white/10 text-white' : 'hover:bg-white/10') + '">' + n.label + '</a></li>';
    }).join('');

    return '' +
'<header x-data="{ open: false, scrolled: false }" @scroll.window="scrolled = window.scrollY > 40"' +
'        :class="scrolled ? \'bg-forest-800/95 backdrop-blur shadow-lg\' : \'bg-forest-700\'"' +
'        class="fixed inset-x-0 top-0 z-50 bg-forest-700 transition-colors duration-300">' +
'  <nav class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">' +
'    <a href="index.html" class="flex items-center gap-3">' +
'      <span class="grid h-12 w-12 place-items-center rounded-full bg-white p-0.5 ring-2 ring-white/30">' +
'        <img src="p3lba-logo.png" alt="Logo P3LBA" class="h-full w-full rounded-full object-contain"></span>' +
'      <span class="leading-tight text-white">' +
'        <span class="block font-display text-xl font-bold tracking-wide">P3LBA</span>' +
'        <span class="hidden text-[0.68rem] text-white/70 sm:block">Perempuan Peduli Literasi Buta Aksara</span></span>' +
'    </a>' +
'    <ul class="hidden items-center gap-7 text-small font-medium text-white/85 lg:flex">' + desk + '</ul>' +
'    <div class="flex items-center gap-2">' +
'      <a href="login.html" class="hidden items-center gap-2 rounded-md px-3 py-2 text-small font-semibold text-white/85 transition hover:text-white sm:inline-flex">' +
'        <i class="fa-regular fa-circle-user"></i> Masuk</a>' +
'      <a href="kontak.html" class="hidden items-center gap-2 rounded-md border border-white/80 px-4 py-2 text-small font-semibold text-white transition hover:bg-white hover:text-forest-800 sm:inline-flex">' +
'        Ayo Terlibat <i class="fa-solid fa-arrow-right text-xs"></i></a>' +
'      <button @click="open = !open" class="grid h-10 w-10 place-items-center rounded-md text-white lg:hidden" aria-label="Buka menu">' +
'        <i class="fa-solid" :class="open ? \'fa-xmark\' : \'fa-bars\'"></i></button>' +
'    </div>' +
'  </nav>' +
'  <div x-cloak x-show="open" x-transition.origin.top @click.outside="open = false" class="border-t border-white/10 bg-forest-800 lg:hidden">' +
'    <ul class="space-y-1 px-4 py-4 text-white/90">' + mobile +
'      <li><a href="login.html" class="block rounded px-3 py-2 hover:bg-white/10"><i class="fa-regular fa-circle-user mr-2"></i>Masuk</a></li>' +
'      <li><a href="kontak.html" class="mt-2 block rounded bg-terra-500 px-3 py-2 text-center font-semibold">Ayo Terlibat</a></li>' +
'    </ul>' +
'  </div>' +
'</header>';
  }

  function footer() {
    var links = NAV.filter(function (n) { return n.id !== 'beranda'; }).map(function (n) {
      return '<li><a href="' + n.href + '" class="hover:text-white">' + n.label + '</a></li>';
    }).join('');

    here('' +
'<footer class="bg-forest-950 text-white/75">' +
'  <div class="mx-auto flex max-w-3xl flex-col items-center px-4 py-16 text-center sm:px-6 lg:px-8">' +
'    <a href="index.html" class="flex items-center gap-3">' +
'      <span class="grid h-14 w-14 place-items-center rounded-full bg-white p-0.5"><img src="p3lba-logo.png" alt="" class="h-full w-full rounded-full object-contain"></span>' +
'      <span class="font-display text-h3 text-white">P3LBA</span></a>' +
'    <p class="mt-6 max-w-xl font-display text-h4 font-medium text-white/90">Membuka jendela dunia melalui aksara, memberdayakan perempuan untuk masa depan.</p>' +
'    <div class="mt-6 flex justify-center gap-3">' +
'      <a href="#" aria-label="Facebook"  class="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-terra-500"><i class="fa-brands fa-facebook-f"></i></a>' +
'      <a href="#" aria-label="Instagram" class="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-terra-500"><i class="fa-brands fa-instagram"></i></a>' +
'      <a href="#" aria-label="YouTube"   class="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-terra-500"><i class="fa-brands fa-youtube"></i></a>' +
'      <a href="#" aria-label="WhatsApp"  class="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-terra-500"><i class="fa-brands fa-whatsapp"></i></a>' +
'    </div>' +
'    <nav aria-label="Halaman" class="mt-10"><ul class="flex flex-wrap justify-center gap-x-6 gap-y-2 text-small">' + links + '</ul></nav>' +
'    <nav aria-label="Informasi" class="mt-3"><ul class="flex flex-wrap justify-center gap-x-6 gap-y-2 text-small text-white/55">' +
'      <li><a href="#" class="hover:text-white">Legalitas</a></li>' +
'      <li><a href="#" class="hover:text-white">Struktur Pengurus</a></li>' +
'      <li><a href="#" class="hover:text-white">Laporan Tahunan</a></li>' +
'      <li><a href="typography.html" class="hover:text-white">Panduan Tipografi</a></li>' +
'      <li><a href="login.html" class="hover:text-white">Masuk Pengelola</a></li>' +
'    </ul></nav>' +
'  </div>' +
'  <div class="border-t border-white/10">' +
'    <div class="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-6 text-center text-xs text-white/45 sm:px-6 lg:px-8">' +
'      <p>© 2026 Perkumpulan Perempuan Peduli Literasi Buta Aksara (P3LBA). All rights reserved.</p>' +
'      <a href="https://nokensoft.com" target="_blank" rel="noopener" class="inline-flex items-center gap-2 hover:text-white">' +
'        Powered by <img src="assets/img/nokensoft-logo.png" alt="" class="h-5 w-auto"> <span class="font-semibold text-white/70">Nokensoft.com</span></a>' +
'    </div>' +
'  </div>' +
'</footer>');
  }

  here(header());
  window.P3LBA = { footer: footer };
})();
