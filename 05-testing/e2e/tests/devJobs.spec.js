//para ejecutar
//npx playwright test --headed

import { test, expect } from "@playwright/test";
import { assert } from "node:assert";
//por orden de importancia
// roles, aria,
// etiquetas de texto, placeholders, nombres,
//  data-testids,
// selectores css
test("buscar empleos y aplicar a una oferta", async ({ page }) => {
    await page.goto("http://localhost:5173");

    const searchInput = page.getByRole("searchbox");
    await searchInput.fill("react");

    await page.getByRole("button", { name: "Buscar" }).click();

    const jobCards = page.locator(".job-listing-card");
    await expect(jobCards.first()).toBeVisible();

    const firstJobTitle = jobCards.first().getByRole("heading", { level: 3 });
    await expect(firstJobTitle).toHaveText(/Desarrollador de Software Senior/);

    await page.getByRole("button", { name: "Iniciar sesión" }).click();

    await expect(page.getByRole("heading", { name: /Iniciar Sesión/ })).toBeVisible();

    const emailInput = page.getByRole("textbox").first();
    await expect(emailInput).toBeVisible();
    console.log("email name attr:", await emailInput.getAttribute("name"));
    const passwordInput = page.getByRole("textbox").last();
    const iniciarSesionButton = page.getByRole("button", { name: "Iniciar Sesión" }).last();
    await emailInput.fill("lore@na.es");
    await expect(emailInput).toHaveValue("lore@na.es");
    await passwordInput.fill("123456");
    await iniciarSesionButton.click();

    const applyButton = page.getByRole("button", { name: "Aplicar" }).first();
    await applyButton.click();

    await expect(page.getByRole("button", { name: "Aplicado" }).first()).toBeVisible();
});
