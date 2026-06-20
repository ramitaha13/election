import {
  // אם תרצו אייקון בכפתור הכניסה
  LogIn,
} from "lucide-react";

/**
 * מסך פתיחה פשוט: שם, תמונה, כפתור כניסה למערכת.
 * --------------------------------------------------
 * TODO: PHOTO_URL — להחליף בתמונה האמיתית של נאדר טאהא.
 * כרגע מוצב avatar מאויר זמני (לא תמונה אמיתית).
 * TODO: onLogin — לחבר לפעולת הכניסה בפועל (ניווט / קריאת API).
 */

const PHOTO_URL =
  "https://api.dicebear.com/7.x/avataaars/svg?seed=NaderTaha&backgroundColor=f5efe3";

export default function LoginEntryScreen({ onLogin }) {
  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#F5EFE3] flex items-center justify-center px-6"
    >
      <div className="flex flex-col items-center text-center gap-6">
        <h1 className="text-2xl font-bold text-[#1B2430]">נאדר טאהא</h1>

        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-[#C28840]/30 bg-white">
          {/* TODO: להחליף PHOTO_URL בתמונה אמיתית */}
          <img
            src={PHOTO_URL}
            alt="נאדר טאהא"
            className="w-full h-full object-cover"
          />
        </div>

        <button
          type="button"
          onClick={onLogin}
          className="flex items-center gap-2 bg-[#1B2430] text-[#F5EFE3] px-8 py-3 rounded-md font-medium hover:bg-[#2a3544] transition-colors"
        >
          <LogIn size={18} />
          כניסה למערכת
        </button>
      </div>
    </div>
  );
}
