"use client";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SortDropdown({ value, onChange }: Props) {
  return (
    <select
      className="select select-bordered select-sm bg-white"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="সাজান"
    >
      <option value="default">ডিফল্ট</option>
      <option value="price-asc">দাম: কম থেকে বেশি</option>
      <option value="price-desc">দাম: বেশি থেকে কম</option>
    </select>
  );
}