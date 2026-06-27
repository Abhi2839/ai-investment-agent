"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import Dashboard from "@/components/Dashboard";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  return (
    <>
      {!result && (
  <>
    <Hero />
    <SearchBar
      setLoading={setLoading}
      setResult={setResult}
    />
  </>
)}

{result && (
  <>
    <SearchBar
      setLoading={setLoading}
      setResult={setResult}
    />

    <Dashboard data={result} />
  </>
)}
    

      <Footer />
    </>
  );
}