export function convertToRgba(color: string, alpha: number = 1): string {
    if (color.startsWith('rgba')) {
        return color;
    } else if (color.startsWith('rgb')) {
        return color.replace('rgb', 'rgba').replace(')', `, ${alpha})`);
    } else if (color.startsWith('#')) {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        color = color.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
        if (result) {
            const r = parseInt(result[1], 16);
            const g = parseInt(result[2], 16);
            const b = parseInt(result[3], 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }
    }
    return color;
}
