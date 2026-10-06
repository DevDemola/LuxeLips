import { useEffect, useRef } from "react";

/** Sets document.title for the current page. */
export function useTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — Luxe Lips` : "Luxe Lips — Glosses, oils & tints for every shade of you";
  }, [title]);
}

/**
 * Modal behaviour for drawers/overlays: locks body scroll, closes on Escape,
 * traps Tab focus inside, and restores focus to the trigger on close.
 */
export function useModal(open, onClose) {
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const previouslyFocused = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const node = ref.current;
    const focusables = () =>
      node
        ? [...node.querySelectorAll('a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])')]
        : [];
    // Focus the first focusable element (or the panel itself).
    requestAnimationFrame(() => {
      const first = node?.querySelector("[data-autofocus]") || focusables()[0];
      (first || node)?.focus();
    });

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  return ref;
}
