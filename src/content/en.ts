/**
 * English copy — approved source: the MIA Robotics website brief / script.
 * Headlines marked "subject to approval" in the brief are kept as written.
 */
const en = {
  meta: {
    home: {
      title: "MIA Robotics — MIA R4X4 Compact Electric UGV",
      description:
        "MIA R4X4 is a compact electric unmanned ground vehicle with adaptive tilt and front-and-rear steering, built for defense, security and field operations.",
    },
    platform: {
      title: "MIA R4X4 Platform — Adaptive Tilt & Front-and-Rear Steering",
      description:
        "A standardized, modular ground mobility platform ready for mission payloads. Explore adaptive tilt, front-and-rear steering and core capabilities.",
    },
    company: {
      title: "Company — MIA Robotics, a MIA Dynamics company",
      description:
        "MIA Robotics builds compact electric ground mobility platforms for defense, security and civilian field operations. Part of the MIA Dynamics group.",
    },
    contact: {
      title: "Contact — Request a MIA R4X4 Demo",
      description: "Tell us about your mission. Request a live demonstration of the MIA R4X4 or the full datasheet.",
    },
  },

  nav: {
    home: "Home",
    platform: "Platform",
    company: "Company",
    contact: "Contact",
    demo: "Request a demo",
    menu: "Menu",
    close: "Close",
    skip: "Skip to content",
    langLabel: "Language",
  },

  common: {
    requestDemo: "Request a demo",
    watchVideo: "Watch the video",
    explorePlatform: "Explore the platform",
    seeHowItMoves: "See how it moves",
    requestDatasheet: "Request the datasheet",
    conceptVisual: "Concept visual",
    scroll: "Scroll to explore",
  },

  hero: {
    overline: "MIA Robotics / Ground Mobility",
    lines: ["Extreme mobility.", "Level payload.", "Any terrain."],
    accentLine: 1,
    body: "A compact electric UGV with adaptive tilt and front-and-rear steering — it keeps the mission platform level on rough ground and turns tight where space runs out. Built for defense, security and field operations.",
    techLine: "MIA R4X4 / Ground mobility platform",
    realWorld: ["Developed for the", "real world"],
    videoLabel: "MIA R4X4 driving across rough terrain",
  },

  ticker: ["Adaptive tilt", "Front & rear steering", "Modular platform", "Extreme mobility"],

  challenge: {
    label: "01 / The challenge",
    title: ["Heavy mission", "equipment still moves", "on people's backs."],
    accentFrom: 2,
    body: "Ground missions need a robot that can carry real payloads across terrain where wheels usually fail — without putting a team at risk.",
    imageAlt: "The black MIA R4X4 robot, studio view",
    caption: "MIA R4X4 / Studio",
  },

  film: {
    label: "02 / In motion",
    title: ["See the platform", "in the field."],
    accentFrom: 1,
    side: "No static renders. No theory. The MIA R4X4 on real ground.",
    play: "Play the MIA R4X4 product film",
    watch: "Watch the full film",
    corner: "MIA Robotics / MIA R4X4",
    product: "Product film",
    posterAlt: "MIA R4X4 carrying a payload over rocky ground",
  },

  tilt: {
    label: "03 / Technology — 01",
    kicker: "A different kind of stability",
    title: ["Level on", "any slope."],
    accentFrom: 1,
    body: "Our adaptive tilt system keeps the top platform level while the chassis climbs, crosses and turns — so sensors, masts and cargo stay stable where it matters.",
    steps: [
      { n: "01", t: "Approach", d: "The robot meets uneven ground." },
      { n: "02", t: "Chassis tilts", d: "The chassis follows the terrain." },
      { n: "03", t: "Platform stays level", d: "The mission platform holds the horizontal." },
    ],
    diagramTag: "Adaptive tilt / Principle",
    diagramNote: "Schematic illustration / Not to scale",
    levelRef: "Level reference",
    platform: "Level payload",
    chassis: "Chassis follows terrain",
    svgTitle: "Diagram: as the robot crosses uneven ground, the chassis tilts with the terrain while the upper platform stays level with the horizontal reference line.",
    fieldAlt: "MIA R4X4 articulating over uneven ground",
  },

  steering: {
    label: "04 / Technology — 02",
    kicker: "Confined spaces. Full control.",
    title: ["Steers from", "both ends."],
    accentFrom: 1,
    body: "Front- and rear-wheel steering lets MIA R take tighter turns and thread narrow paths — between rows, through alleys, along fence lines and inside facilities — with fewer back-and-forth maneuvers.",
    standard: { t: "Standard steering", d: "Front wheels only" },
    mia: { t: "MIA R4X4", d: "Front and rear steering" },
    diagramTag: "Dual axle control / Principle",
    diagramNote: "Conceptual illustration / Not a measured radius",
    replay: "Replay",
    svgTitle: "Top-down comparison: with front-only steering the vehicle needs a wide arc to turn the corner; with front and rear steering MIA R4X4 follows a tighter path through the same corridor.",
  },

  missions: {
    label: "05 / Applications",
    title: ["One platform.", "Any mission."],
    accentFrom: 1,
    side: "A modular ground mobility layer for critical field tasks, with flexibility for different operational environments.",
    items: [
      { n: "01", t: "Remote operations" },
      { n: "02", t: "Payload mobility" },
      { n: "03", t: "Casualty evacuation" },
      { n: "04", t: "Patrol & security" },
      { n: "05", t: "Tight-space mobility" },
      { n: "06", t: "Area reconnaissance" },
    ],
    civilian: "Critical infrastructure & energy, agriculture, construction, campus logistics and search & rescue.",
    civilianLead: "Also for civilian work:",
    notice: "Images are for illustration purposes only. Availability and configurations are subject to confirmation.",
  },

  backed: {
    label: "06 / Our foundation",
    title: ["Backed by", "MIA Dynamics."],
    accentFrom: 1,
    side: "MIA Robotics is part of the MIA Dynamics group, bringing mobility engineering and manufacturing expertise to field robotics.",
    pillars: [
      { n: "01", t: "Serial manufacturing", d: "Industrial production experience." },
      { n: "02", t: "Micro-mobility know-how", d: "Compact vehicle and mobility engineering experience." },
      { n: "03", t: "Patented technology", d: "Tilt-system technology and related intellectual property." },
    ],
    groupLine: "Part of the MIA Dynamics group.",
  },

  finalCta: {
    label: "07 / Connect with us",
    title: ["See it in", "the field."],
    accentFrom: 1,
    body: "Book a live demonstration with our team.",
  },

  platform: {
    hero: {
      label: "MIA Robotics / Platform",
      title: "MIA R4X4",
      body: "A standardized, modular ground mobility platform — ready for mission payloads.",
      imageAlt: "The black MIA R4X4, studio view",
    },
    tilt: {
      label: "01 / Adaptive tilt",
      title: ["Built around", "adaptive tilt."],
      accentFrom: 1,
      body: [
        "On uneven ground the chassis and the upper platform behave as two separate structures. The chassis keeps its wheels on the terrain and tilts as it climbs, crosses and turns.",
        "The upper platform stays level. Sensors, masts and cargo mounted on top see a stable horizontal, so the mission equipment keeps working while the robot moves.",
      ],
      parts: [
        { k: "A", t: "Upper platform", d: "Mission mounting surface. Held level." },
        { k: "B", t: "Tilt mechanism", d: "Connects platform and chassis." },
        { k: "C", t: "Chassis", d: "Follows the terrain with all four wheels." },
      ],
    },
    steering: {
      label: "02 / Front & rear steering",
      title: ["Built to", "maneuver."],
      accentFrom: 1,
      body: [
        "With conventional steering only the front wheels turn, and the rear wheels follow inside the curve. Tight corners take a wider arc — or a series of back-and-forth corrections.",
        "MIA R4X4 steers both axles. The rear wheels turn too, so the robot follows a tighter path through narrow passages, between rows and inside facilities.",
      ],
      review: "Technical visualizations are conceptual and pending engineering review.",
    },
    capabilities: {
      label: "03 / Core capabilities",
      title: ["Core", "capabilities."],
      accentFrom: 1,
      items: [
        { n: "01", t: "Front & rear steering", d: "Both axles steer for tighter turns and narrow paths." },
        { n: "02", t: "Adaptive tilt system", d: "Keeps the top platform level on uneven terrain." },
        { n: "03", t: "Anti-roll stability", d: "Designed for stability on steep slopes." },
        { n: "04", t: "Swappable batteries", d: "Removable batteries with external charging for continuous operation." },
        { n: "05", t: "Lightweight architecture", d: "Optimized design for performance and easy transport." },
        { n: "06", t: "Terrain maneuverability", d: "Built for demanding ground where wheels usually struggle." },
      ],
    },
    configs: {
      label: "04 / Configurations",
      title: ["One platform.", "Many missions."],
      accentFrom: 1,
      items: [
        { t: "Cargo & logistics", s: "Available today", k: "available" },
        { t: "Patrol & security / sensor mast", s: "In development", k: "dev" },
        { t: "Casualty evacuation", s: "In development", k: "dev" },
        { t: "Custom mission payload", s: "On request", k: "request" },
      ],
      note: "Configuration status and imagery are subject to confirmation against the final datasheet.",
    },
    specs: { label: "05 / Technical specifications", title: "Specifications" },
    datasheet: {
      label: "Datasheet",
      title: ["Request the", "full datasheet."],
      accentFrom: 1,
      body: "Each request is reviewed by the MIA team and the datasheet is sent personally.",
    },
  },

  company: {
    hero: {
      label: "MIA Robotics / Company",
      title: ["Engineering", "what's next."],
      accentFrom: 1,
    },
    about: {
      label: "01 / About",
      title: ["MIA", "Robotics."],
      accentFrom: 1,
      body: [
        "MIA Robotics is a subsidiary of MIA Dynamics.",
        "We build compact electric ground mobility platforms for defense, security and civilian field operations — robots that carry real payloads across real terrain, so teams don't have to.",
      ],
      imageAlt: "MIA R4X4 on rough ground with antennas mounted",
    },
    group: {
      label: "02 / The group",
      title: ["Backed by", "MIA Dynamics."],
      accentFrom: 1,
      parent: "MIA Dynamics",
      parentRole: "Parent company",
      child: "MIA Robotics",
      childRole: "Field robotics",
      pillars: [
        { n: "01", t: "Engineering", d: "Mobility engineering for compact vehicles." },
        { n: "02", t: "Production", d: "Industrial production experience." },
        { n: "03", t: "Technology", d: "Tilt-system technology and related intellectual property." },
      ],
    },
    team: { label: "03 / Team", title: ["The team", "behind MIA R."], accentFrom: 1 },
    investors: {
      label: "Investors",
      title: ["Investor", "relations."],
      accentFrom: 1,
      body: "For investor enquiries, get in touch with our team.",
      cta: "Contact investor relations",
    },
  },

  contact: {
    label: "MIA Robotics / Contact",
    title: ["Let's talk about", "your mission."],
    accentFrom: 1,
    body: "Tell us about your mission and we'll get back to you.",
    aside: [
      { t: "Live demonstrations", d: "See the MIA R4X4 in the field with our team." },
      { t: "Datasheet requests", d: "Reviewed by the MIA team and sent personally." },
    ],
    form: {
      name: "Full name",
      org: "Organization",
      email: "Email address",
      area: "Area of use",
      areaPlaceholder: "Select an area",
      phone: "Phone number",
      message: "Message",
      optional: "Optional",
      datasheet: "Send me the datasheet",
      submit: "Request a demo",
      sending: "Sending…",
      success: "Thanks — our team will get back to you shortly.",
      areas: [
        "Defense",
        "Homeland security & policing",
        "Critical infrastructure & energy",
        "Agriculture",
        "Construction",
        "Logistics",
        "Search & rescue",
        "Other",
      ],
      errors: {
        required: "This field is required.",
        email: "Enter a valid email address.",
        phone: "Enter a valid phone number.",
        tooLong: "This is too long.",
        summary: "Please check the highlighted fields.",
        server: "We couldn't send your request. Please try again in a moment.",
        notConfigured: "The form isn't connected yet. Your request was not sent.",
        rate: "Too many requests. Please wait a few minutes and try again.",
      },
      privacy: "We use your details only to respond to this request.",
    },
  },

  footer: {
    tagline: "A MIA Dynamics company. Extreme mobility for demanding missions.",
    navigate: "Navigate",
    connect: "Connect",
    rights: "MIA Robotics. All rights reserved.",
    draftHe: "",
  },

  draftNotice: "",
};

export default en;
export type Dict = typeof en;
