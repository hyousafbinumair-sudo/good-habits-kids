import { useState } from "react";
import { useProgress } from "@/components/SiteChrome";
import { setProfile, resetProgress } from "@/lib/progress";
import { celebrate } from "@/lib/celebrate";
import { SEO } from "@/components/SEO";

const AVATARS = ["🦸", "🦹", "🧑‍🚀", "🧑‍🔬", "🧚", "🧙", "🦊", "🐼", "🐯", "🐱", "🐶", "🦄", "🐸", "🦉"];

export default function ProfilePage() {
  const p = useProgress();
  const [name, setName] = useState(p.name);
  const [avatar, setAvatar] = useState(p.avatar);

  function save() {
    setProfile(name.trim(), avatar);
    celebrate();
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
      <SEO title="Your profile — Super Kids Learn" description="Pick your name and avatar. Your progress is saved on this device." />
      <h1 className="font-display text-4xl">👤 Your profile</h1>
      <p className="text-muted-foreground mt-1">All saved on this device — no accounts.</p>

      <div className="kid-card border-4 border-sky bg-card mt-6">
        <label className="font-bold block mb-2">Your name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={20}
          className="w-full rounded-2xl border-4 border-border bg-background px-4 py-3 text-lg focus:outline-none focus:border-coral"
          placeholder="Super Kid"
        />

        <label className="font-bold block mt-5 mb-2">Pick an avatar</label>
        <div className="grid grid-cols-7 gap-2">
          {AVATARS.map((a) => (
            <button
              key={a}
              onClick={() => setAvatar(a)}
              className={`text-3xl rounded-2xl py-3 border-4 transition-transform hover:scale-110 ${
                avatar === a ? "border-coral bg-sun" : "border-border bg-card"
              }`}
            >
              {a}
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button onClick={save} className="kid-btn bg-coral text-coral-foreground">💾 Save</button>
          <button
            onClick={() => {
              if (confirm("Reset all progress and start over?")) {
                resetProgress();
              }
            }}
            className="kid-btn bg-card border-2 border-border"
          >
            🔄 Reset progress
          </button>
        </div>
      </div>
    </div>
  );
}
