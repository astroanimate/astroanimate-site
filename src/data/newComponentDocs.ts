export type PropRow = {
  prop: string;
  type: string;
  defaultValue: string;
  description: string;
};

export type ComponentDoc = {
  name: string;
  slug: string;
  section: string;
  description: string;
  usage: string;
  renders: string;
  install: string;
  props: PropRow[];
  note?: string;
  useWhen: string[];
  avoidWhen: string[];
  accessibility: string[];
  performance: string[];
  credits: string;
  related: string[];
  internalLinks: string[];
  isNew: boolean;
};

const escapeCode = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

export const highlightCode = (value: string) => {
  const tokens: string[] = [];
  const hold = (token: string) => {
    const key = `__AA_CODE_TOKEN_${tokens.length}__`;
    tokens.push(token);
    return key;
  };

  const highlighted = escapeCode(value)
    .replace(/("[^"]*"|'[^']*')/g, (match) =>
      hold(`<span class="string">${match}</span>`),
    )
    .replace(/^---$/gm, () => hold('<span class="comment">---</span>'))
    .replace(/(&lt;\/?)([A-Z][A-Za-z0-9]*)(?=[\s&gt;])/g, (_, start, name) =>
      `${start}${hold(`<span class="component">${name}</span>`)}`,
    )
    .replace(/(&lt;\/?)([a-z][A-Za-z0-9-]*)(?=[\s&gt;])/g, (_, start, name) =>
      `${start}${hold(`<span class="tag">${name}</span>`)}`,
    )
    .replace(/\b([A-Za-z_:][A-Za-z0-9_:-]*)(=)/g, (_, name, equals) =>
      `${hold(`<span class="prop">${name}</span>`)}${equals}`,
    )
    .replace(/\b(import|from|const|let|interface|export|return|default|true|false)\b/g, (match) =>
      hold(`<span class="keyword">${match}</span>`),
    )
    .replace(/\b(\d+(?:\.\d+)?)\b/g, (match) =>
      hold(`<span class="number">${match}</span>`),
    );

  return tokens.reduce(
    (result, token, index) => result.replace(`__AA_CODE_TOKEN_${index}__`, token),
    highlighted,
  );
};

