import gsap from "gsap";

class Dropdown {
  constructor() {
    this.dropdownBtn = document.querySelector("[data-dropdown-btn]");
    this.dropdownList = document.querySelector("[data-dropdown-list]");
    this.isOpen = false;
    this.addEvents();
  }

  addEvents() {
    this.dropdownBtn.addEventListener("click", () => this.toggle());
    document.addEventListener('click', (e) => this.handleOutsideClick(e));
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    const tl = gsap.timeline({
      onComplete: () => {
        this.isOpen = true;
      },
    });
    tl.fromTo(
      this.dropdownList,
      {
        height: 0,
      },
      {
        duration: 0.5,
        height: "auto",
        ease: "power2.out",
      }
    );

    tl.fromTo(
      this.dropdownList,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.2, ease: "sine.out" },
      0
    );
  }

  close() {
    if (!this.open) {
      return;
    }
    const tl = gsap.timeline({
      onComplete: () => {
        this.isOpen = false;
      },
    });

    tl.to(this.dropdownList, {
      height: 0,
      duration: 0.3,
      ease: "power1.out",
      overwrite: true,
    });

    tl.to(this.dropdownList, { autoAlpha: 0, duration: 0.2, overwrite: false }, 0.2);
  }

  handleOutsideClick(e) {
    if (this.dropdownBtn && !this.dropdownBtn.contains(e.target)) {
      this.close();
    }
  }
}

export default Dropdown;