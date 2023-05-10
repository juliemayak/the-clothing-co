
import gsap from "gsap";
import scrollLocker from "@/js/scroll-locker";

class CartMenu {
  constructor() {
    this.cartMenu = document.querySelector("[data-cart-menu]");
    this.cartMenuModal = document.querySelector("[data-cart-menu-modal]");
    this.cartMenuContent = document.querySelector("[data-cart-menu-content]");
  }

  openCartMenu() {
    scrollLocker.lock();

    const tl = gsap.timeline();
    tl
      .fromTo(
        this.cartMenu,
        {
          autoAlpha: 0,
          pointerEvents: "none",
        },
        {
          autoAlpha: 1,
          pointerEvents: "all",
          duration: 0.25,
          ease: "ease.out",
        }
      )
      .fromTo(
        this.cartMenuModal,
        {
          autoAlpha: 0,
          x: "100%"
        },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.25,
          ease: "ease.out",
        },
        0
      )
      .fromTo(
        this.cartMenuContent.children,
        {
          autoAlpha: 0,
          scale: 0.8,
          overwrite: true
        },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.2,
          ease: "bounce2.out",
          stagger: 0.1,
        },
        0.45
      );
  }
  closeCartMenu() {
    scrollLocker.unlock();
    gsap.to(
      this.cartMenuModal,
      {
        autoAlpha: 0,
        x: "100%",
        duration: 0.25,
        ease: "ease.out",
      }
    )
    gsap.to(
      this.cartMenu,
      {
        autoAlpha: 0,
        pointerEvents: "none",
        duration: 0.25,
        ease: "ease.out",
      }
    )
  }
}

export default CartMenu;