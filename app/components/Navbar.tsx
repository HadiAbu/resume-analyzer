import { Link } from "react-router";
import { useAuthStore } from "~/hooks/useAuthStore";
import { useI18n } from "~/lib/i18n";

const Navbar = () => {
  const { t, locale, setLocale } = useI18n();
  const { isAuthenticated, pending, _hasHydrated } = useAuthStore();
  const isLoading = !_hasHydrated || pending;

  return (
    <nav className="navbar">
      <Link to="/" className="text-2xl font-bold text-gradient">
        {t("navbar.brand")}
      </Link>
      <div className="flex items-center gap-4">
        <Link to="/upload" className="primary-button w-fit">
          {t("navbar.upload")}
        </Link>
        <Link
          to={isLoading ? "#" : "/auth"}
          className={`secondary-button w-fit ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isLoading ? (
            <div className="animate-pulse bg-gray-300 h-4 w-16 rounded" /> // A small skeleton bar
          ) : isAuthenticated ? (
            t("navbar.signout")
          ) : (
            t("navbar.auth")
          )}
        </Link>

        <select
          aria-label="Language"
          value={locale}
          onChange={(e) => setLocale(e.target.value as any)}
          className="p-1 rounded-lg border"
        >
          <option value="en">En</option>
          <option value="ar">العربية</option>
          <option value="he">עברית</option>
        </select>
      </div>
    </nav>
  );
};

export default Navbar;
