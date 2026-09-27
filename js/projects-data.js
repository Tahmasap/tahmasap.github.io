/* ==========================================================================
   SITE CONFIG
   Update these once and they apply everywhere (hero, contact, footer).
   ========================================================================== */
const SITE_CONFIG = {
  github: "YOUR_GITHUB_URL",     // e.g. "https://github.com/your-username"
  email: "YOUR_EMAIL",           // e.g. "you@example.com"
  linkedin: "YOUR_LINKEDIN_URL", // e.g. "https://linkedin.com/in/your-name"
};

/* ==========================================================================
   PROJECTS
   ==========================================================================
   This is the ONLY file you need to edit to add new work to the site.

   HOW TO ADD A NEW PROJECT:
   1. Copy one of the objects below (the curly-brace block).
   2. Paste it into the PROJECTS array (anywhere between the [ and ]).
   3. Fill in your own details.
   4. Save the file — the website reads this automatically, no other
      code needs to change.

   FIELD GUIDE:
   - id            unique short id, lowercase, no spaces (e.g. "astra")
   - title         project name shown on the card
   - category      must be exactly one of: "development", "design", "document"
   - featured      true for at most one flagship project (shown large, at
                   the top of the Work section). Leave false for everything else.
   - subtitle      short tag under the title, e.g. "Discord Bot" or "Poster"
   - description   1-3 honest sentences about what it actually is
   - tools         array of strings, the tools/tech actually used
   - image         path to a preview image (see assets/images/ folders)
   - github        link to the repo, or "" to hide the button
   - demo          link to a live demo/invite, or "" to hide the button

   Leave github/demo as an empty string ("") if you don't have one yet —
   the site will automatically hide that button rather than showing a
   broken link.
   ========================================================================== */

const PROJECTS = [
  {
    id: "astra",
    title: "Astra",
    category: "development",
    featured: true,
    subtitle: "Discord Bot",
    description:
      "A Python-powered Discord bot built for server support, moderation, and interactive server-management features.",
    tools: ["Python", "discord.py", "Discord API", "OpenAI API", ".env", "Git"],
    image: "assets/images/projects/astra-placeholder.svg",
    github: "", // ADD_ASTRA_GITHUB_LINK
    demo: "",   // ADD_ASTRA_INVITE_LINK (optional)
  },

  {
    id: "honey-hearth-poster",
    title: "Honey & Hearth — Weekend Promo Poster",
    category: "design",
    featured: false,
    subtitle: "Promotional Graphic",
    description:
      "A weekend discount poster for a bakery brand, designed in Canva. Built around a warm, paper-textured palette with a script display face for the brand name and a clean serif/sans pairing for the offer details.",
    tools: ["Canva"],
    image: "assets/images/designs/honey-hearth-poster.webp",
    github: "",
    demo: "",
  },

  // Add more development projects, designs, or documents below this line.
  // If you don't add any, the site will show a clearly-marked "coming soon"
  // placeholder for that category instead of leaving it looking broken.
];
