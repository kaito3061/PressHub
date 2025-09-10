"use client";
import { useEffect, useState } from "react";

interface PressRelease {
  id: number;
  title: string;
}
export default function Home() {
  const [pressReleases, setPressReleases] = useState<PressRelease[]>([]);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/press_releases`)
      .then((res) => res.json())
      .then((data) => setPressReleases(data))
      .catch((err) => console.error("API fetch error:", err));
  }, []);
  return (
    <>
      <h1>PressHub</h1>
      <div>
        {pressReleases.map((pressRelease) => (
          <div key={pressRelease.id}>{pressRelease.title}</div>
        ))}
      </div>
    </>
  );
}
