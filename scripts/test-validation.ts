/**
 * Test script to demonstrate the new question validation system
 * Run with: npx ts-node scripts/test-validation.ts
 */

import { questionManager } from "../lib/questionManager";

console.log("🧪 Testing Question Validation System\n");

// Test 1: Get basic stats
console.log("📊 Question Database Stats:");
const stats = questionManager.getStats();
console.log(`Total Questions: ${stats.totalQuestions}`);
console.log(`By Category:`, stats.byCategory);
console.log(`By Difficulty:`, stats.byDifficulty);
console.log("");

// Test 2: Get questions by category
console.log("📐 Layout Questions:");
const layoutQuestions = questionManager.getQuestionsByCategory("layout");
layoutQuestions.forEach((q) => {
    console.log(`  - ${q.id}: ${q.css.replace(/\n/g, " ")}`);
});
console.log("");

// Test 3: Test validation with exact matches
console.log("✅ Testing Exact Matches:");
const testCases = [
    { questionId: "layout-001", answer: "flex", expected: true },
    { questionId: "layout-001", answer: "FLEX", expected: true }, // Case insensitive
    { questionId: "layout-001", answer: "flexbox", expected: false },
    { questionId: "layout-002", answer: "justify-center", expected: true },
    { questionId: "layout-004", answer: "grid grid-cols-3", expected: true },
    { questionId: "layout-004", answer: "grid-cols-3 grid", expected: true }, // Order doesn't matter
];

testCases.forEach((test) => {
    const result = questionManager.validateAnswer(test.questionId, test.answer);
    const status = result.isCorrect === test.expected ? "✅" : "❌";
    console.log(
        `  ${status} ${test.questionId}: "${test.answer}" -> ${result.isCorrect} (${result.method})`
    );
});
console.log("");

// Test 4: Test CSS equivalence
console.log("🎨 Testing CSS Equivalence:");
console.log("Testing Tailwind to CSS conversion:");

const tailwindExamples = [
    "flex justify-center items-center",
    "bg-blue-500 text-white p-4",
    "grid grid-cols-3 gap-4",
];

tailwindExamples.forEach((tw) => {
    const css = questionManager.tailwindToCSS(tw);
    console.log(`  "${tw}" ->`, css);
});
console.log("");

// Test 5: Get random questions for challenges
console.log("🎯 Random Questions for Challenge:");
const randomQuestions = questionManager.getRandomQuestions({
    count: 3,
    categories: ["layout", "typography"],
    difficulties: ["easy", "medium"],
});

randomQuestions.forEach((q) => {
    console.log(`  - ${q.id} (${q.difficulty}): ${q.css.replace(/\n/g, " ")}`);
    console.log(`    Answer: ${q.acceptedAnswers[0]}`);
});
console.log("");

console.log("🎉 All tests completed!");
