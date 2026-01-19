"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { appendTempFile } from "@/app/components/utilis/fileManager";

type FormDataType = {
  primarySubject: string;
  secondaryInterests: string[];
  learningGoal: string;
  learningStyle: string;
  weeklyCommitment: string;
  skillLevel: string;
  timezone: string;
};

type ErrorType = Partial<FormDataType>;

const Step2 = () => {
   const router = useRouter();
  
  const [formData, setFormData] = useState<FormDataType>({
    primarySubject: "",
    secondaryInterests: [],
    learningGoal: "",
    learningStyle: "",
    weeklyCommitment: "",
    skillLevel: "",
    timezone: "",
  });

  const [errors, setErrors] = useState<ErrorType>({});
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMultiSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const values = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({ ...prev, secondaryInterests: values }));
  };

  const validateForm = () => {
    const tempErrors: ErrorType = {};

    if (!formData.primarySubject) tempErrors.primarySubject = "Required";
    if (!formData.learningGoal.trim()) tempErrors.learningGoal = "Required";
    if (!formData.learningStyle) tempErrors.learningStyle = "Select one";
    if (!formData.weeklyCommitment) tempErrors.weeklyCommitment = "Required";
    if (!formData.skillLevel) tempErrors.skillLevel = "Required";
    if (!formData.timezone) tempErrors.timezone = "Required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
  e.preventDefault();  setSuccessMsg("");

  // Validate form
  if (!validateForm()) return;

  console.log("Step 2 Data:", formData);

  // Append Step 2 data to temporary storage
  const tempKey = sessionStorage.getItem("tempFileKey");
  if (tempKey) {
    appendTempFile(tempKey, formData);
  }

  // Show success message
  setSuccessMsg("Preferences saved successfully!");

  // Navigate to Step 3
  router.push("/form/step3");
};

  return (
    <main className="centered-container">
      <div className="form-wrapper">
        <h1 className="form-heading">Learning Preferences</h1>
<form
  onSubmit={handleSubmit}
  style={{
    width: "100%",
    maxWidth: "500px",
    padding: "24px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(30, 58, 138, 0.15)",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  }}
>
  {/* Primary Subject */}
  <div style={{ display: "flex", flexDirection: "column" }}>
    <label style={{ fontWeight: 600, marginBottom: "6px", color: "#1e3a8a" }}>
      Primary Subject
    </label>
    <select
      name="primarySubject"
      onChange={handleChange}
      style={{
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid #93c5fd",
        fontSize: "14px",
        backgroundColor: "#ffffff",
      }}
    >
      <option value="">Select subject</option>
      <option>Web Development</option>
      <option>AI / ML</option>
      <option>Data Science</option>
    </select>
    {errors.primarySubject && (
      <p style={{ color: "#dc2626", fontSize: "13px", marginTop: "4px" }}>
        {errors.primarySubject}
      </p>
    )}
  </div>

  {/* Secondary Interests */}
  <div style={{ display: "flex", flexDirection: "column" }}>
    <label style={{ fontWeight: 600, marginBottom: "6px", color: "#1e3a8a" }}>
      Secondary Interests
    </label>
    <select
      multiple
      onChange={handleMultiSelect}
      style={{
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid #93c5fd",
        fontSize: "14px",
        backgroundColor: "#ffffff",
        height: "110px",
      }}
    >
      <option>UI/UX</option>
      <option>Cloud</option>
      <option>Cyber Security</option>
      <option>Mobile Apps</option>
    </select>
    <small style={{ fontSize: "12px", color: "#475569", marginTop: "4px" }}>
      Hold Ctrl / Cmd to select multiple
    </small>
  </div>

  {/* Learning Goal */}
  <div style={{ display: "flex", flexDirection: "column" }}>
    <label style={{ fontWeight: 600, marginBottom: "6px", color: "#1e3a8a" }}>
      Learning Goal
    </label>
    <input
      name="learningGoal"
      value={formData.learningGoal}
      onChange={handleChange}
      placeholder="e.g. Become a full-stack developer"
      style={{
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid #93c5fd",
        fontSize: "14px",
        backgroundColor: "#ffffff",
      }}
    />
    {errors.learningGoal && (
      <p style={{ color: "#dc2626", fontSize: "13px", marginTop: "4px" }}>
        {errors.learningGoal}
      </p>
    )}
  </div>

  {/* Learning Style */}
  <div style={{ display: "flex", flexDirection: "column" }}>
    <label style={{ fontWeight: 600, marginBottom: "6px", color: "#1e3a8a" }}>
      Learning Style
    </label>
    <div style={{ display: "flex", gap: "12px" }}>
      {["video", "text", "mixed"].map((style) => (
        <label
          key={style}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #bfdbfe",
            backgroundColor: "#eff6ff",
            cursor: "pointer",
          }}
        >
          <input
            type="radio"
            name="learningStyle"
            value={style}
            onChange={handleChange}
            style={{ accentColor: "#2563eb", cursor: "pointer" }}
          />
          <span style={{ textTransform: "capitalize" }}>{style}</span>
        </label>
      ))}
    </div>
    {errors.learningStyle && (
      <p style={{ color: "#dc2626", fontSize: "13px", marginTop: "4px" }}>
        {errors.learningStyle}
      </p>
    )}
  </div>

  {/* Weekly Commitment */}
  <div style={{ display: "flex", flexDirection: "column" }}>
    <label style={{ fontWeight: 600, marginBottom: "6px", color: "#1e3a8a" }}>
      Weekly Commitment
    </label>
    <select
      name="weeklyCommitment"
      onChange={handleChange}
      style={{
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid #93c5fd",
        fontSize: "14px",
        backgroundColor: "#ffffff",
      }}
    >
      <option value="">Select hours</option>
      <option>1–3 hours</option>
      <option>4–6 hours</option>
      <option>7+ hours</option>
    </select>
  </div>

  {/* Skill Level */}
  <div style={{ display: "flex", flexDirection: "column" }}>
    <label style={{ fontWeight: 600, marginBottom: "6px", color: "#1e3a8a" }}>
      Skill Level
    </label>
    <div style={{ display: "flex", gap: "12px" }}>
      {["Beginner", "Intermediate", "Advanced"].map((level) => (
        <label
          key={level}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #bfdbfe",
            backgroundColor: "#eff6ff",
            cursor: "pointer",
          }}
        >
          <input
            type="radio"
            name="skillLevel"
            value={level}
            onChange={handleChange}
            style={{ accentColor: "#2563eb", cursor: "pointer" }}
          />
          <span>{level}</span>
        </label>
      ))}
    </div>
  </div>

  {/* Timezone */}
  <div style={{ display: "flex", flexDirection: "column" }}>
    <label style={{ fontWeight: 600, marginBottom: "6px", color: "#1e3a8a" }}>
      Timezone
    </label>
    <select
      name="timezone"
      onChange={handleChange}
      style={{
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid #93c5fd",
        fontSize: "14px",
        backgroundColor: "#ffffff",
      }}
    >
      <option value="">Select timezone</option>
      <option>GMT +5 (Pakistan)</option>
      <option>GMT</option>
      <option>GMT -5</option>
    </select>
  </div>

  <button
    type="submit"
    style={{
      padding: "12px",
      marginTop: "12px",
      backgroundColor: "#2563eb",
      color: "#ffffff",
      fontSize: "16px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
    }}
  >
    Continue
  </button>

  {successMsg && (
    <p style={{ color: "#1d4ed8", fontWeight: "bold", marginTop: "8px" }}>
      {successMsg}
    </p>
  )}
</form>

      </div>
    </main>
  );
};

export default Step2;
