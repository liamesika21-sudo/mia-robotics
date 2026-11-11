/**
 * English copy. Source: the MIA Robotics website brief and the client's revision notes (11 Nov 2026).
 * House rules from the client: the model is always "MIA R"; no dashes, hyphens or slashes in copy.
 */
const en = {
  meta: {
    home: {
      title: "MIA R | Compact electric UGV by MIA Robotics",
      description:
        "MIA R is a compact electric unmanned ground vehicle with adaptive tilt and front and rear steering, built for defense, security and field operations.",
    },
    platform: {
      title: "MIA R platform | Adaptive tilt and front and rear steering",
      description:
        "A standardized, modular ground mobility platform ready for mission payloads. Adaptive tilt, front and rear steering and core capabilities.",
    },
    company: {
      title: "Company | MIA Robotics, a MIA Dynamics company",
      description:
        "MIA Robotics builds compact electric ground mobility platforms for defense, security and civilian field operations. Part of the MIA Dynamics group.",
    },
    contact: {
      title: "Contact | Request a MIA R demo",
      description: "Tell us about your mission. Request a live demonstration of MIA R or the full datasheet.",
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
  },

  hero: {
    lines: ["Level payload.", "Any terrain."],
    accentLine: 1,
    body: "Compact electric UGV with adaptive tilt and front and rear steering.",
    videoLabel: "MIA R driving across rough terrain",
  },

  challenge: {
    title: ["Heavy mission", "equipment still moves", "on people's backs."],
    accentFrom: 2,
    body: "Ground missions need a robot that can carry real payloads across terrain where wheels usually fail, without putting a team at risk.",
    imageAlt: "The black MIA R robot, studio view",
  },

  film: {
    title: ["See the platform", "in the field."],
    accentFrom: 1,
    side: "No static renders. No theory. MIA R on real ground.",
    play: "Play the MIA R product film",
    watch: "Watch the full film",
    posterAlt: "MIA R carrying a payload over rocky ground",
  },

  tilt: {
    kicker: "A different kind of stability",
    title: ["Level on", "any slope."],
    accentFrom: 1,
    body: "Our adaptive tilt system keeps the top platform level while the chassis climbs, crosses and turns, so sensors, masts and cargo stay stable where it matters.",
    steps: [
      { n: "01", t: "Approach", d: "One side of the robot meets a step." },
      { n: "02", t: "Chassis tilts sideways", d: "The wheels on that side climb and the chassis rolls with the ground." },
      { n: "03", t: "Platform stays level", d: "The mission platform holds the horizontal." },
    ],
    levelRef: "Level",
    platform: "Level payload",
    chassis: "Chassis rolls with the terrain",
    svgTitle:
      "Front view diagram: MIA R drives forward and the wheels on one side climb a step. The chassis tilts sideways while the upper platform stays level with the horizontal reference line.",
    fieldAlt: "MIA R crossing uneven ground",
  },

  steering: {
    kicker: "Confined spaces. Full control.",
    title: ["Steers from", "both ends."],
    accentFrom: 1,
    body: "Front and rear wheel steering lets MIA R take tighter turns and thread narrow paths between rows, through alleys, along fence lines and inside facilities, with fewer back and forth maneuvers.",
    highlight: "Turning radius of 820 mm, shorter than the robot itself.",
    standard: { t: "Front steering only", r: "1,600 mm" },
    mia: { t: "Front and rear steering", r: "820 mm" },
    radius: "Turning radius",
    robot: "MIA R 740 × 1,460 mm",
    scale: "Drawn to scale",
    replay: "Replay",
    svgTitle:
      "Turning circles drawn to scale next to the robot (740 by 1,460 mm). Front steering only: turning radius 1,600 mm. Front and rear steering: turning radius 820 mm, about half, and shorter than the robot's length.",
  },

  payload: {
    kicker: "Payload system",
    title: ["Built to carry", "the mission."],
    accentFrom: 1,
    body: "The top deck is the mounting interface for mission payloads. Cargo, sensor masts, stretchers or custom equipment ride on the part of the robot that stays level.",
    points: ["Flat mounting deck", "Held level by adaptive tilt", "Cargo, sensors, stretcher or custom payloads"],
    deckAlt: "Close up of the MIA R top mounting deck and front body",
    loadedAlt: "MIA R carrying a stacked payload",
  },

  missions: {
    title: ["One platform.", "Any mission."],
    accentFrom: 1,
    side: "A modular ground mobility layer for critical field tasks, with flexibility for different operational environments.",
    items: [
      { n: "01", t: "Remote operations" },
      { n: "02", t: "Payload mobility" },
      { n: "03", t: "Casualty evacuation" },
      { n: "04", t: "Patrol and security" },
      { n: "05", t: "Tight space mobility" },
      { n: "06", t: "Area reconnaissance" },
    ],
    civilian: "Critical infrastructure and energy, agriculture, construction, campus logistics, search and rescue.",
    civilianLead: "Also for civilian work:",
    notice: "Images are for illustration purposes only. Availability and configurations are subject to confirmation.",
  },

  backed: {
    title: ["Backed by", "MIA Dynamics."],
    accentFrom: 1,
    body: "MIA Robotics is part of the MIA Dynamics group. It builds on the group's serial manufacturing experience, its know how in compact micro mobility vehicles and its patented tilt technology.",
  },

  finalCta: {
    title: ["See it in", "the field."],
    accentFrom: 1,
    body: "Book a live demonstration with our team.",
  },

  platform: {
    hero: {
      body: "A standardized, modular ground mobility platform, ready for mission payloads.",
      imageAlt: "The black MIA R, studio view",
    },
    tilt: {
      title: ["Built around", "adaptive tilt."],
      accentFrom: 1,
      body: [
        "On uneven ground the chassis and the upper platform behave as two separate structures. When the wheels on one side climb a step or a slope, the chassis tilts sideways and keeps all four wheels on the ground.",
        "The upper platform stays level. Sensors, masts and cargo mounted on top see a stable horizontal, so the mission equipment keeps working while the robot moves.",
      ],
      parts: [
        { k: "A", t: "Upper platform", d: "Mission mounting surface. Held level." },
        { k: "B", t: "Tilt mechanism", d: "Connects platform and chassis." },
        { k: "C", t: "Chassis", d: "Tilts sideways with the terrain." },
      ],
    },
    steering: {
      title: ["Built to", "maneuver."],
      accentFrom: 1,
      body: [
        "With conventional steering only the front wheels turn, so a tight corner needs a wide arc or a series of back and forth corrections.",
        "MIA R steers both axles. Its turning radius is 820 mm compared with 1,600 mm on front steering only, about half, and shorter than the robot's own 1,460 mm length.",
      ],
    },
    capabilities: {
      title: ["Core", "capabilities."],
      accentFrom: 1,
      items: [
        { n: "01", t: "Front and rear steering", d: "Both axles steer for tighter turns and narrow paths." },
        { n: "02", t: "Adaptive tilt system", d: "Keeps the top platform level on uneven terrain." },
        { n: "03", t: "Anti roll stability", d: "Designed for stability on steep slopes." },
        { n: "04", t: "Swappable batteries", d: "Removable batteries with external charging for continuous operation." },
        { n: "05", t: "Lightweight architecture", d: "Optimized design for performance and easy transport." },
        { n: "06", t: "Terrain maneuverability", d: "Built for demanding ground where wheels usually struggle." },
      ],
    },
    configs: {
      title: ["One platform.", "Many missions."],
      accentFrom: 1,
      items: [
        { t: "Cargo and logistics", s: "Available today", k: "available" },
        { t: "Patrol and security, sensor mast", s: "In development", k: "dev" },
        { t: "Casualty evacuation", s: "In development", k: "dev" },
        { t: "Custom mission payload", s: "On request", k: "request" },
      ],
      note: "Configuration status and imagery are subject to confirmation against the final datasheet.",
    },
    specs: { title: "Specifications" },
    datasheet: {
      title: ["Request the", "full datasheet."],
      accentFrom: 1,
      body: "Each request is reviewed by the MIA team and the datasheet is sent personally.",
    },
  },

  company: {
    hero: { title: ["Engineering", "what's next."], accentFrom: 1 },
    about: {
      title: ["MIA", "Robotics."],
      accentFrom: 1,
      body: [
        "MIA Robotics is a subsidiary of MIA Dynamics.",
        "We build compact electric ground mobility platforms for defense, security and civilian field operations: robots that carry real payloads across real terrain, so teams don't have to.",
      ],
      imageAlt: "MIA R on rough ground with antennas mounted",
    },
    group: {
      title: ["Backed by", "MIA Dynamics."],
      accentFrom: 1,
      parentRole: "Parent company",
      childRole: "Field robotics",
      body: "MIA Robotics draws on the group's mobility engineering for compact vehicles, its industrial production experience and its tilt system technology and related intellectual property.",
    },
    team: { title: ["The team", "behind MIA R."], accentFrom: 1 },
    investors: {
      label: "Investors",
      title: ["Investor", "relations."],
      accentFrom: 1,
      body: "For investor enquiries, get in touch with our team.",
      cta: "Contact investor relations",
    },
  },

  contact: {
    title: ["Let's talk about", "your mission."],
    accentFrom: 1,
    body: "Tell us about your mission and we'll get back to you.",
    aside: [
      { t: "Live demonstrations", d: "See MIA R in the field with our team." },
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
      success: "Thanks, our team will get back to you shortly.",
      areas: [
        "Defense",
        "Homeland security and policing",
        "Critical infrastructure and energy",
        "Agriculture",
        "Construction",
        "Logistics",
        "Search and rescue",
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
    datasheet: "Datasheet",
    rights: "MIA Robotics. All rights reserved.",
  },

  draftNotice: "",
};

export default en;
export type Dict = typeof en;
