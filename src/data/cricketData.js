// All teams, players, matches and quotes below are original fictional
// creations for this demo product — not affiliated with any real
// league, team, or athlete.

export const liveMatch = {
  tournament: "Continental Trophy · Semi Final",
  venue: "Meridian Stadium, Port Aza",
  status: "LIVE",
  teamA: { name: "Northshore Falcons", short: "NSF", score: 187, wickets: 4, overs: 16.3 },
  teamB: { name: "Vantage Strikers", short: "VST", score: 142, wickets: 7, overs: 20 },
  target: 188,
  runRate: 11.34,
  requiredRate: 7.29,
  battingTeam: "NSF",
  batsmen: [
    { name: "R. Okonkwo", runs: 68, balls: 41, fours: 6, sixes: 3, onStrike: true },
    { name: "D. Whitlock", runs: 22, balls: 18, fours: 2, sixes: 0, onStrike: false },
  ],
  bowler: { name: "M. Sarath", overs: 3.3, maidens: 0, runs: 34, wickets: 2 },
  recentBalls: ["1", "4", "0", "W", "2", "6"],
};

export const upcomingMatches = [
  {
    id: 1,
    teamA: "Northshore Falcons",
    teamB: "Coral Bay Marlins",
    date: "2026-09-14",
    time: "18:30",
    venue: "Meridian Stadium, Port Aza",
    type: "T20 · Group Stage",
  },
  {
    id: 2,
    teamA: "Vantage Strikers",
    teamB: "Highland Rangers",
    date: "2026-09-16",
    time: "14:00",
    venue: "Ridgeway Oval, Bellmont",
    type: "T20 · Group Stage",
  },
  {
    id: 3,
    teamA: "Ember City Royals",
    teamB: "Northshore Falcons",
    date: "2026-09-19",
    time: "18:30",
    venue: "Cresthill Arena, Dunwick",
    type: "T20 · Group Stage",
  },
  {
    id: 4,
    teamA: "Coral Bay Marlins",
    teamB: "Highland Rangers",
    date: "2026-09-22",
    time: "15:00",
    venue: "Meridian Stadium, Port Aza",
    type: "T20 · Quarter Final",
  },
];

export const featuredPlayers = [
  {
    id: 1,
    name: "Reuben Okonkwo",
    role: "Top-Order Batter",
    team: "Northshore Falcons",
    matches: 118,
    runs: 4210,
    wickets: 3,
    average: 46.8,
    strikeRate: 138.2,
  },
  {
    id: 2,
    name: "Mira Sarath",
    role: "Right-Arm Pace",
    team: "Vantage Strikers",
    matches: 96,
    runs: 540,
    wickets: 151,
    average: 21.4,
    strikeRate: 94.6,
  },
  {
    id: 3,
    name: "Devon Whitlock",
    role: "Wicketkeeper-Batter",
    team: "Northshore Falcons",
    matches: 102,
    runs: 3180,
    wickets: 0,
    average: 38.1,
    strikeRate: 145.7,
  },
  {
    id: 4,
    name: "Priya Naidu",
    role: "Left-Arm Spin",
    team: "Ember City Royals",
    matches: 87,
    runs: 410,
    wickets: 122,
    average: 23.9,
    strikeRate: 88.3,
  },
];

export const standings = [
  { pos: 1, team: "Northshore Falcons", played: 10, won: 8, lost: 2, nrr: "+1.42", points: 16 },
  { pos: 2, team: "Ember City Royals", played: 10, won: 7, lost: 3, nrr: "+0.87", points: 14 },
  { pos: 3, team: "Vantage Strikers", played: 10, won: 6, lost: 4, nrr: "+0.35", points: 12 },
  { pos: 4, team: "Coral Bay Marlins", played: 10, won: 5, lost: 5, nrr: "-0.12", points: 10 },
  { pos: 5, team: "Highland Rangers", played: 10, won: 3, lost: 7, nrr: "-0.71", points: 6 },
  { pos: 6, team: "Dunwick Sabres", played: 10, won: 1, lost: 9, nrr: "-1.68", points: 2 },
];

export const highlights = [
  { id: 1, category: "Best Sixes", title: "Okonkwo's 96m Onslaught vs Marlins", duration: "3:12" },
  { id: 2, category: "Top Wickets", title: "Sarath's Yorker Clinic in the Death Overs", duration: "2:45" },
  { id: 3, category: "Match Recap", title: "Falcons Chase 188 With an Over to Spare", duration: "6:30" },
  { id: 4, category: "Player of the Match", title: "Naidu's 5-for Spins Royals to Victory", duration: "4:08" },
];

export const newsArticles = {
  featured: {
    category: "Match Report",
    date: "Sep 8, 2026",
    readTime: "5 min read",
    title: "Falcons Edge Past Strikers in a Semi-Final Thriller",
    excerpt:
      "A blistering 68 off 41 from Reuben Okonkwo steadied the chase after an early wobble, as Northshore Falcons booked their spot in the Continental Trophy final with an over to spare.",
  },
  list: [
    {
      id: 1,
      category: "Transfers",
      date: "Sep 6, 2026",
      readTime: "3 min read",
      title: "Rangers Sign Fast Bowler Kian Osei Ahead of Next Season",
    },
    {
      id: 2,
      category: "Analysis",
      date: "Sep 5, 2026",
      readTime: "4 min read",
      title: "Why Death-Over Spin Is Reshaping Trophy Tactics",
    },
    {
      id: 3,
      category: "Injury Update",
      date: "Sep 3, 2026",
      readTime: "2 min read",
      title: "Marlins Captain Ruled Out for Two Weeks With Hamstring Strain",
    },
    {
      id: 4,
      category: "Preview",
      date: "Sep 2, 2026",
      readTime: "3 min read",
      title: "Five Storylines to Watch in the Continental Trophy Final",
    },
  ],
};

export const stats = [
  { label: "Matches Covered", value: 500, suffix: "+" },
  { label: "Cricket Fans", value: 1, suffix: "M+" },
  { label: "Expert Analysts", value: 150, suffix: "+" },
  { label: "Live Updates", value: 24, suffix: "/7" },
];

export const testimonials = [
  {
    id: 1,
    name: "Tariq Elahi",
    location: "Port Aza",
    rating: 5,
    quote:
      "The ball-by-ball commentary reads faster than the actual broadcast delay. I follow every over from my desk without missing a thing.",
  },
  {
    id: 2,
    name: "Grace Odum",
    location: "Bellmont",
    rating: 5,
    quote:
      "Player stats are laid out so cleanly during a run chase — I can see the required rate shift in real time and it genuinely changes how I watch.",
  },
  {
    id: 3,
    name: "Leo Furtado",
    location: "Dunwick",
    rating: 4,
    quote:
      "Highlights are up within minutes of the final ball. The clips are trimmed well, no filler, straight to the moment that mattered.",
  },
  {
    id: 4,
    name: "Sana Vetrivel",
    location: "Cresthill",
    rating: 5,
    quote:
      "Set a reminder for the quarter final and got a notification the moment the toss happened. Small thing, but it's the detail that keeps me coming back.",
  },
];
