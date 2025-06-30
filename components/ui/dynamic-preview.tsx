import { ArrowLeftRight, Check, Eye, EyeOff, X } from "lucide-react";
import React, { useState } from "react";
import { Badge } from "./badge";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

interface DynamicPreviewProps {
    userAnswer: string;
    expectedAnswer: string;
    expectedCSS: string;
    className?: string;
}

interface PreviewStyle {
    [key: string]: string | number;
}

export const DynamicPreview: React.FC<DynamicPreviewProps> = ({
    userAnswer,
    expectedAnswer,
    expectedCSS,
    className = "",
}) => {
    const [showComparison, setShowComparison] = useState(false);
    const [previewVisible, setPreviewVisible] = useState(true);

    // Parse CSS string into React style object
    const parseCSS = (css: string): PreviewStyle => {
        const styles: PreviewStyle = {};
        const rules = css.split(";").filter((rule) => rule.trim());

        rules.forEach((rule) => {
            const [property, value] = rule.split(":").map((s) => s.trim());
            if (property && value) {
                const camelCaseProperty = property.replace(/-([a-z])/g, (g) =>
                    g[1].toUpperCase()
                );
                styles[camelCaseProperty] = value;
            }
        });

        return styles;
    };

    // Convert Tailwind classes to CSS for preview
    const tailwindToCSS = (tailwindClasses: string): PreviewStyle => {
        const classes = tailwindClasses.toLowerCase().trim().split(/\s+/);
        let styles: PreviewStyle = {};

        classes.forEach((cls) => {
            // Basic mappings - expandir conforme necessário
            const mappings: { [key: string]: PreviewStyle } = {
                // Display
                flex: { display: "flex" },
                block: { display: "block" },
                inline: { display: "inline" },
                "inline-block": { display: "inline-block" },
                "inline-flex": { display: "inline-flex" },
                hidden: { display: "none" },
                grid: { display: "grid" },

                // Flexbox Direction
                "flex-col": { flexDirection: "column" },
                "flex-row": { flexDirection: "row" },
                "flex-col-reverse": { flexDirection: "column-reverse" },
                "flex-row-reverse": { flexDirection: "row-reverse" },

                // Flexbox Wrap
                "flex-wrap": { flexWrap: "wrap" },
                "flex-nowrap": { flexWrap: "nowrap" },
                "flex-wrap-reverse": { flexWrap: "wrap-reverse" },

                // Align Items
                "items-start": { alignItems: "flex-start" },
                "items-end": { alignItems: "flex-end" },
                "items-center": { alignItems: "center" },
                "items-baseline": { alignItems: "baseline" },
                "items-stretch": { alignItems: "stretch" },

                // Justify Content
                "justify-start": { justifyContent: "flex-start" },
                "justify-end": { justifyContent: "flex-end" },
                "justify-center": { justifyContent: "center" },
                "justify-between": { justifyContent: "space-between" },
                "justify-around": { justifyContent: "space-around" },
                "justify-evenly": { justifyContent: "space-evenly" },

                // Grid
                "grid-cols-1": {
                    gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
                },
                "grid-cols-2": {
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                },
                "grid-cols-3": {
                    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                },
                "grid-cols-4": {
                    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                },
                "grid-cols-6": {
                    gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
                },
                "grid-cols-12": {
                    gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
                },

                // Position
                static: { position: "static" },
                fixed: { position: "fixed" },
                absolute: { position: "absolute" },
                relative: { position: "relative" },
                sticky: { position: "sticky" },

                // Position Values
                "top-0": { top: "0" },
                "right-0": { right: "0" },
                "bottom-0": { bottom: "0" },
                "left-0": { left: "0" },
                "top-2": { top: "8px" },
                "right-2": { right: "8px" },
                "bottom-2": { bottom: "8px" },
                "left-2": { left: "8px" },
                "top-4": { top: "16px" },
                "right-4": { right: "16px" },
                "bottom-4": { bottom: "16px" },
                "left-4": { left: "16px" },

                // Colors - Background
                "bg-transparent": { backgroundColor: "transparent" },
                "bg-white": { backgroundColor: "#ffffff" },
                "bg-black": { backgroundColor: "#000000" },
                "bg-red-100": { backgroundColor: "#fee2e2" },
                "bg-red-500": { backgroundColor: "#ef4444" },
                "bg-red-900": { backgroundColor: "#7f1d1d" },
                "bg-blue-100": { backgroundColor: "#dbeafe" },
                "bg-blue-500": { backgroundColor: "#3b82f6" },
                "bg-blue-900": { backgroundColor: "#1e3a8a" },
                "bg-green-100": { backgroundColor: "#dcfce7" },
                "bg-green-500": { backgroundColor: "#22c55e" },
                "bg-green-900": { backgroundColor: "#14532d" },
                "bg-yellow-100": { backgroundColor: "#fef3c7" },
                "bg-yellow-500": { backgroundColor: "#eab308" },
                "bg-yellow-900": { backgroundColor: "#713f12" },
                "bg-purple-100": { backgroundColor: "#f3e8ff" },
                "bg-purple-500": { backgroundColor: "#8b5cf6" },
                "bg-purple-900": { backgroundColor: "#581c87" },
                "bg-gray-100": { backgroundColor: "#f3f4f6" },
                "bg-gray-200": { backgroundColor: "#e5e7eb" },
                "bg-gray-300": { backgroundColor: "#d1d5db" },
                "bg-gray-500": { backgroundColor: "#6b7280" },
                "bg-gray-900": { backgroundColor: "#111827" },

                // Colors - Text
                "text-transparent": { color: "transparent" },
                "text-white": { color: "#ffffff" },
                "text-black": { color: "#000000" },
                "text-red-500": { color: "#ef4444" },
                "text-blue-500": { color: "#3b82f6" },
                "text-green-500": { color: "#22c55e" },
                "text-yellow-500": { color: "#eab308" },
                "text-purple-500": { color: "#8b5cf6" },
                "text-gray-400": { color: "#9ca3af" },
                "text-gray-500": { color: "#6b7280" },
                "text-gray-600": { color: "#4b5563" },
                "text-gray-900": { color: "#111827" },

                // Spacing - Padding
                "p-0": { padding: "0" },
                "p-1": { padding: "4px" },
                "p-2": { padding: "8px" },
                "p-3": { padding: "12px" },
                "p-4": { padding: "16px" },
                "p-6": { padding: "24px" },
                "p-8": { padding: "32px" },
                "px-2": { paddingLeft: "8px", paddingRight: "8px" },
                "px-4": { paddingLeft: "16px", paddingRight: "16px" },
                "py-2": { paddingTop: "8px", paddingBottom: "8px" },
                "py-4": { paddingTop: "16px", paddingBottom: "16px" },

                // Spacing - Margin
                "m-0": { margin: "0" },
                "m-1": { margin: "4px" },
                "m-2": { margin: "8px" },
                "m-3": { margin: "12px" },
                "m-4": { margin: "16px" },
                "m-6": { margin: "24px" },
                "m-8": { margin: "32px" },
                "mx-2": { marginLeft: "8px", marginRight: "8px" },
                "mx-4": { marginLeft: "16px", marginRight: "16px" },
                "mx-auto": { marginLeft: "auto", marginRight: "auto" },
                "my-2": { marginTop: "8px", marginBottom: "8px" },
                "my-4": { marginTop: "16px", marginBottom: "16px" },

                // Size - Width
                "w-auto": { width: "auto" },
                "w-full": { width: "100%" },
                "w-32": { width: "128px" },
                "w-48": { width: "192px" },
                "w-64": { width: "256px" },

                // Size - Height
                "h-auto": { height: "auto" },
                "h-full": { height: "100%" },
                "h-32": { height: "128px" },
                "h-48": { height: "192px" },
                "h-64": { height: "256px" },

                // Borders
                border: { border: "1px solid #e5e7eb" },
                "border-0": { border: "none" },
                "border-2": { border: "2px solid #e5e7eb" },
                "border-gray-300": { border: "1px solid #d1d5db" },
                "border-blue-500": { border: "1px solid #3b82f6" },

                // Border Radius
                "rounded-none": { borderRadius: "0" },
                rounded: { borderRadius: "4px" },
                "rounded-md": { borderRadius: "6px" },
                "rounded-lg": { borderRadius: "8px" },
                "rounded-xl": { borderRadius: "12px" },
                "rounded-full": { borderRadius: "9999px" },

                // Transform
                "scale-50": { transform: "scale(0.5)" },
                "scale-75": { transform: "scale(0.75)" },
                "scale-90": { transform: "scale(0.9)" },
                "scale-95": { transform: "scale(0.95)" },
                "scale-100": { transform: "scale(1)" },
                "scale-105": { transform: "scale(1.05)" },
                "scale-110": { transform: "scale(1.1)" },
                "scale-125": { transform: "scale(1.25)" },
                "scale-150": { transform: "scale(1.5)" },
                "rotate-45": { transform: "rotate(45deg)" },
                "rotate-90": { transform: "rotate(90deg)" },
                "rotate-180": { transform: "rotate(180deg)" },
                "-rotate-45": { transform: "rotate(-45deg)" },
                "-rotate-90": { transform: "rotate(-90deg)" },

                // Shadows
                shadow: {
                    boxShadow:
                        "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
                },
                "shadow-lg": {
                    boxShadow:
                        "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
                },
                "shadow-none": { boxShadow: "none" },

                // Opacity
                "opacity-0": { opacity: "0" },
                "opacity-25": { opacity: "0.25" },
                "opacity-50": { opacity: "0.5" },
                "opacity-75": { opacity: "0.75" },
                "opacity-100": { opacity: "1" },

                // Text Size
                "text-xs": { fontSize: "12px" },
                "text-sm": { fontSize: "14px" },
                "text-base": { fontSize: "16px" },
                "text-lg": { fontSize: "18px" },
                "text-xl": { fontSize: "20px" },
                "text-2xl": { fontSize: "24px" },

                // Font Weight
                "font-thin": { fontWeight: "100" },
                "font-light": { fontWeight: "300" },
                "font-normal": { fontWeight: "400" },
                "font-medium": { fontWeight: "500" },
                "font-semibold": { fontWeight: "600" },
                "font-bold": { fontWeight: "700" },
                "font-extrabold": { fontWeight: "800" },
                "font-black": { fontWeight: "900" },
            };

            if (mappings[cls]) {
                styles = { ...styles, ...mappings[cls] };
            }
        });

        return styles;
    };

    const baseStyle: PreviewStyle = {
        width: "120px",
        height: "80px",
        backgroundColor: "#f3f4f6",
        border: "2px solid #e5e7eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "12px",
        color: "#374151",
        borderRadius: "6px",
        transition: "all 0.2s ease",
    };

    const expectedStyle = { ...baseStyle, ...parseCSS(expectedCSS) };
    const userStyle = userAnswer.trim()
        ? { ...baseStyle, ...tailwindToCSS(userAnswer) }
        : baseStyle;

    const isMatch =
        userAnswer.toLowerCase().trim() === expectedAnswer.toLowerCase().trim();

    return (
        <div className={`space-y-4 ${className}`}>
            {/* Controls */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPreviewVisible(!previewVisible)}
                        className="gap-2"
                    >
                        {previewVisible ? (
                            <EyeOff className="w-4 h-4" />
                        ) : (
                            <Eye className="w-4 h-4" />
                        )}
                        {previewVisible ? "Hide" : "Show"} Preview
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowComparison(!showComparison)}
                        className="gap-2"
                        disabled={!userAnswer.trim()}
                    >
                        <ArrowLeftRight className="w-4 h-4" />
                        Compare
                    </Button>
                </div>
                {userAnswer.trim() && (
                    <Badge
                        variant={isMatch ? "default" : "secondary"}
                        className={`gap-1 ${
                            isMatch ? "bg-green-500 text-white" : ""
                        }`}
                    >
                        {isMatch ? (
                            <Check className="w-3 h-3" />
                        ) : (
                            <X className="w-3 h-3" />
                        )}
                        {isMatch ? "Match!" : "Different"}
                    </Badge>
                )}
            </div>

            {/* Preview Area */}
            {previewVisible && (
                <div className="grid gap-4">
                    {showComparison ? (
                        // Comparison Mode
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm text-muted-foreground">
                                        Your Result
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex items-center justify-center p-4">
                                    <div style={userStyle} className="relative">
                                        <span className="text-xs">Preview</span>
                                        {userAnswer.trim() && (
                                            <div className="absolute -bottom-6 left-0 right-0 text-xs text-center text-muted-foreground">
                                                {userAnswer}
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm text-muted-foreground">
                                        Expected Result
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex items-center justify-center p-4">
                                    <div
                                        style={expectedStyle}
                                        className="relative"
                                    >
                                        <span className="text-xs">Target</span>
                                        <div className="absolute -bottom-6 left-0 right-0 text-xs text-center text-muted-foreground">
                                            {expectedAnswer}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    ) : (
                        // Single Preview Mode
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm text-muted-foreground">
                                    Live Preview
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex items-center justify-center p-6">
                                <div
                                    style={
                                        userAnswer.trim()
                                            ? userStyle
                                            : expectedStyle
                                    }
                                    className="relative"
                                >
                                    <span className="text-xs">
                                        {userAnswer.trim()
                                            ? "Your Style"
                                            : "Target Style"}
                                    </span>
                                    <div className="absolute -bottom-6 left-0 right-0 text-xs text-center text-muted-foreground">
                                        {userAnswer.trim() || expectedAnswer}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* CSS Output */}
                    {userAnswer.trim() && (
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm text-muted-foreground">
                                    Generated CSS
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-3">
                                <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                                    {Object.entries(tailwindToCSS(userAnswer))
                                        .map(
                                            ([prop, value]) =>
                                                `${prop
                                                    .replace(/([A-Z])/g, "-$1")
                                                    .toLowerCase()}: ${value};`
                                        )
                                        .join("\n")}
                                </pre>
                            </CardContent>
                        </Card>
                    )}
                </div>
            )}
        </div>
    );
};

export default DynamicPreview;
