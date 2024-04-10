import { chromium, test } from "@playwright/test"
import HomePage from "../pages/homePage"
import FlightResultsPage from "../pages/flightResultsPage";

test("Regular flight test", async ({ baseURL, page }) => {

    const homePage = new HomePage(page);
    const flightResultsPage = new FlightResultsPage(page);
    await page.goto(`${baseURL}`);
    await homePage.typeOriginCountry('Ben Gurion Intl (TLV)');
    await homePage.typeDestinationCountry('Amsterdam Schiphol (AMS)');
    await homePage.selectDepartureDate();
    await homePage.selectRoundtrip();
    await homePage.selectReturnDate();
    await homePage.clickSearch();
    await flightResultsPage.verifyThereAreFlightResults();

});

test("No flight results test", async ({ baseURL, page }) => {

    const homePage = new HomePage(page);
    const flightResultsPage = new FlightResultsPage(page);
    await page.goto(`${baseURL}`);
    await homePage.typeOriginCountry('New Zealand (NZ)');
    await homePage.typeDestinationCountry('Tokyo (Any)');
    await homePage.selectDepartureDate();
    await homePage.selectRoundtrip();
    await homePage.selectReturnDate();
    await homePage.clickSearch();
    await flightResultsPage.verifyThereAreNoFlights();

});

test("Direct flight only test", async ({ baseURL, page }) => {

    const homePage = new HomePage(page);
    const flightResultsPage = new FlightResultsPage(page);
    await page.goto(`${baseURL}`);
    await homePage.typeOriginCountry('Ben Gurion Intl (TLV)');
    await homePage.typeDestinationCountry('Athens International (ATH)');
    await homePage.selectDepartureDate();
    await homePage.selectRoundtrip();
    await homePage.selectReturnDate();
    await homePage.checkDirectFlights();
    await homePage.clickSearch();
    await flightResultsPage.verifyDirectFlightsFilterChecked();

});

test("One way flight test", async ({ baseURL, page }) => {

    const homePage = new HomePage(page);
    const flightResultsPage = new FlightResultsPage(page);
    await page.goto(`${baseURL}`);
    await homePage.typeOriginCountry('Ben Gurion Intl (TLV)');
    await homePage.typeDestinationCountry('Amsterdam Schiphol (AMS)');
    await homePage.selectDepartureDate();
    await homePage.selectOneWayTrip();
    await homePage.clickSearch();
    await flightResultsPage.verifyOutboundTimes();
    await flightResultsPage.verifyNoReturnTimes();

});

test("First class flight test", async ({ baseURL, page }) => {

    const homePage = new HomePage(page);
    const flightResultsPage = new FlightResultsPage(page);
    await page.goto(`${baseURL}`);
    await homePage.typeOriginCountry('Ben Gurion Intl (TLV)');
    await homePage.typeDestinationCountry('London (Any)');
    await homePage.selectDepartureDate();
    await homePage.selectRoundtrip();
    await homePage.selectReturnDate();
    await homePage.selectFirstClass();
    await homePage.clickSearch();
    await flightResultsPage.verifyFirstClassFlight();

});