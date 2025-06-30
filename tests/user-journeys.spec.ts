import { expect, test } from "@playwright/test";

test.describe("TailwindTrainer - Smoke Tests", () => {
    test.beforeEach(async ({ page }) => {
        // Ir para a página inicial
        await page.goto("/");
    });

    test("Homepage carrega corretamente", async ({ page }) => {
        // Verificar se a página principal carregou
        await expect(page.locator("h1")).toContainText("TailwindTrainer");
        
        // Verificar elementos essenciais da homepage (textos que realmente existem)
        await expect(page.locator("text=Learning Path")).toBeVisible();
        await expect(page.getByRole('button', { name: 'Enter Challenges' })).toBeVisible();
        await expect(page.locator("text=Layout & Positioning")).toBeVisible();
    });

    test("Navegação básica funciona", async ({ page }) => {
        // Testar link para Challenges
        await page.click('a[href="/challenges"]');
        await expect(page).toHaveURL(/.*\/challenges/);
        
        // Verificar se a página de challenges carregou (título real)
        await expect(page.locator("h1")).toContainText("Challenges & Practice");

        // Voltar para home via navegação
        await page.click('a[href="/"]');
        await expect(page).toHaveURL(/^[^?]*\/$/); // Homepage
    });

    test("Grupos de aprendizado são visíveis na homepage", async ({ page }) => {
        // Verificar se os grupos de aprendizado estão visíveis na homepage
        await expect(page.locator("text=Layout & Positioning")).toBeVisible();
        await expect(page.locator("text=Typography")).toBeVisible();
        await expect(page.locator("text=Colors & Backgrounds")).toBeVisible();
        await expect(page.locator("text=Spacing & Sizing")).toBeVisible();
    });

    test("Acesso a um grupo de aprendizado específico", async ({ page }) => {
        // Clicar em um grupo de aprendizado (Layout)
        await page.click('a[href="/learn/layout"]');
        await expect(page).toHaveURL(/.*\/learn\/layout/);
        
        // Verificar se a página do grupo carregou
        await expect(page.locator("h1")).toContainText("Layout & Positioning");
    });

    test("Página de challenges lista os desafios", async ({ page }) => {
        // Navegar para challenges
        await page.goto("/challenges");
        
        // Verificar se pelo menos alguns challenges estão visíveis
        await expect(page.locator("text=Free Practice")).toBeVisible();
        await expect(page.locator("text=Quick Practice")).toBeVisible();
    });

    test("Acesso a um challenge específico", async ({ page }) => {
        // Navegar para challenges
        await page.goto("/challenges");
        
        // Clicar em Free Practice
        await page.click('a[href="/challenges/free_practice"]');
        await expect(page).toHaveURL(/.*\/challenges\/free_practice/);
        
        // Verificar se a página do challenge carregou
        await expect(page.locator("h1")).toContainText("Free Practice");
    });

    test("Páginas básicas são acessíveis", async ({ page }) => {
        // Testar página Help (título real)
        await page.goto("/help");
        await expect(page.locator("h1")).toContainText("Central de Ajuda");
        
        // Testar página Profile
        await page.goto("/profile");
        await expect(page.locator("h1")).toContainText("Your Profile");
        
        // Testar página Leaderboard
        await page.goto("/leaderboard");
        await expect(page.locator("h1")).toContainText("Leaderboard");
    });

    test("Challenge Free Practice carrega questões", async ({ page }) => {
        // Ir direto para o Free Practice challenge
        await page.goto("/challenges/free_practice");

        // Verificar elementos essenciais do challenge
        await expect(page.locator('input[type="text"]')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Check Answer' })).toBeVisible();
        
        // Verificar se há título do challenge
        await expect(page.locator("h1")).toContainText("Free Practice");
    });

    test("Input de resposta funciona corretamente", async ({ page }) => {
        // Ir para um challenge
        await page.goto("/challenges/free_practice");

        // Aguardar campo de input aparecer
        await page.waitForSelector('input[type="text"]');

        // Testar input - verificar se não avança automaticamente (bug anterior)
        const inputField = page.locator('input[type="text"]');
        await inputField.fill("flex");

        // Aguardar um pouco para ver se a questão muda sozinha (não deveria)
        await page.waitForTimeout(1000);

        // Verificar se o input ainda contém o texto digitado
        await expect(inputField).toHaveValue("flex");
    });

    test("Responsividade básica funciona", async ({ page }) => {
        // Testar em viewport mobile
        await page.setViewportSize({ width: 375, height: 667 });

        await page.goto("/");

        // Verificar se elementos principais ainda estão visíveis
        await expect(page.locator("h1")).toBeVisible();
        await expect(page.locator("text=Learning Path")).toBeVisible();

        // Voltar para desktop
        await page.setViewportSize({ width: 1280, height: 720 });
    });
});
