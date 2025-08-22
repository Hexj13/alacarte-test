/* eslint-disable import/no-unresolved */
import { expect } from '@playwright/test';
import { BasePage } from '@pageobjects/base.page';

export class ContractDetailPage extends BasePage {
  override pageUrl = '/contract-search/detail';
  container = this.page.locator('//div[contains(@class, "content-wrapper")]');
  headerTitle = this.container.locator(
    '//div[contains(@class, "content-header")]'
  );
  contentContainer = this.container.locator(
    '//section[contains(@class, "room-search-detail")]'
  );
  quotationTable = this.contentContainer.locator(
    '//table[@id="quotation-table"]'
  );
  totalPriceTr = this.quotationTable.locator('//tr[contains(@class, "total")]');
  totalPriceCell = this.totalPriceTr.locator('//td[2]');

  async getTotalPrice() {
    const text = await this.totalPriceCell.textContent();
    if (!text) return null;
    const match = text.replace(/[^\d.,]/g, '').replace(/\s/g, '');
    const normalized = match.replace(',', '.');
    return parseFloat(normalized);
  }

  async expectPageVisible() {
    await expect(this.container).toBeVisible();
    await expect(this.headerTitle).toBeVisible();
    await expect(this.contentContainer).toBeVisible();
    await expect(this.quotationTable).toBeVisible();
    await expect(this.totalPriceTr).toBeVisible();
    await expect(this.totalPriceCell).toBeVisible();
  }
}
