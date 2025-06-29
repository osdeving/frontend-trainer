import { expect, test } from "@playwright/test";

test.describe("TailwindTrainer - Jornadas do Usuário", () => {
    test.beforeEach(async ({ page }) => {
        // Ir para a página inicial
        await page.goto("/");
    });

    test("Jornada 1: Usuário pode navegar pela homepage e acessar seções principais", async ({
        page,
    }) => {
        // Verificar se a página principal carregou
        await expect(page.locator("h1")).toContainText("TailwindTrainer");

        // Verificar presença de elementos principais da homepage
        await expect(page.locator("text=Learn")).toBeVisible();
        await expect(page.locator("text=Challenges")).toBeVisible();
        await expect(page.locator("text=Profile")).toBeVisible();

        // Testar navegação para Learn
        await page.click("text=Learn");
        await expect(page).toHaveURL(/.*\/learn/);

        // Voltar para home
        await page.goto("/");

        // Testar navegação para Challenges
        await page.click("text=Challenges");
        await expect(page).toHaveURL(/.*\/challenges/);

        // Voltar para home
        await page.goto("/");

        // Testar navegação para Profile
        await page.click("text=Profile");
        await expect(page).toHaveURL(/.*\/profile/);
    });

    test("Jornada 2: Usuário pode acessar grupos de aprendizado", async ({
        page,
    }) => {
        // Navegar para Learn
        await page.goto("/learn");

        // Verificar se os grupos de aprendizado estão visíveis
        await expect(page.locator("text=Layout")).toBeVisible();
        await expect(page.locator("text=Typography")).toBeVisible();
        await expect(page.locator("text=Colors")).toBeVisible();
        await expect(page.locator("text=Spacing")).toBeVisible();

        // Clicar no grupo Layout
        await page.click("text=Layout");
        await expect(page).toHaveURL(/.*\/learn\/layout/);

        // Verificar se o quiz do Layout carregou
        await expect(page.locator("text=Layout")).toBeVisible();

        // Verificar se há questões disponíveis
        await expect(page.locator('input[type="text"]')).toBeVisible();
    });

    test("Jornada 3: Usuário pode completar um quiz básico", async ({
        page,
    }) => {
        // Ir para um grupo de aprendizado específico
        await page.goto("/learn/layout");

        // Esperar a página carregar
        await page.waitForSelector('input[type="text"]');

        // Verificar se há uma questão carregada
        const questionElement = page
            .locator('[data-testid="current-question"], .question, h3, h2')
            .first();
        await expect(questionElement).toBeVisible();

        // Tentar responder uma questão comum (flex)
        const inputField = page.locator('input[type="text"]');
        await inputField.fill("flex");

        // Clicar no botão de verificar resposta
        await page.click("text=Check Answer");

        // Verificar se algum feedback foi dado
        await expect(
            page.locator("text=Correct, text=Incorrect, text=Next Question")
        ).toBeVisible({ timeout: 5000 });
    });

    test("Jornada 4: Usuário pode acessar challenges", async ({ page }) => {
        // Navegar para Challenges
        await page.goto("/challenges");

        // Verificar se os challenges estão listados
        await expect(page.locator("text=Free Practice")).toBeVisible();
        await expect(page.locator("text=Quick Practice")).toBeVisible();
        await expect(page.locator("text=Speed Round")).toBeVisible();

        // Clicar em Free Practice
        await page.click("text=Free Practice");
        await expect(page).toHaveURL(/.*\/challenges\/free_practice/);

        // Verificar se o challenge carregou
        await expect(page.locator('input[type="text"]')).toBeVisible();
        await expect(page.locator("text=Free Practice")).toBeVisible();
    });

    test("Jornada 5: Challenge Free Practice funciona corretamente", async ({
        page,
    }) => {
        // Ir direto para o Free Practice challenge
        await page.goto("/challenges/free_practice");

        // Esperar carregar
        await page.waitForSelector('input[type="text"]');

        // Verificar elementos essenciais do challenge
        await expect(page.locator('input[type="text"]')).toBeVisible();
        await expect(page.locator("text=Check Answer")).toBeVisible();

        // Testar input - verificar se não avança automaticamente (bug anterior)
        const inputField = page.locator('input[type="text"]');
        await inputField.fill("flex");

        // Aguardar um pouco para ver se a questão muda sozinha (não deveria)
        await page.waitForTimeout(1000);

        // Verificar se o input ainda contém o texto digitado
        await expect(inputField).toHaveValue("flex");

        // Enviar resposta
        await page.click("text=Check Answer");

        // Verificar se aparece resultado
        await expect(
            page.locator("text=Correct, text=Incorrect, text=Next Question")
        ).toBeVisible({ timeout: 5000 });
    });

    test("Jornada 6: Navegação para páginas de ajuda", async ({ page }) => {
        // Ir para Help
        await page.goto("/help");

        // Verificar se a página de ajuda carregou
        await expect(page.locator("h1, h2").first()).toBeVisible();

        // Verificar se há conteúdo útil na página
        await expect(
            page.locator("text=TailwindCSS, text=learn, text=help, text=guide")
        ).toBeVisible();
    });

    test("Jornada 7: Verificar responsividade básica", async ({ page }) => {
        // Testar em viewport mobile
        await page.setViewportSize({ width: 375, height: 667 });

        await page.goto("/");

        // Verificar se elementos principais ainda estão visíveis
        await expect(page.locator("h1")).toBeVisible();

        // Testar navegação mobile
        await page.goto("/challenges");
        await expect(page.locator("text=Free Practice")).toBeVisible();

        // Voltar para desktop
        await page.setViewportSize({ width: 1280, height: 720 });
    });

    test("Jornada 8: Verificar leaderboard", async ({ page }) => {
        await page.goto("/leaderboard");

        // Verificar se a página carregou
        await expect(page.locator("h1, h2").first()).toBeVisible();

        // Verificar se há elementos de leaderboard
        await expect(
            page.locator("text=Leaderboard, text=Ranking, text=Score")
        ).toBeVisible();
    });
});
