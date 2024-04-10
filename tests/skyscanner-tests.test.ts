import { chromium, test } from "@playwright/test"
import HomePage from "../pages/homePage"
import FlightResultsPage from "../pages/flightResultsPage";
import Strings from "../core/strings";

test("Regular flight test", async ({ baseURL, page }) => {

    const homePage = new HomePage(page);
    const flightResultsPage = new FlightResultsPage(page);
    await page.goto(`${baseURL}`);
    await homePage.typeOriginCountry(Strings.tlvAirport);
    await homePage.typeDestinationCountry(Strings.amsAirport);
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
    await homePage.typeOriginCountry(Strings.nzAirport);
    await homePage.typeDestinationCountry(Strings.tokyoAirport);
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
    await homePage.typeOriginCountry(Strings.tlvAirport);
    await homePage.typeDestinationCountry(Strings.athAirport);
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
    await homePage.typeOriginCountry(Strings.tlvAirport);
    await homePage.typeDestinationCountry(Strings.amsAirport);
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
    await homePage.typeOriginCountry(Strings.tlvAirport);
    await homePage.typeDestinationCountry(Strings.londonAirport);
    await homePage.selectDepartureDate();
    await homePage.selectRoundtrip();
    await homePage.selectReturnDate();
    await homePage.selectFirstClass();
    await homePage.clickSearch();
    await flightResultsPage.verifyFirstClassFlight();

});