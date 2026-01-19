"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { readTempFile, deleteTempFile } from "@/app/components/utilis/fileManager";

const DisplayData = () => {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const hasReadData = useRef(false);

  useEffect(() => {
    const loadData = () => {
      if (hasReadData.current) return;

      const tempKey = sessionStorage.getItem("tempFileKey");

      if (!tempKey) {
        alert("Temporary data missing. Redirecting to Step 1.");
        router.push("/form/step1");
        return;
      }

      const fileData = readTempFile(tempKey);

      if (!fileData) {
        alert("Temporary data missing. Redirecting to Step 1.");
        router.push("/form/step1");
        return;
      }

      setData(fileData);
      setLoading(false);
      hasReadData.current = true;
    };

    loadData();
  }, [router]);

  useEffect(() => {
    return () => {
      const tempKey = sessionStorage.getItem("tempFileKey");
      if (tempKey) {
        deleteTempFile(tempKey);
        sessionStorage.removeItem("tempFileKey");
      }
    };
  }, []);

  const renderValue = (value: any) => {
    if (typeof value === "object" && value !== null) {
      return <pre className="bg-gray-100 p-2 rounded text-sm">{JSON.stringify(value, null, 2)}</pre>;
    }
    return <span className="font-medium">{String(value)}</span>;
  };

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading data...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 rounded-lg shadow-lg border bg-white">
      <h1 className="text-2xl font-bold mb-4 text-center">Form Data Summary</h1>

      <div className="space-y-3">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex justify-between border-b pb-2">
            <span className="text-gray-600 font-semibold capitalize">{key.replace(/_/g, " ")}:</span>
            <div className="text-right">{renderValue(value)}</div>
          </div>
        ))}
      </div>

 <button
  onClick={() => router.push("/form")}
  style={{
    width: "100%",
    marginTop: "20px",
    padding: "14px",
    fontSize: "18px",
    backgroundColor: "#1d4ed8", // blue
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }}
>
  Go Home
</button>


    </div>
  );
};

export default DisplayData;
