const plugin = require("tailwindcss/plugin")
const colors = require("tailwindcss/colors")
const {spacing, borderWidth, fontFamily} = require("tailwindcss/defaultTheme")
const svgToDataUri = require("mini-svg-data-uri")

const forms = plugin.withOptions(function (options = {strategy: undefined}) {
    return function ({addBase, theme}) {
        const strategy = options.strategy === undefined ? ["base"] : [options.strategy]

        const svgStyles = {
            "border-color": theme("colors.gray.300", colors.gray[300]),
            "border-width": "1.2px",
            "background-color": `currentColor`,
            "background-size": `100% 100%`,
            "background-position": `center`,
            "background-repeat": `no-repeat`,
        }

        const rules = [
            {
                base: [`[type="checkbox"]`, `[type="ratio"]`],
                styles: {
                    appearance: "none",
                    padding: "0",
                    "print-color-adjust": "exact",
                    "vertical-align": "middle",
                    // "background-origin": "border-box",
                    "user-select": "none",
                    // "flex-shrink": "0",
                    height: spacing[4],
                    width: spacing[4],
                    color: theme("colors.indigo.400", colors.indigo[400]),
                    "background-color": "#fff",
                    "border-color": theme("colors.gray.400", colors.gray[400]),
                    "border-width": borderWidth["DEFAULT"],
                    "--tw-shadow": "0 0 #0000",
                },
            },
            {
                base: [`[type='checkbox']:focus`, `[type="ratio"]:focus`],
                styles: {
                    outline: "2px solid transparent",
                    "outline-offset": "2px",
                    "--tw-ring-inset": "var(--tw-empty,/*!*/ /*!*/)",
                    "--tw-ring-offset-width": "1px",
                    "--tw-ring-offset-color": "#fff",
                    "--tw-ring-color": theme("colors.indigo.300", colors.indigo[300]),
                    "--tw-ring-offset-shadow": `var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)`,
                    "--tw-ring-shadow": `var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color)`,
                    "box-shadow": `var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)`,
                },
            },
            {
                base: [`[type='checkbox']:checked`],
                styles: {
                    "background-image": `url("${svgToDataUri(
                        `<svg viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z"/></svg>`,
                    )}")`,
                    ...svgStyles,
                },
            },
            {
                base: [`[type='checkbox']:checked:focus`],
                styles: {
                    "border-color": theme("colors.gray.200", colors.gray[200]),
                    "background-color": "currentColor",
                },
            },
            {
                base: [`[type='checkbox']:indeterminate`],
                styles: {
                    "background-image": `url("${svgToDataUri(
                        `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h8"/></svg>`,
                    )}")`,
                    ...svgStyles,
                },
            },
            {
                base: [`[type='checkbox']:indeterminate:focus`],
                styles: {
                    "border-color": theme("colors.gray.200", colors.gray[200]),
                    "background-color": "currentColor",
                },
            },
        ]

        const getStrategyRules = (strategy) => rules
            .map((rule) => {
                if (rule[strategy] === null) return null

                return {[rule[strategy]]: rule.styles}
            })
            .filter(Boolean)

        if (strategy.includes("base")) {
            addBase(getStrategyRules("base"))
        }
    }
})

/** @type {import("tailwindcss").Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{jsx,tsx}",
    ],
    theme: {
        borderWidth: {
            DEFAULT: "1px",
            "0": "0",
            "1.25": "1.25px",
            "1.5": "1.5px",
            "2": "2px",
            "2.25": "2.25px",
            "3": "3px",
            "4": "4px",
            "6": "6px",
            "8": "8px",
        },
        extend: {
            maxWidth: {
                "2xs": "16rem",
                "3xs": "12rem",
                "4xs": "8rem",
            },
            spacing: {
                "1/10": "10%",
                "3/8": "37.5%",
                "9/10": "90%",
                "1/12": "8.3%",
                "11/12": "91.7%",
                "1/20": "5%",
                "1.25": "0.3125rem",
                "1.75": "0.4375rem",
            },
            animation: {
                "spin-slow": "spin 5s linear infinite",
            },
            fontFamily: {
                sans: ["Inter var", ...fontFamily.sans],
                system: fontFamily.sans,
            },
            zIndex: {
                "100": "100",
                "1000": "1000",
                "10000": "10000",
                "20000": "20000",
            },
            ringWidth: {
                "1.1": "1.1px",
                "1.25": "1.25px",
                "1.5": "1.5px",
            },
        },
    },
    plugins: [
        forms,
    ],
}
