/* eslint-disable import/no-unresolved */
import { expect } from '@playwright/test';
import { BasePage } from '@pageobjects/base.page';

export class SearchResultTable extends BasePage {
  tableContainer = this.page.locator(
    '//div[contains(@class, "search-result")]'
  );
  filterForm = this.tableContainer.locator('//form[@id="filter_form"]');
  table = this.tableContainer.locator(
    '//div[contains(@class, "table-responsive")]//table[contains(@class, "table")]'
  );
  tableRows = this.tableContainer.locator('//tbody//tr');

  async getRowCount(): Promise<number> {
    return await this.tableRows.count();
  }

  async getRowByIndex(rowIndex: number) {
    return this.tableRows.nth(rowIndex);
  }

  async getPriceFromRowByIndex(rowIndex: number): Promise<number | null> {
    const row = await this.getRowByIndex(rowIndex);
    const priceElement = row.locator('.contract-price');
    if (await priceElement.isVisible()) {
      const priceText = await priceElement.textContent();
      if (priceText) {
        const priceMatch = priceText.match(/[\d\s]+\.\d+/);
        if (priceMatch) {
          const cleanPrice = priceMatch[0].replace(/\s/g, '');
          return parseFloat(cleanPrice);
        }
      }
    }
    return null;
  }

  async clickSelectQuotationBtnByIndex(rowIndex: number) {
    const row = await this.getRowByIndex(rowIndex);
    await row.locator('//a[contains(text(), "Select Quotation")]').click();
  }

  async expectComponentVisible() {
    await expect(this.tableContainer).toBeVisible();
    await expect(this.table).toBeVisible();
    await expect(this.tableRows.first()).toBeVisible();
    await expect(this.filterForm).toBeVisible();
  }
}
