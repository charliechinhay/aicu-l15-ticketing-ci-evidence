import { expect, test } from "@playwright/test";

test("shows the server-calculated urgency label in the ticket list", async ({
  page
}) => {
  await page.goto("/");

  const ticketRow = page
    .getByRole("row")
    .filter({ hasText: "Impossibile accedere al portale clienti" });
  // il locator ci racconta quali sono gli elementi (o l'elemento in particolare) che stiamo cercando.
  // attenzione: se racconta esclusivamente dove sia nel DOM (come fareste in un programma) 
  // la soluzione e' piu' fragile

  await expect(ticketRow).toContainText("prioritario");
});

test("creates an alta + telefono ticket and shows intervento rapido in the list", async ({
  page
}) => {
  await page.goto("/");

  await page.getByLabel("Titolo").fill("Centralino irraggiungibile da stamattina");
  await page.getByLabel("Cliente").fill("Gamma S.p.A.");
  await page.getByRole("radio", { name: "alta", exact: true }).check();
  await page.getByRole("radio", { name: "telefono", exact: true }).check();

  await page.getByRole("button", { name: "Salva ticket" }).click();

  const ticketRow = page
    .getByRole("row")
    .filter({ hasText: "Centralino irraggiungibile da stamattina" });

  await expect(ticketRow).toContainText("intervento rapido");
});
