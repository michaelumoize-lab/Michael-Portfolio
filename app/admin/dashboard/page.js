"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  LogOut,
  Mail,
  Inbox,
  CheckCircle2,
  Clock,
  User,
  RefreshCw,
  Trash2,
  Check,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const unreadCount = useMemo(
    () => messages.filter((m) => !m.isRead).length,
    [messages]
  );
  const readCount = useMemo(
    () => messages.filter((m) => m.isRead).length,
    [messages]
  );

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/messages");
      if (res.status === 403) {
        router.push("/admin/login");
        return;
      }
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error("Failed to fetch messages", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch("/api/admin/status");
        const data = await res.json();
        if (!data.isAdmin) {
          router.push("/admin/login");
          return;
        }
        await fetchMessages();
      } catch {
        router.push("/admin/login");
      }
    };
    checkStatus();
  }, []);

  const markAsRead = async (id) => {
    try {
      await fetch(`/api/messages/${id}/read`, { method: "PATCH" });
      setMessages((prev) =>
        prev.map((msg) => (msg._id === id ? { ...msg, isRead: true } : msg))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm("Purge this inquiry permanently?")) return;
    try {
      const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
      if (res.ok)
        setMessages((prev) => prev.filter((msg) => msg._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-10 lg:px-20 py-6">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10 rounded-xl px-4 md:px-6 py-2 mb-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#8DFF69] rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(141,255,105,0.2)]">
              <Inbox className="text-black w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight uppercase">
                Portfolio Console
              </h1>
              <p className="text-sm text-[#8DFF69] uppercase tracking-wide font-semibold">
                Admin Access
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:text-red-500 transition text-sm font-bold uppercase tracking-wide"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </nav>

      <main>
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard label="Total Inquiries" value={messages.length} icon={Mail} />
          <StatCard
            label="Unread"
            value={unreadCount}
            icon={Clock}
            highlight={unreadCount > 0}
          />
          <StatCard label="Read" value={readCount} icon={CheckCircle2} />
        </div>

        {/* Messages Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-white/60">
            Communication Stream
          </h2>
          <button
            onClick={() => {
              setLoading(true);
              fetchMessages();
            }}
            className="text-white hover:text-[#8DFF69] transition-transform duration-300 hover:rotate-180"
          >
            <RefreshCw size={20} />
          </button>
        </div>

        {/* Messages List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-16 text-white/30 text-sm font-semibold uppercase animate-pulse">
              Syncing...
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl text-white/30 text-sm font-semibold uppercase">
              No inquiries recorded
            </div>
          ) : (
            messages.map((msg) => {
              const created = new Date(msg.createdAt);
              const time = created.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <div
                  key={msg._id}
                  className={`p-6 rounded-2xl border transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(141,255,105,0.4)] hover:border-[#8DFF69] cursor-pointer group ${
                    !msg.isRead
                      ? "bg-white/5 border-white/20"
                      : "bg-transparent border-white/10 opacity-70"
                  }`}
                >
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
                          <User
                            size={16}
                            className={
                              !msg.isRead ? "text-white" : "text-white/50"
                            }
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm flex items-center gap-2 transition-colors group-hover:text-[#8DFF69]">
                            {msg.name}{" "}
                            {!msg.isRead && (
                              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                            )}
                          </h4>
                          <p className="text-sm text-white/50 font-mono transition-colors group-hover:text-[#8DFF69]">
                            {msg.email}
                          </p>
                        </div>
                      </div>
                      <p className="text-white/80 leading-relaxed font-medium pl-12 transition-colors group-hover:text-[#8DFF69]">
                        &ldquo;{msg.message}&rdquo;
                      </p>
                    </div>

                    <div className="flex md:flex-col justify-between items-end gap-3 min-w-[140px]">
                      <span className="text-sm font-semibold text-white/50 transition-colors group-hover:text-[#8DFF69]">
                        {created.toLocaleDateString()} {time}
                      </span>
                      <div className="flex gap-2">
                        {!msg.isRead && (
                          <button
                            onClick={() => markAsRead(msg._id)}
                            className="p-2 bg-[#8DFF69] text-black rounded-xl hover:scale-105 transition shadow"
                            title="Mark as Read"
                          >
                            <Check size={16} />
                          </button>
                        )}
                        <button
                          onClick={() => deleteMessage(msg._id)}
                          className="p-2 bg-white/10 text-white/50 hover:bg-red-500/20 hover:text-red-500 rounded-xl transition"
                          title="Delete Permanently"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, highlight = false }) {
  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl relative overflow-hidden group hover:shadow-lg transition-all">
      <Icon
        className={`absolute -right-2 -top-2 w-16 h-16 opacity-10 ${
          highlight ? "text-white" : "text-white/30"
        }`}
      />
      <p className="text-white/50 text-sm font-semibold uppercase tracking-wide mb-1">
        {label}
      </p>
      <h3 className="text-2xl md:text-3xl font-bold text-white">{value}</h3>
    </div>
  );
}
