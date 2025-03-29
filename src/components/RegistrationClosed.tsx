"use client";
import React from "react";
import { cn } from "@/lib/utils";

export function RegistrationClosed() {
  return (
    <div className="shadow-input mx-auto mt-10 mb-10 w-full max-w-md rounded-none p-4 md:rounded-2xl md:p-8 relative overflow-hidden">
      {/* Neon Border */}
      <div className="animate-neon"></div>

      {/* Main Content */}
      <div className="relative z-20 bg-[#211039] rounded-[inherit] p-4 md:p-8">
        <h2 className="text-xl text-center font-bold text-[#ffffff]">Member Registration</h2>
        
        <div className="my-8 text-center">
          <div className="mb-6 text-3xl"></div>
          <h3 className="text-3xl font-semibold text-[#F5F3F7] mb-4">
            Registration Closed
          </h3>
          <p className="text-[#F5F3F7]/80 text-sm mb-6">
            Thank you for your interest! The registration period has ended.
          </p>
          <div className="border-t border-[#8E74B7]/30 pt-6">
            <p className="text-[#F5F3F7]/80 text-sm">
              For any queries, contact:
              <br />
              <br />
              <span className="font-medium text-[#F5F3F7] mt-1 inline-block">
                Avadhut Mali - 9579047160
              </span>
              <br />
              <span className="font-medium text-[#F5F3F7] mt-1 inline-block">
                Aditi Mittal - 9405214986
              </span>
              <br />
              <span className="font-medium text-[#F5F3F7] mt-1 inline-block">
                Tanish Bhongade - 9370700387
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}