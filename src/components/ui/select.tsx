{/* Branch Selection */}
<LabelInputContainer className="mb-4">
  <Label htmlFor="branch" className="text-[#F5F3F7]">
    Branch *
  </Label>
  <div className="relative">
    <select
      id="branch"
      name="branch"
      className={cn(
        "w-full bg-[#422670] border border-[#8E74B7]/30 rounded-md py-2 px-3",
        "text-[#F5F3F7] placeholder:text-[#8E74B7]/60 focus:outline-none",
        "focus:ring-2 focus:ring-[#8E74B7] focus:border-transparent",
        "appearance-none"
      )}
      disabled={loading}
    >
      <option value="">Select your branch</option>
      {branches.map((branch) => (
        <option 
          key={branch} 
          value={branch}
          className="bg-[#422670] hover:bg-[#2D174D]"
        >
          {branch}
        </option>
      ))}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#8E74B7]">
      <svg
        className="h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  </div>
  {errors.branch && <span className="text-red-400 text-sm">{errors.branch}</span>}
</LabelInputContainer>