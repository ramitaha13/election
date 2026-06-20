import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  MapPin,
  Settings,
  LogOut,
  Search,
  ChevronDown,
  ArrowRight,
  CheckCircle2,
  Circle,
  Phone,
  Home,
  Menu,
  X,
  ClipboardCheck,
} from "lucide-react";
import naderphoto from "/src/assets/nader1.JPG";

const CANDIDATE = {
  name: "נאדר טאהא",
  list: "ל",
  photo: naderphoto,
};

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
  {
    id: "voter-check",
    label: "סימון מצביעים",
    icon: ClipboardCheck,
    path: "",
  },
  { id: "stations", label: "קלפיות", icon: MapPin, path: "stationsPage" },
  { id: "voters", label: "בוחרים", icon: Users, path: "voterspage" },
  { id: "settings", label: "הגדרות", icon: Settings, path: "" },
];

// שם הקלפי לפי קוד, לשימוש בכותרת העמוד
const STATION_NAMES = {
  "04": "קלפי 04 — בית ספר יסודי",
  11: 'קלפי 11 — מתנ"ס',
  17: "קלפי 17 — אולם ספורט",
  22: "קלפי 22 — מועדון קהילתי",
};

// נתוני בוחרים לדוגמה, מקובצים לפי קוד קלפי
const VOTERS = [
  {
    id: "1",
    name: "מוחמד עלי חמדאן",
    idNumber: "203456781",
    address: "רחוב הגליל 12",
    phone: "050-1234567",
    station: "04",
    voted: true,
  },
  {
    id: "2",
    name: "סאמר יוסף קאסם",
    idNumber: "203456782",
    address: "רחוב הרצל 5",
    phone: "052-2345678",
    station: "04",
    voted: true,
  },
  {
    id: "3",
    name: "ליאן עבד אלחאלים",
    idNumber: "203456783",
    address: "שדרות הכרמל 21",
    phone: "054-3456789",
    station: "04",
    voted: false,
  },
  {
    id: "4",
    name: "רים נג'יב סלימאן",
    idNumber: "203456784",
    address: "רחוב העצמאות 8",
    phone: "053-4567890",
    station: "04",
    voted: true,
  },
  {
    id: "5",
    name: "פאדי ג'מאל חוסיין",
    idNumber: "203456785",
    address: "רחוב הזית 3",
    phone: "058-5678901",
    station: "04",
    voted: false,
  },
  {
    id: "6",
    name: "נור אחמד דיאב",
    idNumber: "203456786",
    address: "רחוב היסמין 17",
    phone: "050-6789012",
    station: "11",
    voted: true,
  },
  {
    id: "7",
    name: "באסל סולימאן עיסא",
    idNumber: "203456787",
    address: "רחוב השלום 9",
    phone: "052-7890123",
    station: "11",
    voted: false,
  },
  {
    id: "8",
    name: "דאלאל מוסטפא חיר",
    idNumber: "203456788",
    address: "רחוב הנרקיס 14",
    phone: "054-8901234",
    station: "11",
    voted: true,
  },
  {
    id: "9",
    name: "כרים פארס נסאר",
    idNumber: "203456789",
    address: "רחוב התות 6",
    phone: "053-9012345",
    station: "17",
    voted: false,
  },
  {
    id: "10",
    name: "ראניה זיאד מנסור",
    idNumber: "203456790",
    address: "רחוב הדקל 11",
    phone: "058-0123456",
    station: "17",
    voted: false,
  },
  {
    id: "11",
    name: "עומר חסן ח'טיב",
    idNumber: "203456791",
    address: "רחוב האלון 2",
    phone: "050-1357924",
    station: "22",
    voted: true,
  },
  {
    id: "12",
    name: "מאיה סלים עווד",
    idNumber: "203456792",
    address: "רחוב הזית 19",
    phone: "052-2468135",
    station: "22",
    voted: true,
  },
];

const VOTE_OPTIONS = [
  { value: "all", label: "הכל" },
  { value: "voted", label: "הצביעו" },
  { value: "not-voted", label: "לא הצביעו" },
];

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
              onClick={() => onSelect(item)}
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
                  onSelect(item);
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

