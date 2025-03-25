"use client";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { IconUpload } from "@tabler/icons-react";

export function SignupFormDemo() {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPhotoPreview(previewUrl);
    }
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setResumeFile(file || null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-[#211039] p-4 md:rounded-2xl md:p-8 border border-[#2D174D]">
      <h2 className="text-xl text-center font-bold text-[#8E74B7]">
        Member Registration
      </h2>
      <p className="mt-2 text-center max-w-sm text-sm text-[#8E74B7]/80">
        Join our community and help shape the future of open source
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="firstname" className="text-[#F5F3F7]">
              First name
            </Label>
            <Input 
              id="firstname" 
              placeholder="Avadhut" 
              type="text" 
              className="bg-[#422670] border-[#8E74B7]/30 text-[#F5F3F7] placeholder:text-[#8E74B7]/60"
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname" className="text-[#F5F3F7]">
              Last name
            </Label>
            <Input 
              id="lastname" 
              placeholder="Mali" 
              type="text" 
              className="bg-[#422670] border-[#8E74B7]/30 text-[#F5F3F7] placeholder:text-[#8E74B7]/60"
            />
          </LabelInputContainer>
        </div>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email" className="text-[#F5F3F7]">
            Email Address
          </Label>
          <Input 
            id="email" 
            placeholder="wlug@gmail.com" 
            type="email" 
            className="bg-[#422670] border-[#8E74B7]/30 text-[#F5F3F7] placeholder:text-[#8E74B7]/60"
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="reasonToJoin" className="text-[#F5F3F7]">
            Why do you want to join?
          </Label>
          <Input 
            id="reasonToJoin" 
            placeholder="Your motivation..." 
            type="text" 
            className="bg-[#422670] border-[#8E74B7]/30 text-[#F5F3F7] placeholder:text-[#8E74B7]/60"
          />
        </LabelInputContainer>

        {/* Photo Upload Field */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="photo" className="text-[#F5F3F7]">
            Upload Profile Photo
          </Label>
          <div className="relative">
            <input
              type="file"
              id="photo"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
            <label
              htmlFor="photo"
              className="flex items-center justify-center w-full p-2 bg-[#422670] border border-[#8E74B7]/30 rounded-md cursor-pointer hover:bg-[#422670]/80 transition-colors"
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
          </div>
        </LabelInputContainer>

        {/* Resume Upload Field */}
        <LabelInputContainer className="mb-6">
          <Label htmlFor="resume" className="text-[#F5F3F7]">
            Upload Resume (PDF)
          </Label>
          <div className="relative">
            <input
              type="file"
              id="resume"
              accept=".pdf"
              onChange={handleResumeChange}
              className="hidden"
            />
            <label
              htmlFor="resume"
              className="flex items-center justify-center w-full p-2 bg-[#422670] border border-[#8E74B7]/30 rounded-md cursor-pointer hover:bg-[#422670]/80 transition-colors"
            >
              <IconUpload className="w-4 h-4 mr-2 text-[#8E74B7]" />
              <span className="text-[#F5F3F7]">
                {resumeFile ? resumeFile.name : "Select PDF File"}
              </span>
            </label>
          </div>
        </LabelInputContainer>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-[#8E74B7] to-[#422670] font-medium text-[#F5F3F7] shadow-lg hover:from-[#8E74B7]/90 hover:to-[#422670]/90 transition-all duration-300"
          type="submit"
        >
          Submit Application
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