export type ConversationSource = {
  group: string;
  description: string;
  examples: string[];
};

export const conversationSources: ConversationSource[] = [
  {
    group: "Warm sphere",
    description:
      "People who already know you. Start here. These are the fastest first conversations of your week.",
    examples: [
      "Past clients",
      "Friends and family",
      "Sphere of influence (former coworkers, neighbors, gym, church, school parents)",
      "Past declined borrowers who may now qualify",
      "Old leads that went quiet",
    ],
  },
  {
    group: "Real estate partners",
    description:
      "Lead with what Realtors actually care about. Speed, communication, closing certainty.",
    examples: [
      "Priority Realtors in your market (top 25 list)",
      "Open house agents on Saturdays",
      "Listing agents on offers you're already on",
      "Local builders",
      "Referral partner databases from prior shops where allowed",
    ],
  },
  {
    group: "Adjacent professionals",
    description:
      "Peer professionals who serve the same clients. Position as a trusted peer, not a vendor.",
    examples: [
      "CPAs",
      "Financial advisors",
      "Divorce attorneys",
      "Credit repair contacts",
      "Insurance agents",
      "Local business owners",
    ],
  },
  {
    group: "Borrowers ready to act",
    description:
      "Buyers and homeowners in market right now. Compliance review for any borrower facing message.",
    examples: [
      "Pre approved buyers who are not under contract yet",
      "Renters in your farm neighborhoods",
      "Homeowners who bought two to five years ago",
      "Veterans groups, if licensed and appropriate",
      "First time buyer groups",
    ],
  },
  {
    group: "Online communities",
    description:
      "Be useful first. No DMs that quote rates. No DMs that promise approvals.",
    examples: [
      "Facebook groups where people ask buying questions",
      "Local networking groups",
      "Local nextdoor and neighborhood threads where allowed",
    ],
  },
];
