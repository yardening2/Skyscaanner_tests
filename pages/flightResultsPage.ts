import { Locator, Page, expect } from "@playwright/test"
import Strings from "../core/strings";

export default class FlightResultsPage {

    readonly page: Page;
    readonly noFlightsLabel: Locator;
    readonly flightSearchSummary: Locator;
    readonly outboundTimes: Locator;
    readonly returnTimes: Locator;
    readonly directFlightsFilter: Locator;
    readonly flightClassInfo: Locator;

    constructor(page: Page) {
        this.page = page;
        this.noFlightsLabel = this.page.locator('#CombinedResultsPlaces section strong');
        this.flightSearchSummary = this.page.locator('#oc-ui-wrapper-flights-search-summary');
        this.outboundTimes = this.page.getByText('Outbound', { exact: true });
        this.returnTimes = this.page.getByText('Return', { exact: true });
        this.directFlightsFilter = this.page.locator('input[name="direct"]');
        this.flightClassInfo = this.page.locator('[data-e2e="search-summary-info"] span').nth(1);
    }

    async verifyThereAreNoFlights() {
        await expect(this.noFlightsLabel).toContainText(Strings.noFlightsMessage);
    }

    async verifyThereAreFlightResults() {
        await expect(this.flightSearchSummary).toBeVisible();
    }
    
    async verifyOutboundTimes() {
        await expect(this.outboundTimes).toBeVisible();
    }

    async verifyNoReturnTimes() {
        await expect(this.returnTimes).toBeHidden();
    }

    async verifyDirectFlightsFilterChecked() {
        await expect(this.directFlightsFilter).toBeChecked();
    }

    async verifyFirstClassFlight() {
        await expect(this.flightClassInfo).toContainText(Strings.firstClass);
    }

}