/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        "primary-blue": "#145374",
        "dark-blue": "#00334E",
        "accent-orange": "#EE6F57",
        "text-primary": "#111827",
        "text-secondary": "#6B7280"
      },
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"]
      },
      animation: {
        fadeIn: "fadeIn 0.6s ease-in-out",
        fadeUp: "fadeUp 0.6s ease-in-out",
        "pulse-slow": "pulse 2s infinite"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      }
    }
  },
  plugins: []
}
