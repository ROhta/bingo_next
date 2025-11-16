// Mock for next/font/google and next/font/local
const mockFont = () => ({
	className: "",
	style: {},
})

// Export all possible fonts as the same mock function
export default mockFont
export const MedievalSharp = mockFont
export const Inter = mockFont
export const Roboto = mockFont
export const OpenSans = mockFont
export const Lato = mockFont
export const Montserrat = mockFont
export const Oswald = mockFont
export const SourceSansPro = mockFont
export const Raleway = mockFont
export const PTSans = mockFont

// Catch-all for any other font
const handler = {
	get: (target, prop) => {
		if (prop === "__esModule") return true
		if (prop === "default") return mockFont
		if (typeof prop === "string") return mockFont
		return undefined
	},
}

export const fonts = new Proxy({}, handler)
