export const headerComponent = `
<header class="header__hero">
  <div class="header__top">
    <div class="header__loop">
      <img src="/images/svg/search.svg" alt="search">
    </div>
    <h1 class="header__logo">Avion</h1>
    <div class="header__user">
      <img src="/images/svg/shopping--cart.svg" alt="shopping--cart">
      <img src="/images/svg/user--avatar.svg" alt="user--avatar">
    </div>
    <!-- Burger icon (only visible on mobile) -->
    <div class="header__buttons--mobile">
      <div class="header__loop--mobile"> 
        <img src="/images/svg/search.svg" alt="search">
      </div>
      <button class="header__burger" aria-label="Toggle menu">
        <div class="burger-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
    </div>
  </div>

  <div class="header__line"></div>

  <!-- Mobile menu (hidden by default) -->
  <nav class="header__mobile-menu">
    <div class="header__user-mobile">
      <img src="/images/svg/shopping--cart.svg" alt="shopping--cart">
      <img src="/images/svg/user--avatar.svg" alt="user--avatar">
    </div>
    <ul class="header__list">
      <li><a href="#" class="header__list__item">Plant pots</a></li>
      <li><a href="#" class="header__list__item">Ceramics</a></li>
      <li><a href="#" class="header__list__item">Tables</a></li>
      <li><a href="#" class="header__list__item">Chairs</a></li>
      <li><a href="#" class="header__list__item">Crockery</a></li>
      <li><a href="#" class="header__list__item">Tableware</a></li>
      <li><a href="#" class="header__list__item">Cutlery</a></li>
    </ul>
  </nav>

  <!-- Desktop menu (always visible on large screens) -->
  <div class="header__bottom">
    <ul class="header__list">
      <li><a href="#" class="header__list__item">Plant pots</a></li>
      <li><a href="#" class="header__list__item">Ceramics</a></li>
      <li><a href="#" class="header__list__item">Tables</a></li>
      <li><a href="#" class="header__list__item">Chairs</a></li>
      <li><a href="#" class="header__list__item">Crockery</a></li>
      <li><a href="#" class="header__list__item">Tableware</a></li>
      <li><a href="#" class="header__list__item">Cutlery</a></li>
    </ul>
  </div>
</header>
`;

document.addEventListener("DOMContentLoaded", function () {
  const burger = document.querySelector(".header__burger");
  const mobileMenu = document.querySelector(".header__mobile-menu");

  if (burger && mobileMenu) {
    burger.addEventListener("click", function () {
      mobileMenu.classList.toggle("active");
      burger.classList.toggle("active");
    });

    document.addEventListener("click", function (event) {
      if (
        !mobileMenu.contains(event.target) &&
        !burger.contains(event.target)
      ) {
        mobileMenu.classList.remove("active");
        burger.classList.remove("active");
      }
    });
  }
});
