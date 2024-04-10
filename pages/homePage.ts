import { Locator, Page, expect } from "@playwright/test"
import Strings from "../core/strings";

export default class HomePage {

    readonly page: Page;
    readonly originCountryInput: Locator;
    readonly firstOriginOption: Locator;
    readonly destinationCountryInput: Locator;
    readonly firstDestinationOption: Locator;
    readonly departureDateInput: Locator;
    readonly returnDateInput: Locator;
    readonly departureDate: Locator;
    readonly returnDate: Locator;
    readonly travlerelsInput: Locator;
    readonly moreAdultsPlusButton: Locator;
    readonly tripTypeDropdown: Locator;
    readonly oneWayTripOption: Locator;
    readonly roundtripOption: Locator;
    readonly searchButton: Locator;
    readonly directFlightsCheckbox: Locator;
    readonly classDropdown: Locator;

    constructor(page: Page) {
        this.page = page;
        this.originCountryInput = this.page.locator('#originInput-input');
        this.destinationCountryInput = this.page.locator('#destinationInput-input');
        this.departureDateInput = this.page.locator('[data-testid="depart-btn"] span').nth(1);
        this.returnDateInput = this.page.locator('[data-testid="return-btn"]')
        this.departureDate = this.page.locator('[data-testid="calendar"] [role="grid"] [aria-hidden="false"]').nth(8);
        this.returnDate = this.page.locator('[data-testid="calendar"] [role="grid"] [aria-hidden="false"]').nth(12);
        this.travlerelsInput = this.page.locator('[data-testid="traveller-button"] span').nth(1);
        this.moreAdultsPlusButton = this.page.locator('[title="More Adults"]');
        this.tripTypeDropdown = this.page.locator('#popoverContainer');
        this.oneWayTripOption = this.page.locator('[data-testid="ONE_WAY"]');
        this.roundtripOption = this.page.locator('[data-testid="RETURN"]');
        this.searchButton = this.page.locator('[data-testid="desktop-cta"]');
        this.firstOriginOption = this.page.locator('[id="originInput-item-0"]');
        this.firstDestinationOption = this.page.locator('[id="destinationInput-item-0"]');
        this.directFlightsCheckbox = this.page.locator('[name="prefer-directs"]');
        this.classDropdown = this.page.locator('#search-controls-cabin-class-dropdown');
    }

    async typeOriginCountry(country: string) {
        await expect(async () => {
            await this.originCountryInput.pressSequentially(country);
            await this.firstOriginOption.click();
        }).toPass();
    }

    async typeDestinationCountry(country: string) {
        await expect(async () => {
            await this.destinationCountryInput.pressSequentially(country);
            await this.firstDestinationOption.click();
        }).toPass();
    }

    async selectDepartureDate() {
        await expect(async () => {
            await this.departureDateInput.click();
            await this.departureDate.click();
        }).toPass();
    }

    async selectReturnDate() {
        await expect(async () => {
            await this.returnDateInput.click();
            await this.returnDate.click();
        }).toPass();
    }

    async add1Adult() {
        await expect(async () => {
            await this.travlerelsInput.click();
            await this.moreAdultsPlusButton.click();
        }).toPass();
    }

    async selectOneWayTrip() {
        await expect(async () => {
            await this.departureDateInput.click();
            await this.tripTypeDropdown.click();
            await this.oneWayTripOption.click();
        }).toPass();
    }

    async selectRoundtrip() {
        await expect(async () => {
            await this.departureDateInput.click();
            await this.tripTypeDropdown.click();
            await this.roundtripOption.click();
        }).toPass();
    }

    async clickSearch() {
        await this.searchButton.click();
    }

    async checkDirectFlights() {
        await this.directFlightsCheckbox.check();
    }

    async selectFirstClass() {
        await expect(async () => {
            await this.travlerelsInput.click();
            await this.classDropdown.selectOption(Strings.firstClass);
        }).toPass();
    }

}