/* components.js — shared nav + footer for all pages */

const NAV = `
<nav class="site-nav">
  <div class="nav-inner">
    <a href="index.html" class="nav-logo">
      <img src="assets/images/bxrealty-logo.png" alt="BX Realty" />
      <div class="nav-logo-wordmark"><span>BX Realty</span><span>Bathurst &amp; Region</span></div>
    </a>
    <ul class="nav-menu" id="navMenu">
      <li><a href="index.html">Home</a></li>
      <li><a href="listings.html">Properties</a></li>
      <li><a href="services.html">Services</a></li>
      <li><a href="pricing.html">Pricing</a></li>
      <li><a href="team.html">Our Team</a></li>
      <li><a href="blog.html">News</a></li>
      <li><a href="contact.html">Contact</a></li>
    </ul>
    <a href="contact.html" class="btn btn-outline nav-cta">Get in Touch</a>
    <button class="nav-burger" id="navBurger" aria-label="Menu"><span></span><span></span><span></span></button>
  </div>
</nav>`;

const FOOTER = `
<div class="cta-bar"><p>Ready to make a move? Call Ellie today — <a href="tel:0498193223">0498 193 223</a></p></div>
<footer class="site-footer">
  <div class="footer-grid">
    <div class="footer-brand">
      <div class="footer-logo"><img src="assets/images/bxrealty-logo.png" alt="BX Realty" /></div>
      <p>A dedicated real estate agency serving Bathurst and the surrounding region. Honest, professional property services for buyers, sellers, and investors.</p>
      <div class="social-links">
        <a href="https://www.instagram.com/ellie_agentchapman_realtor/" class="social-link" target="_blank" rel="noopener" aria-label="Instagram">IG</a>
        <a href="https://www.facebook.com/profile.php?id=61573810007004" class="social-link" target="_blank" rel="noopener" aria-label="Facebook">FB</a>
        <a href="https://www.tiktok.com/@ellie.begg.realto" class="social-link" target="_blank" rel="noopener" aria-label="TikTok">TT</a>
      </div>
    </div>
    <div class="footer-col">
      <h4>Navigate</h4>
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="listings.html">Properties</a></li>
        <li><a href="services.html">Services</a></li>
        <li><a href="pricing.html">Pricing</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Company</h4>
      <ul>
        <li><a href="team.html">Our Team</a></li>
        <li><a href="blog.html">News &amp; Insights</a></li>
        <li><a href="appraisal.html">Get an Appraisal</a></li>
        <li><a href="contact.html">Contact Us</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Find Us</h4>
      <address class="footer-addr">
        Shop 1/82 George St<br>
        Bathurst NSW 2795<br>
        PO Box 618, Bathurst NSW 2795<br><br>
        <a href="tel:0498193223" style="color:var(--gold);">0498 193 223</a><br>
        <a href="mailto:ellie@bxrealty.com.au" style="color:var(--gold);">ellie@bxrealty.com.au</a>
      </address>
    </div>
  </div>
  <div class="footer-bottom">
    <span>&copy; 2025 BX Realty Pty Ltd. All rights reserved.</span>
    <span><a href="privacy.html">Privacy Policy &amp; Disclaimer</a> &nbsp;|&nbsp; <a href="terms.html">Terms of Use</a></span>
  </div>
</footer>
<div class="licence-bar"><div class="container">Licence No. [Pending — to be supplied] &mdash; BX Realty Pty Ltd</div></div>`;

document.addEventListener('DOMContentLoaded', function(){
  var navT = document.getElementById('site-nav');
  var footT = document.getElementById('site-footer');
  if(navT) navT.innerHTML = NAV;
  if(footT) footT.innerHTML = FOOTER;

  // Active link
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a').forEach(function(a){
    if(a.getAttribute('href') === path) a.classList.add('active');
  });

  // Mobile menu toggle
  var burger = document.getElementById('navBurger');
  var menu = document.getElementById('navMenu');
  if(burger && menu){
    burger.addEventListener('click', function(){
      var open = menu.style.display === 'flex';
      menu.style.cssText = open ? '' : 'display:flex;flex-direction:column;position:absolute;top:72px;left:0;right:0;background:var(--black-mid);padding:16px 28px;gap:6px;border-bottom:1px solid rgba(225,186,98,.14);box-shadow:0 8px 32px rgba(0,0,0,.4);z-index:99;';
    });
  }
});
