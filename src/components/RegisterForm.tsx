"use client";
import React, { useState, useEffect } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { IconUpload } from "@tabler/icons-react";

type FormErrors = {
  fullName?: string;
  branch?: string;
  mobileNo?: string;
  email?: string;
  favoriteQuote?: string;
  whyJoinClub?: string;
  photo?: string;
  resume?: string;
  form?: string;
};

export function SignupFormDemo() {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    return () => {
      if (photoPreview) URL.revokeObjectURL(photoPreview);
    };
  }, [photoPreview]);

  const validateForm = () => {
    const newErrors: FormErrors = {};
    const form = document.forms.namedItem("registrationForm");

    // Full Name
    const fullName = form?.elements.namedItem("fullName") as HTMLInputElement;
    if (!fullName.value.trim()) newErrors.fullName = "Full name is required";

    // Branch
    const branch = form?.elements.namedItem("branch") as HTMLInputElement;
    if (!branch.value.trim()) newErrors.branch = "Branch is required";

    // Mobile Number
    const mobileNo = form?.elements.namedItem("mobileNo") as HTMLInputElement;
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileNo.value.trim()) {
      newErrors.mobileNo = "Mobile number is required";
    } else if (!mobileRegex.test(mobileNo.value)) {
      newErrors.mobileNo = "Invalid mobile number (10 digits required)";
    }

    // Email
    const email = form?.elements.namedItem("email") as HTMLInputElement;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email.value)) {
      newErrors.email = "Invalid email format";
    }

    // Favorite Quote
    const favoriteQuote = form?.elements.namedItem("favoriteQuote") as HTMLInputElement;
    if (!favoriteQuote.value.trim()) newErrors.favoriteQuote = "Favorite quote is required";

    // Why Join Club
    const whyJoinClub = form?.elements.namedItem("whyJoinClub") as HTMLInputElement;
    if (!whyJoinClub.value.trim()) {
      newErrors.whyJoinClub = "This field is required";
    } else if (whyJoinClub.value.length > 500) {
      newErrors.whyJoinClub = "Response should be less than 500 characters";
    }

    // Photo Validation
    if (!photoFile) newErrors.photo = "Profile photo is required";
    else if (!photoFile.type.startsWith("image/")) newErrors.photo = "Only image files allowed";
    else if (photoFile.size > 2 * 1024 * 1024) newErrors.photo = "Photo must be <2MB";

    // Resume Validation
    if (!resumeFile) newErrors.resume = "Resume is required";
    else if (resumeFile.type !== "application/pdf") newErrors.resume = "Only PDF allowed";
    else if (resumeFile.size > 5 * 1024 * 1024) newErrors.resume = "Resume must be <5MB";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors(prev => ({ ...prev, photo: "Invalid file type" }));
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, photo: "File too large (max 2MB)" }));
      return;
    }

    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
    setErrors(prev => ({ ...prev, photo: undefined }));
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setErrors(prev => ({ ...prev, resume: "Only PDF allowed" }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, resume: "File too large (max 5MB)" }));
      return;
    }

    setResumeFile(file);
    setErrors(prev => ({ ...prev, resume: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});
    
    try {
      const formData = new FormData(e.currentTarget);
      if (photoFile) formData.append("photo", photoFile);
      if (resumeFile) formData.append("resume", resumeFile);

      const response = await fetch("https://wlug-mb-2-backend.onrender.com/api/user/apply", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status} contact 9579047160`);

      // Reset form
      e.currentTarget.reset();
      setPhotoPreview(null);
      setPhotoFile(null);
      setResumeFile(null);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);

    } catch (err) {
      setErrors(prev => ({
        ...prev,
        form: err instanceof Error ? err.message : "Submission failed",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-[#211039] p-4 md:rounded-2xl md:p-8 border border-[#2D174D]">
      <h2 className="text-xl text-center font-bold text-[#ffffff]">Member Registration</h2>
      <p className="mt-2 text-center max-w-sm text-sm text-[#ffffff]/80">
        Join our community and help shape the future of open source
      </p>

      <form className="my-8" onSubmit={handleSubmit} id="registrationForm">
        {/* Full Name */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="fullName" className="text-[#F5F3F7]">
            Full Name *
          </Label>
          <Input
            id="fullName"
            name="fullName"
            placeholder="Avadhut Mali"
            type="text"
            className="bg-[#422670] border-[#8E74B7]/30 text-[#F5F3F7] placeholder:text-[#8E74B7]/60"
            disabled={loading}
          />
          {errors.fullName && <span className="text-red-400 text-sm">{errors.fullName}</span>}
        </LabelInputContainer>

        {/* Branch */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="branch" className="text-[#F5F3F7]">
            Branch *
          </Label>
          <Input
            id="branch"
            name="branch"
            placeholder="CSE, Mechanical, etc."
            type="text"
            className="bg-[#422670] border-[#8E74B7]/30 text-[#F5F3F7] placeholder:text-[#8E74B7]/60"
            disabled={loading}
          />
          {errors.branch && <span className="text-red-400 text-sm">{errors.branch}</span>}
        </LabelInputContainer>

        {/* Mobile Number */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="mobileNo" className="text-[#F5F3F7]">
            Mobile Number *
          </Label>
          <Input
            id="mobileNo"
            name="mobileNo"
            placeholder="9876543210"
            type="tel"
            pattern="[0-9]{10}"
            className="bg-[#422670] border-[#8E74B7]/30 text-[#F5F3F7] placeholder:text-[#8E74B7]/60"
            disabled={loading}
          />
          {errors.mobileNo && <span className="text-red-400 text-sm">{errors.mobileNo}</span>}
        </LabelInputContainer>

        {/* Email */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email" className="text-[#F5F3F7]">
            Email Address *
          </Label>
          <Input
            id="email"
            name="email"
            placeholder="wlug@gmail.com"
            type="email"
            className="bg-[#422670] border-[#8E74B7]/30 text-[#F5F3F7] placeholder:text-[#8E74B7]/60"
            disabled={loading}
          />
          {errors.email && <span className="text-red-400 text-sm">{errors.email}</span>}
        </LabelInputContainer>

        {/* Favorite Quote */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="favoriteQuote" className="text-[#F5F3F7]">
            Favorite Quote *
          </Label>
          <Input
            id="favoriteQuote"
            name="favoriteQuote"
            placeholder="Your favorite quote..."
            type="text"
            className="bg-[#422670] border-[#8E74B7]/30 text-[#F5F3F7] placeholder:text-[#8E74B7]/60"
            disabled={loading}
          />
          {errors.favoriteQuote && <span className="text-red-400 text-sm">{errors.favoriteQuote}</span>}
        </LabelInputContainer>

        {/* Why Join Club */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="whyJoinClub" className="text-[#F5F3F7]">
            Why do you want to join? *
          </Label>
          <Input
            id="whyJoinClub"
            name="whyJoinClub"
            placeholder="Your motivation..."
            className="bg-[#422670] border-[#8E74B7]/30 text-[#F5F3F7] placeholder:text-[#8E74B7]/60 h-32"
            disabled={loading}
          />
          {errors.whyJoinClub && <span className="text-red-400 text-sm">{errors.whyJoinClub}</span>}
        </LabelInputContainer>

        {/* Photo Upload */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="photo" className="text-[#F5F3F7]">
            Profile Photo *
          </Label>
          <div className="relative">
            <input
              type="file"
              id="photo"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
              disabled={loading}
            />
            <label
              htmlFor="photo"
              className={`flex items-center justify-center w-full p-2 bg-[#422670] border border-[#8E74B7]/30 rounded-md cursor-pointer hover:bg-[#422670]/80 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <IconUpload className="w-4 h-4 mr-2 text-[#8E74B7]" />
              <span className="text-[#F5F3F7]">
                {photoPreview ? "Change Photo" : "Select Photo"}
              </span>
            </label>
            {photoPreview && (
              <img
                src={photoPreview}
                alt="Preview"
                className="mt-2 w-20 h-20 rounded-full object-cover border border-[#8E74B7]/30"
              />
            )}
            {errors.photo && <span className="text-red-400 text-sm block mt-1">{errors.photo}</span>}
          </div>
        </LabelInputContainer>

        {/* Resume Upload */}
        <LabelInputContainer className="mb-6">
          <Label htmlFor="resume" className="text-[#F5F3F7]">
            Resume (PDF) *
          </Label>
          <div className="relative">
            <input
              type="file"
              id="resume"
              accept=".pdf"
              onChange={handleResumeChange}
              className="hidden"
              disabled={loading}
            />
            <label
              htmlFor="resume"
              className={`flex items-center justify-center w-full p-2 bg-[#422670] border border-[#8E74B7]/30 rounded-md cursor-pointer hover:bg-[#422670]/80 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <IconUpload className="w-4 h-4 mr-2 text-[#8E74B7]" />
              <span className="text-[#F5F3F7]">
                {resumeFile ? resumeFile.name : "Select PDF File"}
              </span>
            </label>
            {errors.resume && <span className="text-red-400 text-sm block mt-1">{errors.resume}</span>}
          </div>
        </LabelInputContainer>

        {errors.form && (
          <div className="mb-4 p-3 text-red-400 bg-[#422670]/50 rounded-md">
            {errors.form}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 text-green-400 bg-[#422670]/50 rounded-md">
            Registration successful! 🎉
          </div>
        )}

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-[#8E74B7] to-[#422670] font-medium text-[#F5F3F7] shadow-lg hover:from-[#8E74B7]/90 hover:to-[#422670]/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <span className="animate-pulse">Submitting...</span>
          ) : (
            "Submit Application"
          )}
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-[#8E74B7] to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-[#422670] to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};