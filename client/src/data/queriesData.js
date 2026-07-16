const STORAGE_KEY = 'apj_queries';
const REPLIES_KEY = 'apj_query_replies';

const initialQueries = [
  {
    id: 1,
    student: "Rahul Verma",
    course: "B.Tech CSE - 2nd Year",
    subject: "Issue with fee portal payment failure",
    preview: "I tried paying my semester fee yesterday but the amount was deducted without receipt...",
    time: "10 mins ago",
    status: "open",
    priority: "high",
    avatar: "R"
  },
  {
    id: 2,
    student: "Neha Singh",
    course: "BCA - 1st Year",
    subject: "Request for Bonafide Certificate",
    preview: "Could you please issue a bonafide certificate for my scholarship application?",
    time: "2 hours ago",
    status: "open",
    priority: "medium",
    avatar: "N"
  }
];

export const getQueries = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    return JSON.parse(data);
  }
  saveQueries(initialQueries);
  return initialQueries;
};

export const saveQueries = (queries) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(queries));
};

export const getReplies = () => {
  const data = localStorage.getItem(REPLIES_KEY);
  if (data) {
    return JSON.parse(data);
  }
  return {};
};

export const saveReplies = (replies) => {
  localStorage.setItem(REPLIES_KEY, JSON.stringify(replies));
};
