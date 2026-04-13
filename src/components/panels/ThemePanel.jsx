import { useState, useRef, useEffect } from "react";
import ReactGPicker from "react-gcolor-picker";
import { useResume } from "../../context/ResumeContext.jsx";
import { THEMES } from "../../themes/themes.js";
import "./Panel.css";
import "./ThemePanel.css";

// Groups of 3 = one column (grid is 3 rows, column-flow)

const BG_PRESETS = [
  { color: "#ffffff", label: "White" },
  { color: "#fafaf8", label: "Off-white" },
  { color: "#fdf6ee", label: "Warm light" },
  { color: "#f4f6f9", label: "Cool light" },
  { color: "#f0f4fc", label: "Blue light" },
  { color: "#f2f8f4", label: "Green light" },
  { color: "#f5f2fc", label: "Purple light" },
  { color: "#fff0f3", label: "Rose light" },
  { color: "#fff4ec", label: "Peach light" },
  { color: "#e8eaed", label: "Gray light" },
  { color: "#fdf7ed", label: "Warm" },
  { color: "#eef1f7", label: "Cool" },
  { color: "#e5effd", label: "Blue" },
  { color: "#e3f5eb", label: "Green" },
  { color: "#f0ecfe", label: "Purple" },
  { color: "#fde8ea", label: "Rose" },
  { color: "#feefd8", label: "Peach" },
  { color: "#d9dfe7", label: "Gray" },
  { color: "#b0bcc9", label: "Steel" },
  { color: "#8896a8", label: "Slate" },
  { color: "#4a5568", label: "Dark slate" },
  { color: "#2d3748", label: "Charcoal" },
  { color: "#1e2329", label: "Dark" },
  { color: "#141b2f", label: "Navy" },
  { color: "#0f172a", label: "Deep navy" },
  { color: "#0a0f1e", label: "Midnight" },
  { color: "#1a1a2e", label: "Dark purple" },
  { color: "#12202e", label: "Dark teal" },
  { color: "#0d1b2a", label: "Deep ocean" },
  { color: "#060a10", label: "Near black" },
];

