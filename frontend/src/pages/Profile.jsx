// Renders the user profile page.
import React from "react";
import {
  LogOut,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const Profile = () => {
  const navigate = useNavigate();

  const {
    user,
    loading,
    logout,
  } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  if (loading) {
    return (
      <section className="min-h-[65vh] bg-stone-50 px-5 py-14">
        <div className="mx-auto max-w-5xl text-sm font-medium text-zinc-500">
          Loading profile...
        </div>
      </section>
    );
  }

  if (!user) {
    return null;
  }

  const joinedDate = user.createdAt
    ? new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(new Date(user.createdAt))
    : "Not available";

  const profileRows = [
    {
      label: "Name",
      value: user.name || "Not available",
      icon: UserRound,
    },
    {
      label: "Email",
      value: user.email || "Not available",
      icon: Mail,
    },
    {
      label: "Phone",
      value: user.phone || "Not added",
      icon: Phone,
    },
    {
      label: "Role",
      value: user.role || "user",
      icon: ShieldCheck,
    },
    {
      label: "Provider",
      value:
        user.provider === "google"
          ? "Google"
          : "Email and password",
      icon: ShieldCheck,
    },
    {
      label: "Saved Addresses",
      value: `${user.addresses?.length || 0} saved`,
      icon: MapPin,
    },
  ];

  return (
    <section className="min-h-[65vh] bg-stone-50 px-5 py-14">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col justify-between gap-5 border-b border-zinc-200 pb-8 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-zinc-400">
              Account
            </p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-zinc-950 md:text-4xl">
              My Profile
            </h1>
            <p className="mt-2 text-sm text-zinc-500">
              View your account details and saved profile information.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 text-sm font-bold text-zinc-700 transition-colors hover:border-zinc-300 hover:text-zinc-950"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt=""
                className="h-16 w-16 rounded-full object-cover ring-2 ring-zinc-100"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-950 text-xl font-black uppercase text-white">
                {(user.name || user.email || "U").charAt(0)}
              </div>
            )}
            <h2 className="mt-5 text-xl font-black text-zinc-950">
              {user.name || "Crafton Customer"}
            </h2>
            <p className="mt-1 break-all text-sm text-zinc-500">
              {user.email}
            </p>
            <div className="mt-5 rounded-xl bg-stone-50 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Joined {joinedDate}
            </div>
          </aside>

          <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-black text-zinc-950">
              Account Details
            </h2>

            <div className="mt-5 divide-y divide-zinc-100">
              {profileRows.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-50 text-zinc-700">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-bold text-zinc-500">
                        {item.label}
                      </span>
                    </div>
                    <span className="break-all text-sm font-semibold text-zinc-950 sm:text-right">
                      {item.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