export const newComponentDocs: ComponentDoc[] = [
  {
    name: "AnimatedTabs",
    slug: "animated-tabs",
    section: "Navigation",
    description:
      "A CSS-first tab component with zero-hydration and smooth JavaScript-enhanced indicator transitions.",
    usage: `---\nimport AnimatedTabs from "@astroanimate/core/AnimatedTabs";\n---\n\n<AnimatedTabs\n  tabs={[\n    { id: "profile", label: "Profile" },\n    { id: "settings", label: "Settings" }\n  ]}\n  variant="pill"\n>\n  <div slot="panel:profile">Profile Content</div>\n  <div slot="panel:settings">Settings Content</div>\n</AnimatedTabs>`,
    renders:
      "Renders a keyboard-accessible tablist and content panels defined via dynamic slots.",
    install: "npm install @astroanimate/core",
    props: [
      { prop: "tabs", type: "TabDef[]", defaultValue: "[]", description: 'Array of tab definitions `{ id: string, label: string }`' },
      { prop: "defaultTab", type: "string", defaultValue: "", description: "The `id` of the initially active tab" },
      { prop: "variant", type: '"pill" | "underline"', defaultValue: '"pill"', description: "Visual style variant" },
      { prop: "color", type: "string", defaultValue: '"#3b82f6"', description: "Accent color for the active indicator" },
      { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: "Tab sizing" },
      { prop: "backgroundColor", type: "string", defaultValue: '"#f1f5f9"', description: "Background color for the tablist container" },
      { prop: "inactiveTextColor", type: "string", defaultValue: '"#64748b"', description: "Text color for inactive tabs" },
      { prop: "activeTextColor", type: "string", defaultValue: "", description: "Text color for active tabs" },
      { prop: "showBorder", type: "boolean", defaultValue: "true", description: "Show a border around the active panel" },
      { prop: "fullWidth", type: "boolean", defaultValue: "true", description: "Make tabs evenly fill the available width" },
      { prop: "class", type: "string", defaultValue: '""', description: "Additional CSS classes" },
    ],
    useWhen: [
      "Organizing related, mutually exclusive content into distinct views",
      "Needing a robust, resilient tab solution that initially renders without JavaScript",
      "Requiring multiple independent tab instances on the same page",
    ],
    avoidWhen: [
      "Building primary site navigation (use standard links instead of tabs)",
      "Content inside hidden panels requires immediate indexing by basic SEO bots",
    ],
    accessibility: [
      "Implements full keyboard navigation (Arrow keys, `Home`, `End`)",
      'Uses standard ARIA attributes (`role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `tabindex`)',
      "Fully respects `prefers-reduced-motion: reduce` by disabling CSS animations and JS position updates",
    ],
    performance: [
      "**Zero Hydration:** Requires no framework hydration overhead",
      "**CSS-First:** Layout and initial state are driven strictly by data-attributes, avoiding Cumulative Layout Shift (CLS)",
    ],
    credits: "Barsan",
    related: ["Needs verification"],
    internalLinks: ["/docs/installation/", "/docs/quick-start/", "/docs/api/animatedtabs/"],
    isNew: true,
  },
  {
    name: "CountUp",
    slug: "count-up",
    section: "Text Animations",
    description:
      "An animated number counter that animates from a starting value to a target value on scroll.",
    usage: `---\nimport CountUp from "@astroanimate/core/CountUp";\n---\n\n<CountUp\n  value={1500}\n  prefix="$"\n  duration={2500}\n  enhance={true}\n/>`,
    renders:
      "Renders a numerical value that smoothly counts up when it enters the viewport.",
    install: "npm install @astroanimate/core",
    props: [
      { prop: "value", type: "number", defaultValue: "Required", description: "The final target number" },
      { prop: "start", type: "number", defaultValue: "0", description: "The initial starting number" },
      { prop: "duration", type: "number", defaultValue: "2000", description: "Animation duration in milliseconds" },
      { prop: "decimals", type: "number", defaultValue: "0", description: "Number of decimal places to display" },
      { prop: "prefix", type: "string", defaultValue: '""', description: "String before the number" },
      { prop: "suffix", type: "string", defaultValue: '""', description: "String after the number" },
      { prop: "enhance", type: "boolean", defaultValue: "true", description: "Enable JavaScript animation" },
    ],
    useWhen: [
      "Highlighting key metrics, statistics, or milestones",
      'Building engaging landing pages with numerical achievements (e.g., "Active Users", "Downloads")',
    ],
    avoidWhen: [
      "Displaying dense tables of financial data where animations would be distracting",
      "Requiring users to copy precise numbers immediately on page load",
    ],
    accessibility: [
      "Renders the final, formatted target number as a static baseline (Zero-JS fallback)",
      "Uses `tabular-nums` by default to prevent layout shifting during the animation",
      "CSS transitions respect `prefers-reduced-motion: reduce`",
    ],
    performance: [
      "**Zero-JS Fallback:** Server-renders the fully formatted number immediately",
      "**Viewport Aware:** Leverages Intersection Observer (`threshold`) to only run animations when visible",
    ],
    credits: "Barsan",
    related: ["Needs verification"],
    internalLinks: ["/docs/installation/", "/docs/quick-start/", "/docs/api/countup/"],
    isNew: true,
  },
  {
    name: "CardStack",
    slug: "card-stack",
    section: "Cards",
    description:
      "An interactive, 3D card stack component supporting drag-and-swipe gestures with a CSS-first layout and zero hydration overhead.",
    usage: `---\nimport CardStack from "@astroanimate/core/CardStack";\n\nconst myCards = [\n  { title: "Great UI", content: "Love the stack effect!", name: "Alice", role: "Designer" },\n  { title: "Smooth", content: "Animations are flawless.", name: "Bob", role: "Dev" }\n];\n---\n\n<CardStack cards={myCards} />`,
    renders:
      "Renders a visually layered stack of cards that users can drag and swipe to reveal the next item.",
    install: "npm install @astroanimate/core",
    props: [
      { prop: "cards", type: "Card[]", defaultValue: "", description: "Array of card data objects" },
      { prop: "enhance", type: "boolean", defaultValue: "true", description: "Enable JS drag/swipe interactions" },
      { prop: "stackSize", type: "number", defaultValue: "3", description: "Maximum number of visible layered cards" },
      { prop: "swipeThreshold", type: "number", defaultValue: "120", description: "Drag distance (px) required to trigger a swipe" },
      { prop: "rotationSensitivity", type: "number", defaultValue: "20", description: "Rotational tilt factor during drag" },
      { prop: "animationDuration", type: "number", defaultValue: "500", description: "Fly-out swipe animation duration in ms" },
      { prop: "cardBackgroundColor", type: "string", defaultValue: '"#ffffff"', description: "Fallback background color for cards" },
      { prop: "cardTextColor", type: "string", defaultValue: '"#1a1a1a"', description: "Fallback text color for cards" },
    ],
    note:
      "Card object requires `title` and `content`. Optional fields: `id`, `name`, `role`, `color`, `image`, `bgColor`, `textColor`.",
    useWhen: [
      "Showcasing a collection of testimonials, reviews, or bite-sized tips",
      'Building an engaging "Tinder-style" swipe interface',
      "Displaying multiple distinct items in a constrained screen space",
    ],
    avoidWhen: [
      "Cards contain complex interactive elements (links, inputs) that conflict with drag gestures",
      "Users need to easily refer back to previously swiped content (swipes cycle to the back of the stack)",
    ],
    accessibility: [
      "Fully respects `prefers-reduced-motion: reduce` by disabling CSS transitions and JavaScript drag handlers",
    ],
    performance: [
      "**Zero Hydration:** Interactive logic is powered by a lightweight, vanilla JS inline script",
      "**CSS-First:** Initial 3D layout and layering are handled entirely by CSS (`nth-last-child`, `perspective`, `translate3d`)",
      "**Hardware Accelerated:** Uses `requestAnimationFrame` and `will-change: transform` for 60fps drag physics",
    ],
    credits: "Barsan",
    related: ["Needs verification"],
    internalLinks: ["/docs/installation/", "/docs/quick-start/", "/docs/api/cardstack/"],
    isNew: true,
  },
  {
    name: "Dock",
    slug: "dock",
    section: "Navigation",
    description:
      "A macOS-inspired, highly interactive navigation dock with hover magnification.",
    usage: `---\nimport Dock from "@astroanimate/core/Dock";\n---\n\n<Dock enhance={true} position="bottom" size="md">\n  <a class="dock-item" href=\"/docs\">Docs</a>\n  <a class="dock-item" href=\"/examples\">Examples</a>\n</Dock>`,
    renders:
      "Renders a compact, visually engaging floating navigation dock.",
    install: "npm install @astroanimate/core",
    props: [
      { prop: "enhance", type: "boolean", defaultValue: "false", description: "Enable interactive hover magnification" },
      { prop: "magnification", type: "number", defaultValue: "1.8", description: "Maximum scale factor when hovering" },
      { prop: "distance", type: "number", defaultValue: "150", description: "Proximity (px) to trigger magnification" },
      { prop: "position", type: '"bottom" | "top"', defaultValue: '"bottom"', description: "Screen position and tooltip alignment" },
      { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: "Base size of the dock and items" },
      { prop: "color", type: "string", defaultValue: '"rgba(20, 20, 20, 0.7)"', description: "Background color of the dock wrapper" },
      { prop: "blur", type: "string", defaultValue: '"20px"', description: "Backdrop blur intensity" },
      { prop: "class", type: "string", defaultValue: '""', description: "Additional CSS classes" },
    ],
    note: "Component also accepts standard HTML `<nav>` attributes.",
    useWhen: [
      "Building web applications, dashboards, or portfolios with a desktop-OS aesthetic",
      "Consolidating primary navigation into a compact, visually engaging floating bar",
    ],
    avoidWhen: [
      "Designing strictly for mobile devices (hover interactions do not translate to touch)",
      "Building highly conservative enterprise interfaces where playful magnification might be distracting",
    ],
    accessibility: [
      'Implements standard ARIA attributes (`role="toolbar"`, `aria-label="Application dock"`)',
      "Fully respects `prefers-reduced-motion: reduce` by disabling JS tracking and neutralizing all CSS transforms, transitions, and hover scales",
    ],
    performance: [
      "Computes dynamic scaling using a single `mousemove` event listener on the container, updating localized CSS custom properties",
      "Uses hardware acceleration (`translateZ`, `preserve-3d`) and `will-change` to maintain 60fps rendering during magnification",
    ],
    credits: "Barsan",
    related: ["Needs verification"],
    internalLinks: ["/docs/installation/", "/docs/quick-start/", "/docs/api/dock/"],
    isNew: true,
  },
  {
    name: "HighlightText",
    slug: "highlight-text",
    section: "Text Animations",
    description:
      "A zero-JS, CSS-only component for animating background highlights and underlines behind text.",
    usage: `---\nimport HighlightText from "@astroanimate/core/HighlightText";\n---\n\n<h1>\n  Make your text <HighlightText color="#a5b4fc" trigger="hover">stand out</HighlightText> easily.\n</h1>`,
    renders:
      "Renders inline text that smoothly draws a colored background or underline behind it.",
    install: "npm install @astroanimate/core",
    props: [
      { prop: "variant", type: '"underline" | "background"', defaultValue: '"background"', description: "Visual style of the highlight" },
      { prop: "color", type: "string", defaultValue: '"#FFD700"', description: "Highlight or underline color" },
      { prop: "trigger", type: '"load" | "hover"', defaultValue: '"load"', description: "Event that triggers the animation" },
      { prop: "duration", type: "string", defaultValue: '"600ms"', description: "CSS transition duration" },
      { prop: "delay", type: "string", defaultValue: '"0ms"', description: "CSS transition delay" },
      { prop: "thickness", type: "string", defaultValue: '"100%" / "2px"', description: "Thickness of the highlight mark" },
      { prop: "fontSize", type: "string", defaultValue: '"inherit"', description: "Custom font size" },
      { prop: "padding", type: "string", defaultValue: '"0.2em"', description: "Inner padding around the text" },
      { prop: "className", type: "string", defaultValue: '""', description: "Additional CSS classes" },
    ],
    useWhen: [
      "Emphasizing specific keywords, phrases, or metrics inside headings and paragraphs",
      "Building interactive, hoverable inline links with smooth underline reveals",
      'Creating "marker pen" styled landing page typographies',
    ],
    avoidWhen: [
      "Wrapping massive, multi-paragraph text blocks (keep highlights scoped to short phrases)",
      "Using background colors that conflict heavily with the text color (ensure good contrast)",
    ],
    accessibility: ["No JavaScript required; keep contrast readable for highlighted text."],
    performance: ["Zero JavaScript, CSS-only highlight animation."],
    credits: "Barsan",
    related: ["Needs verification"],
    internalLinks: ["/docs/installation/", "/docs/quick-start/", "/docs/api/highlighttext/"],
    isNew: true,
  },
  {
    name: "InfiniteMarquee",
    slug: "infinite-marquee",
    section: "Data Display",
    description:
      "A continuous, high-performance CSS-only scrolling marquee for logos, text, or testimonial cards.",
    usage: `---\nimport InfiniteMarquee from "@astroanimate/core/InfiniteMarquee";\n---\n\n<InfiniteMarquee direction="left" speed="40s" fade={true}>\n  <div class="marquee-item">Company A</div>\n  <div class="marquee-item">Company B</div>\n  <div class="marquee-item">Company C</div>\n</InfiniteMarquee>`,
    renders:
      "Renders a smoothly looping track of content that seamlessly wraps around the container.",
    install: "npm install @astroanimate/core",
    props: [
      { prop: "direction", type: '"left" | "right" | "up" | "down"', defaultValue: '"left"', description: "Scroll direction" },
      { prop: "speed", type: "string", defaultValue: '"30s"', description: "Duration of one complete scroll cycle" },
      { prop: "pauseOnHover", type: "boolean", defaultValue: "true", description: "Pause animation on mouse hover" },
      { prop: "gap", type: "string", defaultValue: '"2rem"', description: "Spacing between items" },
      { prop: "fade", type: "boolean", defaultValue: "true", description: "Apply gradient fade masks to the edges" },
      { prop: "cardMode", type: "boolean", defaultValue: "false", description: "Enable built-in testimonial card renderer" },
      { prop: "testimonials", type: "Testimonial[]", defaultValue: "[]", description: "Array of data for cards (`{name, handle, quote, img?}`)" },
    ],
    useWhen: [
      "Displaying a continuous feed of partner logos, sponsors, or client brands",
      "Showcasing a carousel of bite-sized user reviews or testimonials",
      'Creating dynamic "ticker-tape" announcements',
    ],
    avoidWhen: [
      "Presenting dense, long-form reading material (moving text hurts reading comprehension)",
      "Nesting complex interactive elements (like forms or dropdowns) inside the moving track",
    ],
    accessibility: [
      "Pauses on hover automatically to allow users to read the content comfortably",
      'Hides duplicated trailing track copies from screen readers using `aria-hidden="true"`',
      "Respects `prefers-reduced-motion: reduce` by freezing the animation completely",
    ],
    performance: [
      "**Zero JavaScript:** The scrolling loop is powered entirely by CSS keyframe animations",
      "Server rendered content duplication for seamless loops",
      "GPU accelerated with `transform`",
    ],
    credits: "Barsan",
    related: ["Needs verification"],
    internalLinks: ["/docs/installation/", "/docs/quick-start/", "/docs/api/infinitemarquee/"],
    isNew: true,
  },
  {
    name: "GridDotsBackground",
    slug: "grid-dots-background",
    section: "Background Effects",
    description:
      "A high-performance, CSS-only background pattern component featuring animated dots or grids.",
    usage: `---\nimport GridDotsBackground from "@astroanimate/core/GridDotsBackground";\n---\n\n<GridDotsBackground variant="dots" animate={true} mask={true} height="400px">\n  <div style="position: relative; z-index: 10;">\n    <h1>Welcome to AstroAnimate</h1>\n  </div>\n</GridDotsBackground>`,
    renders: "Renders a subtle, ambient background pattern behind nested slot content.",
    install: "npm install @astroanimate/core",
    props: [
      { prop: "variant", type: '"dots" | "grid"', defaultValue: '"dots"', description: "Visual pattern style" },
      { prop: "dotColor", type: "string", defaultValue: '"rgba(255,255,255,0.25)"', description: "Color of the dots or grid lines" },
      { prop: "dotSize", type: "string", defaultValue: '"2px"', description: "Thickness or diameter of the pattern" },
      { prop: "gap", type: "string", defaultValue: '"32px"', description: "Spacing between dots or grid lines" },
      { prop: "mask", type: "boolean", defaultValue: "false", description: "Apply a radial fade-out mask at the edges" },
      { prop: "animate", type: "boolean", defaultValue: "false", description: "Enable a continuous ambient drifting animation" },
      { prop: "height", type: "string", defaultValue: '"300px"', description: "Height of the background container" },
      { prop: "bgColor", type: "string", defaultValue: '"#0f0f0f"', description: "Base background color" },
      { prop: "mainClassName", type: "string", defaultValue: '""', description: "Additional CSS classes" },
    ],
    useWhen: ["Creating animated dots or grid backgrounds", "Adding subtle ambient background motion"],
    avoidWhen: ["Content needs a very plain reading surface", "The background would reduce text contrast"],
    accessibility: ["Decorative background should not replace content.", "Respects reduced motion when configured."],
    performance: ["CSS-only background pattern", "Low DOM footprint using gradients"],
    credits: "Barsan",
    related: ["Needs verification"],
    internalLinks: ["/docs/installation/", "/docs/quick-start/", "/docs/api/griddotsbackground/"],
    isNew: true,
  },
];