function GradientPicker({ value, onChange, size = 28, gradient = false }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const [cssInput, setCssInput] = useState("");
  const [cssInvalid, setCssInvalid] = useState(false);
  const btnRef = useRef(null);
  const popupRef = useRef(null);

  function handleOpen() {
    if (open) {
      setOpen(false);
      return;
    }
    const rect = btnRef.current.getBoundingClientRect();
    const popupW = 210,
      popupH = gradient ? 300 : 220;
    let left = rect.left;
    let top = rect.bottom + 6;
    if (left + popupW > window.innerWidth - 8)
      left = window.innerWidth - popupW - 8;
    if (top + popupH > window.innerHeight - 8) top = rect.top - popupH - 6;
    setPos({ top, left });
    setCssInput(value || "");
    setCssInvalid(false);
    setOpen(true);
  }

  useEffect(() => {
    if (!open) return;
    function onDown(e) {
      if (
        btnRef.current?.contains(e.target) ||
        popupRef.current?.contains(e.target)
      )
        return;
      setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  function applyCssInput(raw) {
    const v = raw.trim();
    if (!v) return;
    // Accept hex, rgb/rgba, hsl/hsla, named colors, gradients
    const valid =
      /^(#[0-9a-f]{3,8}|rgba?\(|hsla?\(|linear-gradient|radial-gradient|[a-z]+)/.test(
        v.toLowerCase()
      );
    if (valid) {
      onChange(v);
      setCssInvalid(false);
    } else setCssInvalid(true);
  }

  return (
    <>
      <button
        ref={btnRef}
        className="cp-swatch-btn"
        style={{ width: size, height: size, background: value || "#ffffff" }}
        onClick={handleOpen}
        title={gradient ? "Pick color or gradient" : "Pick color"}
      />
      {open && (
        <div
          ref={popupRef}
          className="cp-popup"
          style={{
            position: "fixed",
            top: pos.top,
            left: pos.left,
            zIndex: 9999,
          }}
        >
          <input
            className={`cp-css-input${
              cssInvalid ? " cp-css-input--invalid" : ""
            }`}
            value={cssInput}
            onChange={(e) => {
              setCssInput(e.target.value);
              setCssInvalid(false);
            }}
            onBlur={(e) => applyCssInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") applyCssInput(cssInput);
            }}
            placeholder={
              gradient ? "#hex or linear-gradient(…)" : "#hex or rgb(…)"
            }
            spellCheck={false}
          />
          <ReactGPicker
            value={value || "#ffffff"}
            format="hex"
            gradient={gradient}
            onChange={(v) => {
              onChange(v);
              setCssInput(v);
            }}
          />
        </div>
      )}
    </>
  );
}

// ── Accent palette — rows of colors, horizontally scrollable ─────────────────
// Each group of 3 = [bright, medium, dark] for one hue.
// Grid flows column-by-column (3 rows), so each column is one hue family.
const ACCENT_PALETTE = [
  "#a855f7",
  "#7c3aed",
  "#5b21b6", // Violet
  "#818cf8",
  "#4f46e5",
  "#3730a3", // Indigo
  "#60a5fa",
  "#2563eb",
  "#1e40af", // Blue
  "#38bdf8",
  "#0284c7",
  "#075985", // Sky
  "#22d3ee",
  "#0891b2",
  "#155e75", // Cyan
  "#2dd4bf",
  "#0d9488",
  "#115e59", // Teal
  "#4ade80",
  "#16a34a",
  "#166534", // Green
  "#86efac",
  "#5a7a4a",
  "#276749", // Olive green
  "#a3e635",
  "#65a30d",
  "#3f6212", // Lime
  "#fbbf24",
  "#d97706",
  "#b45309", // Amber
  "#fb923c",
  "#ea580c",
  "#9a3412", // Orange
  "#f87171",
  "#dc2626",
  "#991b1b", // Red
  "#fb7185",
  "#e11d48",
  "#881337", // Rose
  "#f472b6",
  "#db2777",
  "#9d174d", // Pink
  "#94a3b8",
  "#64748b",
  "#334155", // Slate
  "#9ca3af",
  "#4b5563",
  "#1f2937", // Charcoal
];

// ── ThemePanel ────────────────────────────────────────────────────────────────

export default function ThemePanel({ onClose, pinned = false }) {
  const { state, dispatch } = useResume();

  const chipTextColor = state.chipTextColor || "auto";
  const accentHex =
    state.customAccent || THEMES[state.theme]?.vars["--primary"] || "#5a7a4a";
  const bgValue = state.canvasBackground || "#ffffff";

  function pickAccent(hex) {
    dispatch({ type: "SET_CUSTOM_ACCENT", color: hex });
  }

  return (
    <div
      className={pinned ? "panel-sidebar" : "panel"}
      style={!pinned ? { minWidth: 280 } : {}}
    >
      <div className="panel-header">
        <span>Color Theme</span>
        {!pinned && (
          <button className="panel-close" onClick={onClose}>
            ×
          </button>
        )}
      </div>
      <div className="panel-body">
        {/* Accent Color */}
        <p className="panel-label">Accent Color</p>
        <div className="accent-scroll">
          {ACCENT_PALETTE.map((hex) => (
            <button
              key={hex}
              className={`accent-dot${accentHex === hex ? " active" : ""}`}
              style={{ background: hex }}
              title={hex}
              onClick={() => pickAccent(hex)}
            >
              {accentHex === hex && <span className="swatch-check">✓</span>}
            </button>
          ))}
        </div>
        <div className="accent-custom-row">
          <span className="accent-custom-label">Custom color</span>
          <GradientPicker
            value={accentHex}
            onChange={(color) => dispatch({ type: "SET_CUSTOM_ACCENT", color })}
            gradient
          />
        </div>

        {/* Background */}
        <p className="panel-label" style={{ marginTop: 16 }}>
          Background
        </p>
        <div className="accent-scroll">
          {BG_PRESETS.map(({ color, label }) => (
            <button
              key={color}
              className={`accent-dot${bgValue === color ? " active" : ""}`}
              style={{
                background: color,
                borderColor: color === "#ffffff" ? "#ccc" : undefined,
              }}
              title={label}
              onClick={() => {
                dispatch({ type: "SET_CANVAS_BG", color });
                dispatch({ type: "SET_CANVAS_BG_OPACITY", value: 100 });
              }}
            >
              {bgValue === color && (
                <span
                  className="swatch-check"
                  style={{ color: color < "#888888" ? "#fff" : "#333" }}
                >
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="accent-custom-row">
          <span className="accent-custom-label">Custom</span>
          <GradientPicker
            value={bgValue}
            onChange={(color) => dispatch({ type: "SET_CANVAS_BG", color })}
            gradient
          />
        </div>

        {/* Chip text */}
        <p className="panel-label" style={{ marginTop: 16 }}>
          Skill Chip Text
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            flexWrap: "wrap",
          }}
        >
          {[
            ["auto", "Auto"],
            ["#ffffff", "White"],
            ["#111111", "Dark"],
          ].map(([val, lbl]) => (
            <button
              key={val}
              onClick={() =>
                dispatch({ type: "SET_CHIP_TEXT_COLOR", color: val })
              }
              style={{
                padding: "4px 9px",
                borderRadius: 4,
                fontSize: "0.73rem",
                cursor: "pointer",
                border:
                  chipTextColor === val
                    ? "2px solid var(--primary)"
                    : "1.5px solid #ddd",
                background:
                  val === "#ffffff"
                    ? "#333"
                    : val === "#111111"
                    ? "#fff"
                    : "rgba(90,122,74,0.08)",
                color: val === "#ffffff" ? "#fff" : "#333",
              }}
            >
              {lbl}
            </button>
          ))}
          <div className="custom-swatch-wrap">
            <span className="custom-swatch-label">Custom</span>
            <GradientPicker
              value={chipTextColor === "auto" ? "#ffffff" : chipTextColor}
              onChange={(color) =>
                dispatch({ type: "SET_CHIP_TEXT_COLOR", color })
              }
              size={24}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
