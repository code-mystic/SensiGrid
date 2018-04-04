import chai from 'chai';
import {checkURLPattern} from '../src/utilities/helpers.js'

chai.expect();

const expect = chai.expect;

describe('Testing string for URL pattern detection', () => {
    it("if the string starts with http:// or https:// or www", () => {
        let isURL = checkURLPattern("http://www.google.com");
        expect(isURL).to.be.equal(true);
        isURL = checkURLPattern("http://www.google.com");
        expect(isURL).to.be.equal(true);
        isURL = checkURLPattern("www.google.com");
        expect(isURL).to.be.equal(true);
    });
    it("if the string starts with ../ or ./ or /", () => {
        let isURL = checkURLPattern("../data/data.csv");
        expect(isURL).to.be.equal(true);
        isURL = checkURLPattern("./data/data.csv");
        expect(isURL).to.be.equal(true);
        isURL = checkURLPattern("/data/data.csv");
        expect(isURL).to.be.equal(true);
    });
    it("if the string ends with any .[format] (ex: .json, .csv)", () => {
        let isURL = checkURLPattern("something.json");
        expect(isURL).to.be.equal(true);
        isURL = checkURLPattern("data/something.js");
        expect(isURL).to.be.equal(true);
        isURL = checkURLPattern("something.csv");
        expect(isURL).to.be.equal(true);
    });
    it("anything else is MOST LIKELY NOT a URL", () => {
        let isURL = checkURLPattern("somewhere something");
        expect(isURL).to.be.equal(false);
    });
});