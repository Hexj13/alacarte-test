import { expect, Page, test as base } from '@playwright/test';
import * as constants from '@fixtures/constants';
import { SearchResultTable } from '@pageobjects/components/searchResultTable.component';
import { ContractDetailPage } from '@pageobjects/static-contracts/contactDetail.page';
import { ContractSearchPage } from '@pageobjects/static-contracts/contractSearch.page';
import { allureSetup } from '@utils/allureSetup';
import { loginWithCookies } from '@utils/loginWithCookies';

let newTabPromise: Promise<Page>;
let newTab: Page;
let beforeEachStep: () => Promise<void>;
let firstRowPrice: number | null;
let contractDetailPage: ContractDetailPage;

const test = base.extend<{
  contractSearchPage: ContractSearchPage;
  searchResultTable: SearchResultTable;
}>({
  page: async ({ page }, use, testInfo) => {
    await allureSetup(testInfo);
    await use(page);
  },
  contractSearchPage: async ({ page }, use) => {
    const contractSearchPage = new ContractSearchPage(page);
    await use(contractSearchPage);
  },
  searchResultTable: async ({ page }, use) => {
    const searchResultTable = new SearchResultTable(page);
    await use(searchResultTable);
  },
});

test.describe('Static contracts', () => {
  test.beforeEach(async ({ page, context }) => {
    beforeEachStep = async () => {
      await loginWithCookies(page, context, 'user');
    };
  });

  test('Search and check price in details', async ({
    context,
    contractSearchPage,
    searchResultTable,
  }) => {
    await test.step('Login as user', beforeEachStep);

    await test.step('Navigate to contract search page', async () => {
      await contractSearchPage.navigate();
    });

    await test.step('Expect page visible', async () => {
      await contractSearchPage.expectPageVisible();
    });

    await test.step('Select price type = net', async () => {
      await contractSearchPage.selectPriceType(constants.priceType.net);
    });

    await test.step('Set nights = 5', async () => {
      await contractSearchPage.setNights('5');
    });

    await test.step('Set adults = 2', async () => {
      await contractSearchPage.setAdultsCount(2);
    });

    await test.step('Select hotel', async () => {
      await contractSearchPage.selectHotel('ANANTARA KIHAVAH MALDIVES VILLAS');
    });

    await test.step('Click search button', async () => {
      await contractSearchPage.searchBtnClick();
    });

    await test.step('Expect search result table visible', async () => {
      await searchResultTable.expectComponentVisible();
    });

    await test.step('Get first row price', async () => {
      firstRowPrice = await searchResultTable.getPriceFromRowByIndex(1);
    });

    await test.step('Click select quotation button', async () => {
      newTabPromise = context.waitForEvent('page');
      await searchResultTable.clickSelectQuotationBtnByIndex(1);
      newTab = await newTabPromise;
      contractDetailPage = new ContractDetailPage(newTab);
    });

    await test.step('Expect contract detail page visible', async () => {
      await contractDetailPage.expectPageVisible();
    });

    await test.step('Get total price and compare with first row price from search result table', async () => {
      const totalPrice = await contractDetailPage.getTotalPrice();
      expect(totalPrice).toBe(firstRowPrice);
    });
  });
});