function VoterRow({ voter }) {
  return (
    <div className="bg-white rounded-xl border border-[#14181F]/8 p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-full bg-[#F6F4EF] flex items-center justify-center text-sm font-semibold text-[#14181F] shrink-0">
          {voter.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <p className="font-medium text-[#14181F] text-sm truncate">
            {voter.name}
          </p>
          <p
            className="text-xs text-[#5B6472]"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            ת.ז. {voter.idNumber}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4 text-xs text-[#5B6472]">
        <span className="flex items-center gap-1.5">
          <Home size={12} />
          {voter.address}
        </span>
        <span
          className="flex items-center gap-1.5"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          <Phone size={12} />
          {voter.phone}
        </span>
      </div>

      <span
        className={
          "flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full shrink-0 self-start sm:self-auto " +
          (voter.voted
            ? "bg-[#EAF1EE] text-[#2F6F62]"
            : "bg-[#F1EFEC] text-[#5B6472]")
        }
      >
        {voter.voted ? <CheckCircle2 size={13} /> : <Circle size={13} />}
        {voter.voted ? "הצביע/ה" : "לא הצביע/ה"}
      </span>
    </div>
  );
}

export default function VotersByStationPage({ onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [voteFilter, setVoteFilter] = useState("all");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const stationCode = searchParams.get("station");

  const handleSelect = (item) => navigate(item.path);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      navigate("/");
    }
  };

  const stationVoters = stationCode
    ? VOTERS.filter((v) => v.station === stationCode)
    : VOTERS;

  const filtered = stationVoters.filter((v) => {
    const matchesQuery =
      query.trim() === "" ||
      v.name.includes(query.trim()) ||
      v.idNumber.includes(query.trim());
    const matchesVote =
      voteFilter === "all" ||
      (voteFilter === "voted" && v.voted) ||
      (voteFilter === "not-voted" && !v.voted);
    return matchesQuery && matchesVote;
  });

  const totalCount = stationVoters.length;
  const votedCount = stationVoters.filter((v) => v.voted).length;
  const turnoutPercent =
    totalCount > 0 ? Math.round((votedCount / totalCount) * 100) : 0;

  const stationTitle = stationCode
    ? STATION_NAMES[stationCode] || `קלפי ${stationCode}`
    : "כל הבוחרים";

  return (
    <div dir="rtl" style={{ fontFamily: "'IBM Plex Sans Hebrew', sans-serif" }}>
      <style>{FONT_IMPORT}</style>
      <div className="min-h-screen bg-[#F6F4EF] flex">
        <Sidebar
          active="voters"
          onSelect={handleSelect}
          onLogout={handleLogout}
        />

        <div className="flex-1 min-w-0">
          <MobileHeader onMenuClick={() => setMobileMenuOpen(true)} />
          <MobileDrawer
            open={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            active="voters"
            onSelect={handleSelect}
            onLogout={handleLogout}
          />

          <main className="px-4 sm:px-6 md:px-8 py-5 md:py-6 flex flex-col gap-5 md:gap-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                {stationCode && (
                  <button
                    onClick={() => navigate("/stationsPage")}
                    className="flex items-center gap-1.5 text-xs text-[#5B6472] hover:text-[#14181F] mb-1.5 transition-colors"
                  >
                    <ArrowRight size={14} />
                    חזרה לקלפיות
                  </button>
                )}
                <h1 className="font-semibold text-[#14181F] text-lg flex items-center gap-2">
                  <Users size={18} />
                  {stationTitle}
                </h1>
                <p className="text-xs text-[#5B6472]">
                  {totalCount} מצביעים · {votedCount} הצביעו
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl border border-[#14181F]/8 p-4">
                <p className="text-xs text-[#5B6472] mb-1">סה"כ מצביעים</p>
                <p
                  className="text-lg font-semibold text-[#14181F]"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  {totalCount.toLocaleString()}
                </p>
              </div>
              <div className="bg-white rounded-xl border border-[#14181F]/8 p-4">
                <p className="text-xs text-[#5B6472] mb-1">הצביעו</p>
                <p
                  className="text-lg font-semibold text-[#2F6F62]"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  {votedCount.toLocaleString()}
                </p>
              </div>
              <div className="bg-white rounded-xl border border-[#14181F]/8 p-4">
                <p className="text-xs text-[#5B6472] mb-1">אחוז הצבעה</p>
                <p
                  className="text-lg font-semibold text-[#B8862F]"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  {turnoutPercent}%
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-[#14181F]/8 p-4 sm:p-5 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5B6472]"
                />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="חיפוש לפי שם או תעודת זהות"
                  className="w-full pr-9 pl-3 py-2.5 rounded-md border border-[#14181F]/15 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F6F62]/30"
                />
              </div>

              <div className="relative">
                <select
                  value={voteFilter}
                  onChange={(e) => setVoteFilter(e.target.value)}
                  className="appearance-none pr-3 pl-8 py-2.5 rounded-md border border-[#14181F]/15 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2F6F62]/30"
                >
                  {VOTE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#5B6472] pointer-events-none"
                />
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="bg-white rounded-xl border border-[#14181F]/8 p-10 text-center text-sm text-[#5B6472]">
                לא נמצאו מצביעים התואמים את החיפוש
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {filtered.map((voter) => (
                  <VoterRow key={voter.id} voter={voter} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
