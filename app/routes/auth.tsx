import { usePuterStore } from "~/lib/puter";
import type { Route } from "../+types/root";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useI18n } from "~/lib/i18n";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "ResTrack | Auth" },
    { name: "description", content: "ResTrack Authentication Page" },
  ];
};

const auth = () => {
  const { isLoading, auth } = usePuterStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useI18n();

  //   const next = location.search.split("next=")[1] || "/";
  const params = new URLSearchParams(location.search); // Validate that next is a relative path (starts with /) and doesn't contain protocol
  const rawNext = params.get("next") || "/";
  const next =
    rawNext.startsWith("/") && !rawNext.startsWith("//") ? rawNext : "/";

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate(next);
    }
  }, [auth.isAuthenticated, next]);

  return (
    <main className="bg-[url('/images/bg-color.jpg')] bg-cover min-h-screen flex items-center justify-center">
      <div className="gradient-border shadow-lg">
        <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
          <div className="flex flex-col gap-2 items-center text-center ">
            <h1>{t("auth.welcome")}</h1>
            {auth.isAuthenticated ? (
              <h2>{t("auth.loggedIn")}</h2>
            ) : (
              <h2>{t("auth.logInToContinue")}</h2>
            )}
          </div>
          <div>
            {isLoading ? (
              <button className="auth-button animate-pulse">
                <p>{t("auth.signingIn")}</p>
              </button>
            ) : (
              <>
                {auth.isAuthenticated ? (
                  <div className="flex flex-col gap-4 items-center">
                    <button
                      className="auth-button"
                      onClick={() => navigate(next)}
                    >
                      <p> {t("buttons.homepage")}</p>
                    </button>
                    <button className="auth-button" onClick={auth.signOut}>
                      <p> {t("buttons.logout")}</p>
                    </button>
                  </div>
                ) : (
                  <button className="auth-button" onClick={auth.signIn}>
                    <p> {t("buttons.login")}</p>
                  </button>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default auth;
