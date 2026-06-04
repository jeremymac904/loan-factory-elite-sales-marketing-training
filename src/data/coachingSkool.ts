export type CoachingSkoolTab = {
  id: string;
  label: string;
  href: string;
};

export const skoolSectionTabs: CoachingSkoolTab[] = [
  { id: "community", label: "Community", href: "#community" },
  { id: "classroom", label: "Classroom", href: "#classroom" },
  { id: "calendar", label: "Calendar", href: "#calendar" },
  { id: "members", label: "Members", href: "#members" },
  { id: "leaderboards", label: "Leaderboards", href: "#leaderboards" },
  { id: "about", label: "About", href: "#about" },
];

export const skoolCommunityPosts = [
  {
    id: "welcome",
    author: "Jeremy McDonald",
    role: "Admin · pinned update",
    pinned: true,
    title: "Welcome to the Loan Factory Paid Coaching Platform",
    body:
      "This is the coaching community for approved LO Mastery and Loan Factory Alliance members. Use the feed for updates, the classroom for the playbook, and the scorecard rhythm to keep your week narrow and useful.",
    meta: { likes: "42 likes", comments: "18 comments", views: "119 views" },
  },
  {
    id: "weekly-focus",
    author: "Edward Arvizo",
    role: "Coaching manager · pinned update",
    pinned: true,
    title: "This week: execution beats noise",
    body:
      "Protect your daily block, finish the weekly scorecard, and bring one real win plus one real blocker to coaching. The platform works when the week stays simple.",
    meta: { likes: "31 likes", comments: "9 comments", views: "86 views" },
  },
  {
    id: "member-win",
    author: "Alliance member",
    role: "Member win",
    pinned: false,
    title: "A clean follow-up sequence created a better week",
    body:
      "One tighter theme day, one clearer scorecard, and one coach note made the next session easier to act on. Small changes compound quickly when the week stays focused.",
    meta: { likes: "24 likes", comments: "6 comments", views: "61 views" },
  },
];

export const skoolClassroomModules = [
  {
    id: "lo-mastery-path",
    title: "LO Mastery 12 Week Path",
    description:
      "Daily time blocker, theme days, script book, scorecard, and weekly coach review.",
    progress: 68,
    badge: "Core path",
  },
  {
    id: "alliance-growth",
    title: "Loan Factory Alliance Growth Path",
    description:
      "Advanced business planning, database reactivation, Realtor growth, and production systems.",
    progress: 54,
    badge: "Advanced path",
  },
  {
    id: "scripts-trackers",
    title: "Scripts and Objection Handling",
    description:
      "Simple language for follow-up, Realtor conversations, and accountability check-ins.",
    progress: 77,
    badge: "Reference",
  },
  {
    id: "forms-center",
    title: "Trackers and Forms Center",
    description:
      "Daily blocker, Greatness tracker, weekly scorecard, goal setting, and action plans.",
    progress: 82,
    badge: "Tools",
  },
];

export const skoolCalendarItems = [
  {
    title: "LO Mastery weekly coaching call",
    time: "Tue 11:00 AM ET",
    details: "Program review, scorecard check, and next-step commitments.",
  },
  {
    title: "Loan Factory Alliance strategy review",
    time: "Thu 2:00 PM ET",
    details: "Advanced business planning, production systems, and member follow-up.",
  },
  {
    title: "Coach office hours",
    time: "Fri 1:00 PM ET",
    details: "Draft-only coaching support and notes review for the leadership team.",
  },
];

export const skoolMemberSnapshots = [
  {
    label: "Member focus",
    value: "Daily block, theme day, scorecard",
    note: "Keep the week narrow and measurable.",
  },
  {
    label: "Coaching rhythm",
    value: "Weekly call + follow-up note",
    note: "Bring one win and one blocker.",
  },
  {
    label: "Progress view",
    value: "Attendance, scorecards, action items",
    note: "Use the tracker to stay accountable.",
  },
];

export const skoolLeaderboardRows = [
  { label: "Weekly scorecard streak", value: "94%" },
  { label: "Follow-up consistency", value: "87%" },
  { label: "Coach note completion", value: "81%" },
];

export const skoolAboutBullets = [
  "Who it is for: approved Loan Factory coaching members only.",
  "What members get: coaching calls, accountability, scorecards, scripts, trackers, and resources.",
  "What coaches use: member progress, review tools, notes, call prep, and simple standards.",
  "How to start: sign in with your approved Loan Factory Google account.",
];
