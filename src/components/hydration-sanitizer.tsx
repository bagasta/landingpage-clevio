"use client";

const attributeNames = ["bis_skin_checked", "bis_register"];
const attributePrefixes = ["__processed_"];

const scrubElement = (element: Element) => {
  const names = element.getAttributeNames();
  if (!names.length) {
    return;
  }

  for (const name of names) {
    if (attributeNames.includes(name) || attributePrefixes.some((prefix) => name.startsWith(prefix))) {
      element.removeAttribute(name);
    }
  }
};

const scrubTree = (root: Document | Element) => {
  if (root instanceof Element) {
    scrubElement(root);
  }

  const elements = root.querySelectorAll?.("*");
  if (!elements) {
    return;
  }

  elements.forEach((node) => {
    scrubElement(node);
  });
};

const observeMutations = () => {
  const target = document.documentElement;
  if (!target) {
    return;
  }

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "attributes" && mutation.target instanceof Element) {
        scrubElement(mutation.target);
      }

      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) {
            scrubTree(node);
          }
        });
      }
    }
  });

  observer.observe(target, {
    attributes: true,
    subtree: true,
    childList: true,
  });

  const disconnect = () => observer.disconnect();
  window.addEventListener("load", disconnect, { once: true });
  window.setTimeout(disconnect, 5000);
};

if (typeof document !== "undefined") {
  scrubTree(document);
  observeMutations();
}

export function HydrationSanitizer() {
  return null;
}

