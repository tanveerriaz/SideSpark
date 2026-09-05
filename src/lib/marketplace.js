function normalize(value) {
  return String(value ?? "").trim().toLocaleLowerCase("en");
}

export function getLocalDateStamp(value = new Date()) {
  if (typeof value === "string") return value.slice(0, 10);
  const date = value instanceof Date ? value : new Date(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function includesQuery(experience, query) {
  if (!query) return true;
  const searchable = [
    experience.title,
    experience.summary,
    experience.description,
    experience.category,
    experience.neighborhood,
    experience.language,
    experience.host?.name,
  ].map(normalize).join(" ");
  return searchable.includes(query);
}

export function filterExperiences(experiences, filters = {}) {
  const query = normalize(filters.query);
  const format = filters.format ?? "all";
  const group = filters.group ?? "all";

  return experiences.filter((experience) => {
    if (!includesQuery(experience, query)) return false;
    if (format !== "all" && experience.format !== format) return false;
    if (group !== "all" && experience.participation !== group) return false;
    return true;
  });
}

export function validateExperienceDraft(draft = {}, options = {}) {
  const errors = {};
  if (!normalize(draft.title)) errors.title = "Add a title for the experience.";
  if (!normalize(draft.category)) errors.category = "Choose a category.";
  if (normalize(draft.description).length < 20) errors.description = "Add a description of at least 20 characters.";
  if (!normalize(draft.date)) {
    errors.date = "Choose a date.";
  } else if (draft.date < getLocalDateStamp(options.today)) {
    errors.date = "Choose today or a future date.";
  }
  if (!normalize(draft.time)) errors.time = "Choose a time.";
  if (!normalize(draft.format)) errors.format = "Choose online or in person.";
  if (draft.format === "in-person" && !normalize(draft.neighborhood)) {
    errors.neighborhood = "Add a public neighborhood.";
  }
  if (!normalize(draft.participation)) errors.participation = "Choose one-to-one or small group.";
  if (!normalize(draft.bookingMode)) errors.bookingMode = "Choose how guests join.";
  if (!normalize(draft.language)) errors.language = "Add at least one language.";
  return errors;
}

function formatDate(date) {
  if (!date) return "Date to be confirmed";
  const parsed = new Date(`${date}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return new Intl.DateTimeFormat("en-SG", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(parsed);
}

function formatTime(time) {
  if (!time) return "Time to be confirmed";
  const [hours, minutes] = time.split(":").map(Number);
  const parsed = new Date(2026, 0, 1, hours, minutes);
  return `${new Intl.DateTimeFormat("en-SG", { hour: "numeric", minute: "2-digit" }).format(parsed)} SGT`;
}

export function createLocalExperience(draft, options = {}) {
  const now = options.now ?? Date.now;
  const capacity = draft.participation === "one-to-one" ? 1 : Number(draft.capacity) || 4;

  return {
    id: `local-${now()}`,
    category: draft.category.trim(),
    title: draft.title.trim(),
    summary: draft.description.trim(),
    description: draft.description.trim(),
    format: draft.format,
    neighborhood: draft.format === "online" ? "Online" : draft.neighborhood.trim(),
    date: draft.date,
    dateLabel: formatDate(draft.date),
    time: draft.time,
    timeLabel: formatTime(draft.time),
    duration: draft.duration || "45 min",
    participation: draft.participation,
    capacity,
    seatsLeft: capacity,
    bookingMode: draft.bookingMode,
    language: draft.language.trim(),
    accessNote: draft.format === "online"
      ? "The private meeting link would be shared after acceptance in the real platform."
      : "Only the public neighborhood is shown. An exact meeting point would be shared after acceptance.",
    agenda: ["Meet and set an intention", "Share the experience", "Close with one useful takeaway"],
    host: { name: "Maya", initials: "MY", credits: 110, sessions: 4, badge: "First Spark" },
    palette: "mint",
    featured: false,
    demoState: "device-only",
  };
}

export function createBooking({ experience, now = Date.now }) {
  return {
    id: `booking-${experience.id}-${now()}`,
    experienceId: experience.id,
    status: experience.bookingMode === "instant" ? "reserved" : "pending-host",
    creditsAwarded: 0,
    createdAt: new Date(now()).toISOString(),
  };
}
