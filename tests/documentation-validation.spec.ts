import { expect, test } from "@playwright/test";

test.describe("TailwindTrainer - Validação de Acessibilidade", () => {
    test("Todas as rotas principais estão acessíveis", async ({ page }) => {
        const routes = [
            "/",
            "/challenges", 
            "/help",
            "/profile",
            "/leaderboard"
        ];

        for (const route of routes) {
            await page.goto(route);

            // Verificar se não há erro 404
            await expect(page.locator("text=404")).not.toBeVisible();
            await expect(page.locator("text=Not Found")).not.toBeVisible();

            // Verificar se há conteúdo na página (h1 ou h2)
            await expect(page.locator("h1, h2").first()).toBeVisible();
        }
    });

    test("Grupos de aprendizado são acessíveis", async ({ page }) => {
        const learningGroups = ["layout", "typography", "colors", "spacing"];

        for (const group of learningGroups) {
            await page.goto(`/learn/${group}`);
            
            // Verificar se a página carregou sem erro
            await expect(page.locator("text=404")).not.toBeVisible();
            await expect(page.locator("h1, h2").first()).toBeVisible();
        }
    });

    test("Challenges principais são acessíveis", async ({ page }) => {
        const challenges = ["free_practice", "quick_practice", "speed_round"];

        for (const challenge of challenges) {
            await page.goto(`/challenges/${challenge}`);
            
            // Verificar se a página carregou sem erro
            await expect(page.locator("text=404")).not.toBeVisible();
            await expect(page.locator("h1, h2").first()).toBeVisible();
        }
    });

    test("Página Help contém informações básicas", async ({ page }) => {
        await page.goto("/help");

        // Verificar se há conteúdo de help (título real)
        await expect(page.locator("h1")).toContainText("Central de Ajuda");
        
        // Verificar se há pelo menos algum conteúdo
        await expect(page.locator("main")).toContainText("Tailwind");
    });

    test("Elementos interativos básicos funcionam", async ({ page }) => {
        await page.goto("/");
        
        // Verificar se links são clicáveis (seletor mais específico)
        const links = page.locator("a[href]");
        const linkCount = await links.count();
        
        expect(linkCount).toBeGreaterThan(0);
        
        // Testar se pelo menos um link funciona
        const firstLink = links.first();
        await expect(firstLink).toBeVisible();
    });
});
