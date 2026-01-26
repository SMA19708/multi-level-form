"use client";

import { useRouter } from "next/navigation";

const MultiStepFormStartPage = () => {
  const router = useRouter();

  const handleStart = () => {
    router.push("/form/step1");
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-blue-700">
          Welcome to the Multi-Step Form
        </h1>
        <p className="mb-6 text-gray-600">
          Click the button below to start filling your information.
        </p>
    <button
          onClick={handleStart}
          style={{
            marginLeft: "auto",
            alignContent: "center",
            marginTop: "16px",
            padding: "12px 24px",
            backgroundColor: "#2563eb", 
            color: "#ffffff",           
            fontSize: "16px",
            fontWeight: "bold",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Start
        </button>
      </div>
    </main>
  );
};

export default MultiStepFormStartPage;
