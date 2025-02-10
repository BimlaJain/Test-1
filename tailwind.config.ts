import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
	  extend: {
		  container: {
			  screens: {
				  sm: "640px",
				  md: "768px",
				  lg: "1024px",
				  xl: "1140px",
				}
			},
		  fontFamily: {
				"poppins": "'Poppins', 'serif'",
			},
		  colors: {
			  "gray": "#656566",
			  "light-gray": "#D0D5DD",
			  "blue": "#007BFF",
			}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
