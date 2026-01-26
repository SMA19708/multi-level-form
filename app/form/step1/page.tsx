"use client";
import { writeTempFile } from "@/app/components/utilis/fileManager";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

type FormDataType = 
{
  name: string;
  email: string;
  username: string;
};

type ErrorType = Partial<FormDataType>;

const Step1 = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<FormDataType>(
  {
    name: "",
    email: "",
    username: "",
  });

  const [errors, setErrors] = useState<ErrorType>({});
  const [successMsg, setSuccessMsg] = useState("");

  // Input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => 
      (
    {
      ...prev,
      [name]: value,
    }
  ));
  };

  // Form validation
  const validateForm = (): boolean => 
  {
    const tempErrors: ErrorType = {};

    // Name validation
    if (!formData.name.trim()) 
    {
      tempErrors.name = "Name is required";
    } 
    else if (!/^[A-Za-z\s]{3,}$/.test(formData.name)) 
    {
      tempErrors.name = "Name must contain only letters (min 3 characters)";
    }

    // Email validation
    if (!formData.email.trim()) 
    {
      tempErrors.email = "Email is required";
    } 
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) 
    {
      tempErrors.email = "Invalid email format";
    }

    // Username validation
    if (!formData.username.trim()) 
    {
      tempErrors.username = "Username is required";
    } 
    else if (!/^[A-Za-z\s]{6,}$/.test(formData.username)) 
    {
      tempErrors.username =
        "Username must contain only letters (min 6 characters)";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => 
  {
    e.preventDefault();
    setSuccessMsg("");

    if (!validateForm()) return;

    console.log("Step 1 Data:", formData);

    setSuccessMsg("Validation successful! Redirecting...");

    // Write to temp storage
    const tempKey = writeTempFile(formData);

    // Save the key for later steps
    sessionStorage.setItem("tempFileKey", tempKey);

    // Navigate to Step 2
    router.push("/form/step2");
  };

  return (
    <main className="centered-container">
      <div className="form-wrapper">
        <h1 className="form-heading align-center">Validation Form</h1>

        <form className="form-card" onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <p className="error">{errors.username}</p>}

          <button type="submit">Next</button>

          {successMsg && <p className="success">{successMsg}</p>}
        </form>
      </div>
    </main>
  );
};

export default Step1;
