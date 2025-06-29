import { expect, test } from "@playwright/test";

test.describe("TailwindTrainer - Validação de Documentação e Help", () => {
    test("Help page deve listar funcionalidades principais mencionadas no README", async ({
        page,
    }) => {
        await page.goto("/help");

        // Verificar se a página de help carregou
        await expect(page.locator("h1, h2").first()).toBeVisible();

        // Funcionalidades que devem estar mencionadas conforme README
        const expectedFeatures = [
            "Learn",
            "Challenges",
            "Quiz",
            "Practice",
            "TailwindCSS",
            "Progress",
        ];

        // Verificar se essas funcionalidades estão mencionadas
        for (const feature of expectedFeatures) {
            await expect(page.locator(`text=${feature}`).first()).toBeVisible({
                timeout: 5000,
            });
        }
    });

    test("Todas as rotas principais devem estar acessíveis", async ({
        page,
    }) => {
        const routes = [
            "/",
            "/learn",
            "/challenges",
            "/profile",
            "/leaderboard",
            "/help",
        ];

        for (const route of routes) {
            await page.goto(route);

            // Verificar se não há erro 404
            await expect(page.locator("text=404")).not.toBeVisible();
            await expect(page.locator("text=Not Found")).not.toBeVisible();

            // Verificar se há conteúdo na página
            await expect(page.locator("h1, h2").first()).toBeVisible();
        }
    });

    test("Grupos de aprendizado mencionados no README devem existir", async ({
        page,
    }) => {
        await page.goto("/learn");

        // Grupos mencionados no README
        const expectedGroups = ["Layout", "Typography", "Colors", "Spacing"];

        for (const group of expectedGroups) {
            await expect(page.locator(`text=${group}`).first()).toBeVisible();
        }
    });

    test("Challenges mencionados no README devem existir", async ({ page }) => {
        await page.goto("/challenges");

        // Challenges que devem existir conforme documentação
        const expectedChallenges = [
            "Free Practice",
            "Quick Practice",
            "Speed Round",
        ];

        for (const challenge of expectedChallenges) {
            await expect(
                page.locator(`text=${challenge}`).first()
            ).toBeVisible();
        }
    });

    test("Sistema de aprendizado progressivo deve funcionar", async ({
        page,
    }) => {
        // Testar um fluxo completo de aprendizado
        await page.goto("/learn/layout");

        // Verificar se há questões
        await expect(page.locator('input[type="text"]')).toBeVisible();

        // Tentar responder uma questão básica
        await page.fill('input[type="text"]', "flex");
        await page.click("text=Check Answer");

        // Verificar feedback
        await expect(page.locator("text=Correct, text=Incorrect")).toBeVisible({
            timeout: 5000,
        });
    });

    test("Sistema de gamificação deve ter elementos visíveis", async ({
        page,
    }) => {
        // Verificar se elementos de gamificação estão presentes
        await page.goto("/profile");

        // Elementos que indicam gamificação
        const gamificationElements = [
            "XP",
            "Level",
            "Progress",
            "Achievement",
            "Score",
        ];

        let foundElements = 0;
        for (const element of gamificationElements) {
            const locator = page.locator(`text=${element}`).first();
            if (await locator.isVisible().catch(() => false)) {
                foundElements++;
            }
        }

        // Pelo menos alguns elementos de gamificação devem estar presentes
        expect(foundElements).toBeGreaterThan(0);
    });

    test("Leaderboard deve mostrar sistema de ranking", async ({ page }) => {
        await page.goto("/leaderboard");

        // Verificar se elementos de ranking estão presentes
        const rankingElements = [
            "Leaderboard",
            "Ranking",
            "Top",
            "Score",
            "Position",
        ];

        let foundElements = 0;
        for (const element of rankingElements) {
            const locator = page.locator(`text=${element}`).first();
            if (await locator.isVisible().catch(() => false)) {
                foundElements++;
            }
        }

        expect(foundElements).toBeGreaterThan(0);
    });

    test("Responsividade mencionada no README deve funcionar", async ({
        page,
    }) => {
        // Testar desktop
        await page.setViewportSize({ width: 1280, height: 720 });
        await page.goto("/");
        await expect(page.locator("h1").first()).toBeVisible();

        // Testar tablet
        await page.setViewportSize({ width: 768, height: 1024 });
        await page.reload();
        await expect(page.locator("h1").first()).toBeVisible();

        // Testar mobile
        await page.setViewportSize({ width: 375, height: 667 });
        await page.reload();
        await expect(page.locator("h1").first()).toBeVisible();

        // Testar navegação mobile
        await page.goto("/challenges");
        await expect(page.locator("text=Free Practice").first()).toBeVisible();
    });

    test("Sistema de preview mencionado deve funcionar", async ({ page }) => {
        await page.goto("/challenges/free_practice");

        // Verificar se há botão de preview (se implementado)
        const previewButton = page.locator("text=Preview, text=Show Preview");

        if (
            await previewButton
                .first()
                .isVisible()
                .catch(() => false)
        ) {
            await previewButton.first().click();
            // Verificar se preview aparece
            await expect(
                page.locator('[data-testid="preview"], .preview')
            ).toBeVisible();
        }
    });

    test("Sistema de hints mencionado deve funcionar", async ({ page }) => {
        await page.goto("/challenges/free_practice");

        // Verificar se há sistema de hints
        const hintButton = page.locator("text=Hint, text=Show Hint");

        if (
            await hintButton
                .first()
                .isVisible()
                .catch(() => false)
        ) {
            await hintButton.first().click();
            // Verificar se hint aparece
            await expect(
                page.locator('[data-testid="hint"], .hint, text=Think')
            ).toBeVisible();
        }
    });
});
