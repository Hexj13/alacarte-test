/* eslint-disable import/no-unresolved */
import { expect } from '@playwright/test';
import * as constants from '@fixtures/constants';
import { BasePage } from '@pageobjects/base.page';
import { HotelType, PriceType } from '@types';

export class ContractSearchPage extends BasePage {
  override pageUrl = '/contract-search';

  container = this.page.locator('//div[contains(@class, "content-wrapper")]');
  roomSearchTitle = this.container.locator('//h1[text()="Room search"]');
  netPriceButton = this.container.locator(
    '//label[contains(@class, "btn")]//input[@id="net"]/..'
  );
  searchButton = this.container.locator('//button[text()="Search"]');
  nationalityDropdown = this.container.locator('//label[text()="Nationality"]');
  staticContractsSidebar = this.page.locator(
    '//span[text()="Static contracts"]'
  );

  priceToggleContainer = this.container.locator(
    '//div[contains(@class, "type-price")]'
  );
  grossPriceButton = this.container.locator(
    '//label[contains(@class, "btn")]//input[@id="gross"]/..'
  );
  sinceDateInput = this.container.locator('//input[@name="since"]');
  untilDateInput = this.container.locator('//input[@name="until"]');
  nightsInput = this.container.locator('//input[@name="nights"]');
  countryDropdown = this.container.locator('//label[text()="Country"]');
  currencyDropdown = this.container.locator('//label[text()="Currency"]');
  searchDateInput = this.container.locator('//input[@name="search_date"]');
  adultsSelect = this.container.locator('//select[@name="rooms[1][adults]"]');
  childrenSelect = this.container.locator(
    '//select[@name="rooms[1][children]"]'
  );
  hotelDropdown = this.container.locator('//label[text()="Hotel"]');
  hotelSelect = this.container.locator('//select[@name="hotel"]');
  roomCategorySelect = this.container.locator('//select[@name="room_types[]"]');
  mealPlanSelect = this.container.locator('//select[@name="meal_planes[]"]');
  beveragePackageSelect = this.container.locator(
    '//select[@name="beverages[]"]'
  );
  bedroomsSelect = this.container.locator('//select[@name="bedroom_count"]');
  transferModeSelect = this.container.locator(
    '//select[@name="transfer_ids[]"]'
  );
  transferTypeSelect = this.container.locator(
    '//select[@name="transfer_direction"]'
  );

  async selectPriceType(priceType: PriceType) {
    if (priceType === constants.priceType.net) {
      await this.netPriceButton.click();
    } else {
      await this.grossPriceButton.click();
    }
  }

  async setNights(nights: string) {
    await this.nightsInput.fill(nights);
  }

  async setAdultsCount(count: number) {
    await this.adultsSelect.selectOption({ value: count.toString() });
  }

  async selectHotel(hotelName: HotelType) {
    await this.hotelSelect.selectOption({ label: hotelName });
  }

  async searchBtnClick() {
    await this.searchButton.click();
  }

  async expectPageVisible() {
    await expect(this.container).toBeVisible();
    await expect(this.roomSearchTitle).toBeVisible();
    await expect(this.searchButton).toBeVisible();
    await expect(this.nationalityDropdown).toBeVisible();
  }
}
