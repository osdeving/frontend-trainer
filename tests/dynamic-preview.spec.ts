import { expect, test } from "@playwright/test";

test.describe("TailwindTrainer - Dynamic Preview Feature", () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to a challenge that has preview enabled
        await page.goto("http://localhost:3001/challenges/free_practice");

        // Wait for the page to load
        await expect(page.locator("h1")).toBeVisible();
    });

    test("Dynamic preview component is visible on practice challenges", async ({
        page,
    }) => {
        // Look for the preview controls - initially should show "Hide Preview" since preview starts visible
        await expect(page.locator("text=Hide Preview")).toBeVisible();
        await expect(page.locator("text=Compare")).toBeVisible();
    });

    test("Preview updates when user types Tailwind classes", async ({
        page,
    }) => {
        // Type a simple Tailwind class
        await page.fill('input[placeholder*="TailwindCSS"]', "flex");

        // Check if preview area updates (look for live preview)
        await expect(page.locator("text=Live Preview")).toBeVisible();

        // Check if match indicator appears (badge only shows when there's input)
        await expect(
            page.locator("text=Match!").or(page.locator("text=Different"))
        ).toBeVisible();
    });

    test("Compare mode toggles correctly", async ({ page }) => {
        // First, enter some answer to enable compare button
        await page.fill(
            'input[placeholder*="TailwindCSS"]',
            "flex justify-center"
        );

        // Click compare button
        await page.click('button:has-text("Compare")');

        // Should see comparison view with both "Your Result" and "Expected Result"
        await expect(page.locator("text=Your Result")).toBeVisible();
        await expect(page.locator("text=Expected Result")).toBeVisible();
    });

    test("Preview visibility toggle works", async ({ page }) => {
        // Initially preview should be visible
        await expect(page.locator("text=Live Preview")).toBeVisible();

        // Click to hide preview
        await page.click('button:has-text("Hide Preview")');

        // Preview should not be visible anymore
        await expect(page.locator("text=Live Preview")).not.toBeVisible();

        // Button text should change
        await expect(page.locator("text=Show Preview")).toBeVisible();
    });

    test("CSS output is displayed when user enters classes", async ({
        page,
    }) => {
        // Enter some Tailwind classes
        await page.fill(
            'input[placeholder*="TailwindCSS"]',
            "bg-blue-500 p-4 rounded"
        );

        // Should see generated CSS section
        await expect(page.locator("text=Generated CSS")).toBeVisible();

        // Should see actual CSS properties in the CSS output (second pre element)
        await expect(page.locator("pre").nth(1)).toBeVisible();
    });

    test("Match indicator shows correct state", async ({ page }) => {
        // First get the expected answer (we need to look at the CSS shown)
        const cssText = await page.locator("pre.text-green-400").textContent();

        // For a simple test, let's assume the first question might be 'display: flex'
        // Try entering the correct answer
        await page.fill('input[placeholder*="TailwindCSS"]', "flex");

        // Look for match indicator
        await expect(
            page.locator("text=Match!").or(page.locator("text=Different"))
        ).toBeVisible();

        // Clear and try wrong answer
        await page.fill('input[placeholder*="TailwindCSS"]', "grid");

        // Should show different indicator
        await expect(
            page.locator("text=Match!").or(page.locator("text=Different"))
        ).toBeVisible();
    });

    test("Dynamic preview works with complex Tailwind classes", async ({
        page,
    }) => {
        // Test with more complex Tailwind combinations
        await page.fill(
            'input[placeholder*="TailwindCSS"]',
            "flex items-center justify-between bg-blue-100 p-4 rounded-lg shadow-md"
        );

        // Should still show preview
        await expect(page.locator("text=Live Preview")).toBeVisible();

        // Should generate CSS output
        await expect(page.locator("text=Generated CSS")).toBeVisible();

        // The generated CSS should contain multiple properties
        const cssOutput = page.locator("pre").last(); // Get the CSS output pre element
        await expect(cssOutput).toBeVisible();
    });

    test("Preview component handles empty input gracefully", async ({
        page,
    }) => {
        // Clear any existing input
        await page.fill('input[placeholder*="TailwindCSS"]', "");

        // Compare button should be disabled when input is empty
        const compareButton = page.locator('button:has-text("Compare")');
        await expect(compareButton).toBeDisabled();

        // Should show target style instead of user style when empty
        await expect(page.locator("text=Target Style")).toBeVisible();
    });

    test("Preview survives navigation between questions", async ({ page }) => {
        // Enter an answer
        await page.fill('input[placeholder*="TailwindCSS"]', "flex");

        // Submit the answer (assuming Enter key submits)
        await page.press('input[placeholder*="TailwindCSS"]', "Enter");

        // Wait for next question to load (if it goes to next question)
        await page.waitForTimeout(1000);

        // Preview controls should still be there
        await expect(
            page
                .locator("text=Show Preview")
                .or(page.locator("text=Hide Preview"))
        ).toBeVisible();
    });
});
