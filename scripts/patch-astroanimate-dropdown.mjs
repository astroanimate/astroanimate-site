import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const dropdownPath = join(
  process.cwd(),
  "node_modules",
  "@astroanimate",
  "core",
  "dist",
  "internal",
  "dropdown.js",
);

const source = `var initialized = /* @__PURE__ */ new WeakMap();

function enhanceDropdown(root) {
  if (initialized.has(root)) return;

  const trigger = root.querySelector("[data-dropdown-trigger]");
  const content = root.querySelector("[data-dropdown-content]");
  const triggerMode = root.dataset.trigger || "click";
  const hoverDelay = Number(root.dataset.hoverDelay || 120);
  let closeTimer;

  if (!trigger || !content) return;

  const setOpen = (open) => {
    root.dataset.ready = "true";
    root.dataset.state = open ? "open" : "closed";
    trigger.setAttribute("aria-expanded", open ? "true" : "false");
    content.setAttribute("aria-hidden", open ? "false" : "true");
  };

  const toggle = () => {
    setOpen(root.dataset.state !== "open");
  };

  const close = () => setOpen(false);
  const open = () => setOpen(true);

  const onDocumentClick = (event) => {
    if (!root.contains(event.target)) close();
  };

  if (triggerMode === "hover") {
    const clearClose = () => window.clearTimeout(closeTimer);
    const delayedClose = () => {
      closeTimer = window.setTimeout(close, hoverDelay);
    };
    root.addEventListener("mouseenter", () => {
      clearClose();
      open();
    });
    root.addEventListener("mouseleave", delayedClose);
  } else {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      toggle();
    });
    document.addEventListener("click", onDocumentClick);
  }

  root.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
  });

  setOpen(false);
  initialized.set(root, true);
}

export { enhanceDropdown };
`;

await mkdir(dirname(dropdownPath), { recursive: true });
await writeFile(dropdownPath, source);
