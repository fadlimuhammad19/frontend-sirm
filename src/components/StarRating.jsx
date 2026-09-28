import { useState } from "react";
import { Star } from "lucide-react";

export default function StarRating({ value, onChange, readOnly = false }) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          disabled={readOnly}
          onMouseEnter={() => !readOnly && setHover(i)}
          onMouseLeave={() => !readOnly && setHover(0)}
          onClick={() => !readOnly && onChange(i)}
          className={readOnly ? "cursor-default" : "cursor-pointer"}
        >
          <Star
            size={readOnly ? 16 : 24}
            className={(hover || value) >= i ? "fill-amber-400 text-amber-400" : "text-slate-300"}
          />
        </button>
      ))}
    </div>
  );
}