import type { Route } from "../+types/root";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "ResTrack | Auth" },
    { name: "description", content: "ResTrack Authentication Page" },
  ];
};

const auth = () => {
  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">auth</main>;
};

export default auth;
