import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  MapPin,
  Settings,
  LogOut,
  Search,
  ChevronDown,
  MapPinned,
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

// כל פריט מכיל גם נתיב לניווט בין דפים
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
    path: "/admindashboard",
  },
  { id: "stations", label: "קלפיות", icon: MapPin, path: "/stationsPage" },
  { id: "voters", label: "בוחרים", icon: Users, path: "/voterspage" },
  { id: "settings", label: "הגדרות", icon: Settings, path: "" },
];

const STATIONS = [
  {
    code: "04",
    name: "קלפי 04 — בית ספר יסודי",
    area: "מרכז",
    voters: 2400,
    reportedCount: 2140,
    naderVotes: 1320,
  },
  {
    code: "11",
    name: 'קלפי 11 — מתנ"ס',
    area: "מזרח",
    voters: 2100,
    reportedCount: 1860,
    naderVotes: 1110,
  },
  {
    code: "17",
    name: "קלפי 17 — אולם ספורט",
    area: "צפון",
    voters: 1950,
    reportedCount: 0,
    naderVotes: 0,
  },
  {
    code: "22",
    name: "קלפי 22 — מועדון קהילתי",
    area: "מערב",
    voters: 1800,
    reportedCount: 1510,
    naderVotes: 905,
  },
];

const PROGRESS_BAR_COLOR = "#2F6F62";

const AREA_OPTIONS = ["הכל", "מרכז", "מזרח", "צפון", "מערב"];

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

function StationCard({ station, onShowVoters }) {
  const turnoutPercent =
    station.voters > 0
      ? Math.round((station.reportedCount / station.voters) * 100)
      : 0;
  const naderShare =
    station.reportedCount > 0
      ? Math.round((station.naderVotes / station.reportedCount) * 100)
      : 0;

  return (
    <div className="bg-white rounded-xl border border-[#14181F]/8 p-4 sm:p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#F6F4EF] text-[#14181F] text-sm font-semibold shrink-0">
            {station.code}
          </span>
          <div className="min-w-0">
            <p className="font-medium text-[#14181F] text-sm truncate">
              {station.name}
            </p>
            <p className="text-xs text-[#5B6472] flex items-center gap-1">
              <MapPinned size={12} />
              {station.area}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <p className="text-xs text-[#5B6472] mb-1">בוחרים בקלפי</p>
          <p
            className="text-sm font-semibold text-[#14181F]"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            {station.voters.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-xs text-[#5B6472] mb-1">דיווח קולות</p>
          <p
            className="text-sm font-semibold text-[#14181F]"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            {station.reportedCount.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-xs text-[#5B6472] mb-1">קולות לנאדר</p>
          <p
            className="text-sm font-semibold text-[#B8862F]"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            {station.naderVotes.toLocaleString()}
            {station.reportedCount > 0 && (
              <span className="text-[#5B6472] font-normal text-xs">
                {" "}
                ({naderShare}%)
              </span>
            )}
          </p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-[#5B6472]">אחוז הצבעה</span>
          <span
            className="text-xs font-medium text-[#14181F]"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            {turnoutPercent}%
          </span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-[#F1EFEC] overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${turnoutPercent}%`,
              backgroundColor: PROGRESS_BAR_COLOR,
            }}
          />
        </div>
      </div>

      <button
        onClick={() => onShowVoters(station)}
        className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium bg-[#14181F] text-[#EDEAE2] hover:bg-[#14181F]/90 transition-colors"
      >
        <Users size={16} />
        הצגת מצביעים
      </button>
    </div>
  );
}

export default function StationsPage({ onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [areaFilter, setAreaFilter] = useState("הכל");
  const navigate = useNavigate();

  const handleSelect = (item) => navigate(item.path);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      navigate("/");
    }
  };

  const handleShowVoters = (station) => {
    navigate(`/votersbystationpage?station=${station.code}`);
  };

  const filtered = STATIONS.filter((s) => {
    const matchesQuery =
      query.trim() === "" ||
      s.name.includes(query.trim()) ||
      s.code.includes(query.trim());
    const matchesArea = areaFilter === "הכל" || s.area === areaFilter;
    return matchesQuery && matchesArea;
  });

  const totalVoters = STATIONS.reduce((sum, s) => sum + s.voters, 0);
  const totalReported = STATIONS.reduce((sum, s) => sum + s.reportedCount, 0);
  const totalNader = STATIONS.reduce((sum, s) => sum + s.naderVotes, 0);

  return (
    <div dir="rtl" style={{ fontFamily: "'IBM Plex Sans Hebrew', sans-serif" }}>
      <style>{FONT_IMPORT}</style>
      <div className="min-h-screen bg-[#F6F4EF] flex">
        <Sidebar
          active="stations"
          onSelect={handleSelect}
          onLogout={handleLogout}
        />

        <div className="flex-1 min-w-0">
          <MobileHeader onMenuClick={() => setMobileMenuOpen(true)} />
          <MobileDrawer
            open={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            active="stations"
            onSelect={handleSelect}
            onLogout={handleLogout}
          />

          <main className="px-4 sm:px-6 md:px-8 py-5 md:py-6 flex flex-col gap-5 md:gap-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h1 className="font-semibold text-[#14181F] text-lg flex items-center gap-2">
                  <MapPin size={18} />
                  קלפיות
                </h1>
                <p className="text-xs text-[#5B6472]">
                  {STATIONS.length} קלפיות
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl border border-[#14181F]/8 p-4">
                <p className="text-xs text-[#5B6472] mb-1">בוחרים</p>
                <p
                  className="text-lg font-semibold text-[#14181F]"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  {totalVoters.toLocaleString()}
                </p>
              </div>
              <div className="bg-white rounded-xl border border-[#14181F]/8 p-4">
                <p className="text-xs text-[#5B6472] mb-1">דיווח קולות</p>
                <p
                  className="text-lg font-semibold text-[#14181F]"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  {totalReported.toLocaleString()}
                </p>
              </div>
              <div className="bg-white rounded-xl border border-[#14181F]/8 p-4">
                <p className="text-xs text-[#5B6472] mb-1">קולות לנאדר</p>
                <p
                  className="text-lg font-semibold text-[#B8862F]"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  {totalNader.toLocaleString()}
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
                  placeholder="חיפוש לפי שם או מספר קלפי"
                  className="w-full pr-9 pl-3 py-2.5 rounded-md border border-[#14181F]/15 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F6F62]/30"
                />
              </div>

              <div className="relative">
                <select
                  value={areaFilter}
                  onChange={(e) => setAreaFilter(e.target.value)}
                  className="appearance-none pr-3 pl-8 py-2.5 rounded-md border border-[#14181F]/15 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2F6F62]/30"
                >
                  {AREA_OPTIONS.map((area) => (
                    <option key={area} value={area}>
                      {area}
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
                לא נמצאו קלפיות התואמות את החיפוש
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((station) => (
                  <StationCard
                    key={station.code}
                    station={station}
                    onShowVoters={handleShowVoters}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