const additionalDocs: ComponentDoc[] = [
  ["Dropdown", "dropdown", "Navigation", "An interactive dropdown menu supporting click or hover triggers with a zero-JS baseline and configurable animations."],
  ["AnimatedBorderButton", "animated-border-button", "Buttons", "Button/link with animated gradient border effect."],
  ["SlidingOverlayButton", "sliding-overlay-button", "Buttons", "Button/link with sliding overlay animation on hover."],
  ["GitHubShineButton", "github-shine-button", "Buttons", "A premium, CSS-only GitHub button featuring a sleek hover shine effect and integrated star count."],
  ["StaggerTextButton", "stagger-text-button", "Buttons", "A zero-JS, CSS-only button that animates its text character-by-character on hover for a playful micro-interaction."],
  ["JobCard", "job-card", "Cards", "A clean, responsive, CSS-only summary card optimized for job boards and opportunity listings."],
  ["LiquidGlassCard", "liquid-glass-card", "Cards", "A glass-style card component with a liquid visual treatment for modern UI surfaces."],
  ["ArrowCTAButton", "arrow-cta-button", "Buttons", "Button/link with animated underline and sliding arrow hover effect."],
  ["FillHoverButton", "fill-hover-button", "Buttons", "Button/link with animated underline and background fill hover effect."],
  ["ProductReviewCard", "product-review-card", "Cards", "A clean, responsive, CSS-only product review card featuring a subtle ambient glow and hover scale effect."],
  ["ArticleCard", "article-card", "Cards", "Article/blog card with image preview, hover lift effect, and CTA link."],
  ["NewsletterPopupCard", "newsletter-popup-card", "Forms", "A clean, high-converting newsletter subscription card with semantic HTML and a built-in submission handler."],
].map(([name, slug, section, description]) => ({
  name,
  slug,
  section,
  description,
  usage: `---\nimport ${name} from "@astroanimate/core/${name}";\n---\n\n<${name} />`,
  renders: `Renders the ${name} component with AstroAnimate defaults.`,
  install: "npm install @astroanimate/core",
  props: [
    { prop: "class", type: "string", defaultValue: '""', description: "Additional CSS classes" },
  ],
  useWhen: ["Use when this interaction pattern matches the surrounding UI."],
  avoidWhen: ["Avoid when the interaction would distract from primary content."],
  accessibility: ["Supports semantic HTML patterns and reduced motion where available."],
  performance: ["Designed as a lightweight Astro component."],
  credits: name === "JobCard" ? "Needs verification" : name === "ArrowCTAButton" || name === "FillHoverButton" ? "—" : "Prashanth",
  related: ["Needs verification"],
  internalLinks: ["/docs/installation/", "/docs/quick-start/"],
  isNew: true,
}));

export const allNewComponentDocs = [...newComponentDocs, ...additionalDocs];

export const newComponentSections = [
  "Text Animations",
  "Core Animations",
  "Background Effects",
  "Navigation",
  "Cards",
  "Forms",
  "Loaders & Feedback",
  "Buttons",
  "Overlays & Popovers",
  "Data Display",
];
