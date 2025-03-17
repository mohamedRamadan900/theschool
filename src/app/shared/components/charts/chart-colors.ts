// Color palette TypeScript object with extracted colors and complementary colors
const ChartColors = {
    // Original colors from the pie chart
    primary: '#00C1AE', // Teal/Turquoise (main segment)
    secondary: '#FF6B6B', // Coral/Salmon (bottom right segment)
    neutral: '#5A5A5A', // Dark Gray (top left segment)
    accent: '#FFA45C', // Light Orange/Peach (small segment)

    // Additional complementary colors
    primaryLight: '#61DACE', // Lighter teal
    primaryDark: '#0F8C73', // Darker teal
    secondaryLight: '#FF9B9B', // Lighter coral
    secondaryDark: '#E54B4B', // Darker coral
    neutralLight: '#858585', // Lighter gray
    neutralDark: '#333333', // Darker gray
    accentLight: '#FFBE85', // Lighter orange
    accentDark: '#E5873D', // Darker orange

    // Additional complementary colors for variety
    highlight: '#34C3FF', // Sky blue
    muted: '#8C8C8C', // Medium gray
    success: '#4CAF50', // Green
    warning: '#FFD54F', // Amber
    info: '#4FC3F7', // Light blue
    error: '#F44336', // Red

    // Background and text colors
    background: '#F5F5F6', // Light gray background
    backgroundAlt: '#FFFFFF', // White background
    text: '#333333', // Dark text
    textLight: '#767676' // Light text
};

export const ChartColorsArray = [ChartColors.primary, ChartColors.secondary, ChartColors.neutral, ChartColors.accent, ChartColors.primaryLight, ChartColors.secondaryLight, ChartColors.neutralLight, ChartColors.accentLight];
