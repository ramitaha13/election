import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  UserX,
  MapPin,
  Settings,
  LogOut,
  Bell,
  Search,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  Clock,
  AlertCircle,
  Menu,
  X,
  ClipboardCheck,
  Undo2,
} from "lucide-react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import naderphoto from "/src/assets/nader1.JPG";

const CANDIDATE = {
  name: "נאדר טאהא",
  list: "ל",

  photo: naderphoto,
};

const TOTAL_VOTERS = 48210;
const VOTED_SO_FAR = 29402;
const NOT_VOTED_YET = TOTAL_VOTERS - VOTED_SO_FAR;
const TOTAL_STATIONS = 32;

// סה"כ קולות שספר נאדר עד כה (מצטבר מכל הקלפיות שדיווחו)
const NADER_TOTAL_VOTES = 9120;
const NADER_SHARE_OF_COUNTED = Math.round(
  (NADER_TOTAL_VOTES / VOTED_SO_FAR) * 100,
);

const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Hebrew:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');
`;

const NAV_ITEMS = [
  {
    id: "overview",
    label: "סקירה כללית",
    icon: LayoutDashboard,
    path: "/admindashboard",
  },
  { id: "voter-check", label: "סימון מצביעים", icon: ClipboardCheck, path: "" },
  { id: "stations", label: "קלפיות", icon: MapPin, path: "/stationsPage" },
  { id: "voters", label: "בוחרים", icon: Users, path: "/voterspage" },
  { id: "settings", label: "הגדרות", icon: Settings, path: "" },
];

const KPIS = [
  {
    label: "מספר מצביעים",
    value: TOTAL_VOTERS.toLocaleString(),
    delta: "+1.2%",
    up: true,
    icon: Users,
  },
  {
    label: "הצביעו עד כה",
    value: VOTED_SO_FAR.toLocaleString(),
    delta: "+8.4%",
    up: true,
    icon: UserCheck,
  },
  {
    label: "לא הצביעו עדיין",
    value: NOT_VOTED_YET.toLocaleString(),
    delta: "-8.4%",
    up: false,
    icon: UserX,
  },
  {
    label: "מספר קלפיות",
    value: TOTAL_STATIONS.toString(),
    delta: "75% דיווחו",
    up: true,
    icon: MapPin,
  },
];

const TURNOUT_PERCENT = Math.round((VOTED_SO_FAR / TOTAL_VOTERS) * 100);

const STATIONS = [
  {
    code: "04",
    name: "קלפי 04 — בית ספר יסודי",
    area: "מרכז",
    voters: 2400,
    reportedCount: 2140,
    naderVotes: 1320,
    status: "סגורה",
    statusType: "done",
  },
  {
    code: "11",
    name: 'קלפי 11 — מתנ"ס',
    area: "מזרח",
    voters: 2100,
    reportedCount: 1860,
    naderVotes: 1110,
    status: "ספירה",
    statusType: "pending",
  },
  {
    code: "17",
    name: "קלפי 17 — אולם ספורט",
    area: "צפון",
    voters: 1950,
    reportedCount: 0,
    naderVotes: 0,
    status: "ממתינה",
    statusType: "waiting",
  },
  {
    code: "22",
    name: "קלפי 22 — מועדון קהילתי",
    area: "מערב",
    voters: 1800,
    reportedCount: 1510,
    naderVotes: 905,
    status: "סגורה",
    statusType: "done",
  },
];

// נתונים מוכנים לגרפים: אחוז הצבעה מחושב פר קלפי
const STATION_CHART_DATA = STATIONS.map((s) => ({
  ...s,
  turnoutPercent: Math.round((s.reportedCount / s.voters) * 100),
}));

const STATUS_BAR_COLOR = {
  done: "#2F6F62",
  pending: "#C99A3F",
  waiting: "#C9C5BC",
};

const STATUS_STYLES = {
  done: "bg-[#EAF1EE] text-[#2F6F62]",
  pending: "bg-[#FBF1E2] text-[#9A6B16]",
  waiting: "bg-[#F1EFEC] text-[#5B6472]",
};

const STATUS_ICON = {
  done: CheckCircle2,
  pending: Clock,
  waiting: AlertCircle,
};

function Sidebar({ active, onSelect, onLogout }) {
  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-[#14181F] text-[#EDEAE2] shrink-0">
      <div className="flex items-center gap-3 px-6 py-6 border-b border-white/10">
        <span className="flex items-center justify-center w-10 h-10 rounded-full border border-[#B8862F] text-[#B8862F] font-semibold">
          {CANDIDATE.list}
        </span>
        <div>
          <p className="font-semibold leading-tight text-sm">
            {CANDIDATE.name}
          </p>
          <p className="text-xs text-[#EDEAE2]/50 leading-tight">מעקב הצבעה</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-right transition-colors " +
                (isActive
                  ? "bg-[#B8862F]/15 text-[#EDC98A]"
                  : "text-[#EDEAE2]/70 hover:bg-white/5 hover:text-[#EDEAE2]")
              }
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-[#B8862F]/20 flex items-center justify-center text-xs font-semibold text-[#EDC98A]">
            נ.ט
          </div>
          <div className="min-w-0">
            <p className="text-sm leading-tight truncate">{CANDIDATE.name}</p>
            <p className="text-xs text-[#EDEAE2]/50 leading-tight">נציג</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-[#EDEAE2]/70 hover:bg-white/5 hover:text-[#EDEAE2] transition-colors"
        >
          <LogOut size={18} />
          התנתקות
        </button>
      </div>
    </aside>
  );
}

function MobileHeader({ onMenuClick }) {
  return (
    <div className="md:hidden flex items-center justify-between bg-[#14181F] text-[#EDEAE2] px-4 py-3 sticky top-0 z-30">
      <div className="flex items-center gap-2 min-w-0">
        <span className="flex items-center justify-center w-8 h-8 rounded-full border border-[#B8862F] text-[#B8862F] text-sm font-semibold shrink-0">
          {CANDIDATE.list}
        </span>
        <span className="text-sm font-semibold truncate">{CANDIDATE.name}</span>
      </div>
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="פתח תפריט"
        className="p-1.5 rounded-md hover:bg-white/10 active:bg-white/20 transition-colors shrink-0"
      >
        <Menu size={22} />
      </button>
    </div>
  );
}

function MobileDrawer({ open, onClose, active, onSelect, onLogout }) {
  return (
    <div
      className={
        "md:hidden fixed inset-0 z-40 " +
        (open ? "pointer-events-auto" : "pointer-events-none")
      }
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={
          "absolute inset-0 bg-black/40 transition-opacity duration-200 " +
          (open ? "opacity-100" : "opacity-0")
        }
      />
      <div
        className={
          "absolute inset-y-0 right-0 w-72 max-w-[82%] bg-[#14181F] text-[#EDEAE2] flex flex-col h-full transition-transform duration-200 " +
          (open ? "translate-x-0" : "translate-x-full")
        }
      >
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
          <div className="flex items-center gap-3 min-w-0">
            <span className="flex items-center justify-center w-9 h-9 rounded-full border border-[#B8862F] text-[#B8862F] font-semibold shrink-0">
              {CANDIDATE.list}
            </span>
            <div className="min-w-0">
              <p className="font-semibold text-sm leading-tight truncate">
                {CANDIDATE.name}
              </p>
              <p className="text-xs text-[#EDEAE2]/50 leading-tight">
                מעקב הצבעה
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="סגור תפריט"
            className="p-1.5 rounded-md hover:bg-white/10 shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelect(item.id);
                  onClose();
                }}
                className={
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-right transition-colors " +
                  (isActive
                    ? "bg-[#B8862F]/15 text-[#EDC98A]"
                    : "text-[#EDEAE2]/70 hover:bg-white/5 hover:text-[#EDEAE2]")
                }
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={() => {
              onClose();
              onLogout();
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-[#EDEAE2]/70 hover:bg-white/5 hover:text-[#EDEAE2] transition-colors"
          >
            <LogOut size={18} />
            התנתקות
          </button>
        </div>
      </div>
    </div>
  );
}

function KpiCard({ kpi }) {
  const Icon = kpi.icon;
  return (
    <div className="bg-white rounded-xl border border-[#14181F]/8 p-4 sm:p-5">
      <div className="flex items-center justify-between mb-2">
        <Icon size={15} className="text-[#5B6472]/60" />
        <p className="text-xs text-[#5B6472]">{kpi.label}</p>
      </div>
      <div className="flex items-baseline justify-between">
        <span
          className="text-xl sm:text-2xl font-semibold text-[#14181F]"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          {kpi.value}
        </span>
        <span
          className={
            "flex items-center gap-1 text-xs font-medium " +
            (kpi.up ? "text-[#2F6F62]" : "text-[#A33B2F]")
          }
        >
          {kpi.up ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
          {kpi.delta}
        </span>
      </div>
    </div>
  );
}

function OverallTurnoutCard({ percent }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percent / 100);

  return (
    <div className="bg-[#14181F] rounded-xl p-6 flex flex-col items-center text-center text-[#EDEAE2]">
      <div className="relative w-32 h-32 shrink-0 mb-4">
        <svg viewBox="0 0 140 140" className="w-32 h-32 -rotate-90">
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="#FFFFFF1A"
            strokeWidth="12"
          />
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="#B8862F"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-2xl font-semibold"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            {percent}%
          </span>
        </div>
      </div>
      <p className="text-sm font-medium text-[#EDEAE2] mb-1">אחוז הצבעה כללי</p>
      <p className="text-xs text-[#EDEAE2]/60 leading-relaxed max-w-[14rem]">
        גבוה ב-4.1 נקודות אחוז לעומת המחזור הקודם באותה שעה.
      </p>
    </div>
  );
}

function NaderVotesCard() {
  return (
    <div className="bg-[#14181F] rounded-xl p-6 flex flex-col items-center justify-center text-center text-[#EDEAE2]">
      <p className="text-sm font-medium text-[#EDEAE2]/70 mb-3">
        קולות לנאדר עד כה
      </p>
      <span
        className="text-5xl font-semibold text-[#EDC98A] mb-2"
        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
      >
        {NADER_TOTAL_VOTES.toLocaleString()}
      </span>
      <p className="text-xs text-[#EDEAE2]/60">
        {NADER_SHARE_OF_COUNTED}% מהקולות שנספרו עד כה
      </p>
    </div>
  );
}

function CandidateHeader() {
  return (
    <div className="flex items-center gap-4 bg-white rounded-xl border border-[#14181F]/8 p-4 sm:p-5">
      <div className="relative shrink-0">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-[#B8862F]/30">
          {/* TODO: להחליף בתמונה אמיתית */}
          <img
            src={CANDIDATE.photo}
            alt={CANDIDATE.name}
            className="w-full h-full object-cover"
          />
        </div>
        <span className="absolute -bottom-1 -left-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#B8862F] text-[#14181F] text-[10px] sm:text-[11px] font-semibold flex items-center justify-center border-2 border-white">
          {CANDIDATE.list}
        </span>
      </div>
      <div className="min-w-0">
        <p className="font-semibold text-[#14181F] truncate">
          {CANDIDATE.name}
        </p>
        <p className="text-xs text-[#5B6472] truncate">
          מעקב הצבעה בזמן אמת · רשימה {CANDIDATE.list}
        </p>
      </div>
    </div>
  );
}

function StationsTable() {
  return (
    <div className="bg-white rounded-xl border border-[#14181F]/8 overflow-hidden">
      <div className="px-5 py-4 border-b border-[#14181F]/8 flex items-center justify-between">
        <h2 className="font-semibold text-[#14181F] text-sm">סטטוס קלפיות</h2>
        <button className="text-xs text-[#B8862F] hover:underline">
          לכל הקלפיות
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="bg-[#F6F4EF] text-[#5B6472] text-xs">
              <th className="text-right px-5 py-3 font-medium">קלפי</th>
              <th className="text-right px-5 py-3 font-medium">אזור</th>
              <th className="text-right px-5 py-3 font-medium">דיווח קולות</th>
              <th className="text-right px-5 py-3 font-medium">אחוז הצבעה</th>
              <th className="text-right px-5 py-3 font-medium">קולות לנאדר</th>
            </tr>
          </thead>
          <tbody>
            {STATIONS.map((s) => {
              const Icon = STATUS_ICON[s.statusType];
              const turnoutPercent = Math.round(
                (s.reportedCount / s.voters) * 100,
              );
              const naderShare =
                s.reportedCount > 0
                  ? Math.round((s.naderVotes / s.reportedCount) * 100)
                  : 0;
              return (
                <tr
                  key={s.name}
                  className="border-b border-[#14181F]/5 last:border-0"
                >
                  <td className="px-5 py-3 text-[#14181F] font-medium whitespace-nowrap">
                    {s.name}
                  </td>
                  <td className="px-5 py-3 text-[#5B6472]">{s.area}</td>
                  <td
                    className="px-5 py-3 text-[#5B6472] whitespace-nowrap"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    {s.reportedCount.toLocaleString()} /{" "}
                    {s.voters.toLocaleString()}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-[#5B6472] w-9"
                        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                      >
                        {turnoutPercent}%
                      </span>
                      <div className="h-1.5 w-16 rounded-full bg-[#F1EFEC] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#2F6F62]"
                          style={{ width: `${turnoutPercent}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td
                    className="px-5 py-3 text-[#14181F] font-medium whitespace-nowrap"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    {s.naderVotes.toLocaleString()}
                    {s.reportedCount > 0 && (
                      <span className="text-[#5B6472] font-normal">
                        {" "}
                        ({naderShare}%)
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// פאנל סימון מצביעים: סימון "הצביע" לפי מספר סידורי, ותיקון סימון שבוצע בטעות
function VoterCheckPanel() {
  const [votedSerials, setVotedSerials] = useState(new Set());
  const [markInput, setMarkInput] = useState("");
  const [undoInput, setUndoInput] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [activityLog, setActivityLog] = useState([]);

  const pushLog = (entry) => {
    setActivityLog((prev) => [entry, ...prev].slice(0, 8));
  };

  const handleMark = (e) => {
    e.preventDefault();
    const num = markInput.trim();
    if (!num) return;

    if (votedSerials.has(num)) {
      setFeedback({ type: "error", text: `מספר ${num} כבר מסומן כהצביע` });
      return;
    }

    const next = new Set(votedSerials);
    next.add(num);
    setVotedSerials(next);
    setFeedback({ type: "success", text: `מספר ${num} סומן כהצביע` });
    pushLog({ number: num, action: "marked", time: new Date() });
    setMarkInput("");
  };

  const handleUndo = (e) => {
    e.preventDefault();
    const num = undoInput.trim();
    if (!num) return;

    if (!votedSerials.has(num)) {
      setFeedback({ type: "error", text: `מספר ${num} לא היה מסומן כהצביע` });
      return;
    }

    const next = new Set(votedSerials);
    next.delete(num);
    setVotedSerials(next);
    setFeedback({ type: "success", text: `הסימון של מספר ${num} בוטל` });
    pushLog({ number: num, action: "unmarked", time: new Date() });
    setUndoInput("");
  };

  return (
    <div className="flex flex-col gap-5 md:gap-6">
      <div className="bg-white rounded-xl border border-[#14181F]/8 p-4 sm:p-5">
        <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
          <h2 className="font-semibold text-[#14181F] text-sm">
            סימון מצביעים
          </h2>
          <span
            className="text-xs text-[#5B6472]"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            {votedSerials.size} מסומנים
          </span>
        </div>
        <p className="text-xs text-[#5B6472] mb-5">
          הקלד/י את המספר הסידורי של המצביע כדי לסמן שהוא הצביע, או לתקן סימון
          שבוצע בטעות.
        </p>

        {feedback && (
          <div
            className={
              "flex items-center gap-2 text-sm px-3 py-2 rounded-md mb-5 " +
              (feedback.type === "success"
                ? "bg-[#EAF1EE] text-[#2F6F62]"
                : "bg-[#FCEAE8] text-[#A33B2F]")
            }
          >
            {feedback.type === "success" ? (
              <CheckCircle2 size={16} />
            ) : (
              <AlertCircle size={16} />
            )}
            {feedback.text}
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-5">
          <form onSubmit={handleMark} className="flex flex-col gap-3">
            <label className="flex items-center gap-2 text-sm font-medium text-[#14181F]">
              <ClipboardCheck size={16} className="text-[#2F6F62]" />
              סימון הצבעה (מחיקת מספר)
            </label>
            <input
              type="text"
              inputMode="numeric"
              value={markInput}
              onChange={(e) => setMarkInput(e.target.value)}
              placeholder="מספר סידורי של המצביע"
              className="w-full px-3 py-2.5 rounded-md border border-[#14181F]/15 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F6F62]/30"
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-[#2F6F62] text-white px-4 py-2.5 rounded-md text-sm font-medium hover:bg-[#27594F] active:bg-[#214A42] transition-colors"
            >
              <ClipboardCheck size={16} />
              סמן כהצביע
            </button>
          </form>

          <form onSubmit={handleUndo} className="flex flex-col gap-3">
            <label className="flex items-center gap-2 text-sm font-medium text-[#14181F]">
              <Undo2 size={16} className="text-[#9A6B16]" />
              תיקון מחיקה
            </label>
            <input
              type="text"
              inputMode="numeric"
              value={undoInput}
              onChange={(e) => setUndoInput(e.target.value)}
              placeholder="מספר סידורי לביטול הסימון"
              className="w-full px-3 py-2.5 rounded-md border border-[#14181F]/15 text-sm focus:outline-none focus:ring-2 focus:ring-[#C99A3F]/30"
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-[#C99A3F] text-white px-4 py-2.5 rounded-md text-sm font-medium hover:bg-[#B8862F] active:bg-[#9A6B16] transition-colors"
            >
              <Undo2 size={16} />
              בטל סימון
            </button>
          </form>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#14181F]/8 overflow-hidden">
        <div className="px-4 sm:px-5 py-4 border-b border-[#14181F]/8">
          <h2 className="font-semibold text-[#14181F] text-sm">
            פעולות אחרונות
          </h2>
        </div>
        {activityLog.length === 0 ? (
          <p className="px-5 py-6 text-sm text-[#5B6472] text-center">
            אין פעולות עדיין
          </p>
        ) : (
          <ul className="divide-y divide-[#14181F]/5">
            {activityLog.map((entry, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between px-4 sm:px-5 py-3 text-sm gap-3"
              >
                <span className="flex items-center gap-2 text-[#14181F] min-w-0">
                  {entry.action === "marked" ? (
                    <ClipboardCheck
                      size={15}
                      className="text-[#2F6F62] shrink-0"
                    />
                  ) : (
                    <Undo2 size={15} className="text-[#9A6B16] shrink-0" />
                  )}
                  <span className="truncate">
                    מספר {entry.number} —{" "}
                    {entry.action === "marked" ? "סומן כהצביע" : "בוטל סימון"}
                  </span>
                </span>
                <span
                  className="text-xs text-[#5B6472] shrink-0"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  {entry.time.toLocaleTimeString("he-IL", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function ElectionAdminDashboard({ onLogout }) {
  const [active, setActive] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      navigate("/");
    }
  };

  const handleSelect = (id) => {
    const item = NAV_ITEMS.find((i) => i.id === id);

    if (item?.path) {
      navigate(item.path);
      return;
    }

    setActive(id);
  };

  return (
    <div dir="rtl" style={{ fontFamily: "'IBM Plex Sans Hebrew', sans-serif" }}>
      <style>{FONT_IMPORT}</style>
      <div className="min-h-screen bg-[#F6F4EF] flex">
        <Sidebar
          active={active}
          onSelect={handleSelect}
          onLogout={handleLogout}
        />

        <div className="flex-1 min-w-0">
          <MobileHeader onMenuClick={() => setMobileMenuOpen(true)} />
          <MobileDrawer
            open={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            active={active}
            onSelect={handleSelect}
            onLogout={handleLogout}
          />

          <main className="px-4 sm:px-6 md:px-8 py-5 md:py-6 flex flex-col gap-5 md:gap-6">
            {active === "voter-check" ? (
              <VoterCheckPanel />
            ) : (
              <>
                <CandidateHeader />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {KPIS.map((kpi) => (
                    <KpiCard key={kpi.label} kpi={kpi} />
                  ))}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <OverallTurnoutCard percent={TURNOUT_PERCENT} />
                  <NaderVotesCard />
                </div>

                <StationsTable />
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
