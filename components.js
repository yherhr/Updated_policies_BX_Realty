/**
 * BX Realty — site behaviour (v2, security-hardened).
 *
 * The nav and footer are now baked into every page at build time, so this
 * file no longer injects HTML. It only wires behaviour, with every handler
 * attached via addEventListener — no inline onclick, no implicit
 * window.event — so the site runs under the strict Content-Security-Policy
 * declared in each page's <head> (script-src 'self').
 *
 * Forms: GitHub Pages has no backend, so submitting composes a pre-filled
 * email in the visitor's mail app (mailto:). This replaces the previous
 * behaviour, which showed "Message sent!" while silently discarding the
 * enquiry.
 */
(function () {
	'use strict';

	function ready(fn) {
		if (document.readyState !== 'loading') { fn(); }
		else { document.addEventListener('DOMContentLoaded', fn); }
	}

	ready(function () {
		/* ---------------- Mobile menu ---------------- */
		var burger = document.getElementById('navBurger');
		var menu   = document.getElementById('navMenu');

		if (burger && menu) {
			burger.addEventListener('click', function () {
				var open = menu.classList.toggle('is-open');
				burger.setAttribute('aria-expanded', open ? 'true' : 'false');
			});
		}

		/* ---------------- Listings tabs ---------------- */
		var tabButtons = document.querySelectorAll('[data-bxr-tab]');
		var tabSale    = document.getElementById('tab-sale');
		var tabRent    = document.getElementById('tab-rent');

		if (tabButtons.length && tabSale && tabRent) {
			tabButtons.forEach(function (btn) {
				btn.addEventListener('click', function () {
					var tab = btn.getAttribute('data-bxr-tab');

					tabSale.style.display = (tab === 'rent') ? 'none' : 'block';
					tabRent.style.display = (tab === 'rent') ? 'block' : 'none';

					tabButtons.forEach(function (b) {
						b.classList.remove('btn-dark');
						b.classList.add('btn-ghost');
						b.setAttribute('aria-pressed', 'false');
					});
					btn.classList.remove('btn-ghost');
					btn.classList.add('btn-dark');
					btn.setAttribute('aria-pressed', 'true');
				});
			});
		}

		/* ---------------- Mailto forms (contact + appraisal) ---------------- */
		document.querySelectorAll('form[data-bxr-mailto]').forEach(function (form) {
			form.addEventListener('submit', function (e) {
				e.preventDefault();

				if (!form.reportValidity()) { return; }

				var to      = form.getAttribute('data-bxr-mailto');
				var subject = form.getAttribute('data-bxr-subject') || 'Website enquiry';
				var lines   = [];

				form.querySelectorAll('input[name], select[name], textarea[name]').forEach(function (field) {
					var label = form.querySelector('label[for="' + field.id + '"]');
					var name  = label ? label.textContent.replace(/\s*\*\s*$/, '') : field.name;
					var value = field.value.trim();

					if (field.name === 'subject' && value) { subject = value + ' — website enquiry'; return; }
					if (field.name === 'message') { return; } // appended last
					if (value) { lines.push(name + ': ' + value); }
				});

				var msg = form.querySelector('[name="message"]');
				if (msg && msg.value.trim()) {
					lines.push('', msg.value.trim());
				}

				var href = 'mailto:' + encodeURIComponent(to) +
					'?subject=' + encodeURIComponent(subject) +
					'&body=' + encodeURIComponent(lines.join('\n'));

				window.location.href = href;

				var success = document.getElementById(form.id.replace('-form', '-success'));
				if (success) {
					form.style.display = 'none';
					success.style.display = 'block';
				}
			});
		});
	});
}());
