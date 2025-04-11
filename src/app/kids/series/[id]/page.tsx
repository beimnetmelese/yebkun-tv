"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SeriesPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  // Redirect to the movie player but keep the same ID
  useEffect(() => {
    if (id) {
      router.push(`/kids/movie/${id}`);
    }
  }, [id, router]);

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
    </div>
  );
}
