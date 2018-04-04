import chai from 'chai';
import SensiGrid from "../src/index.js";

chai.expect();

const expect = chai.expect;

let grid;

describe("Testing all grid initialisation tasks", () => {
    describe("Given an instance of the SensiGrid without any dimension", () => {
        before( () => {
            grid = new SensiGrid();
        });
        
        it("it should return the default width which is 600", () => {
            expect(grid.width).to.be.equal(600);
        });
        it("it should return the default height as 400", () => {
            expect(grid.height).to.be.equal(400);
        });
    });
    describe("Given an instance of the SensiGrid class with 400 X 300", () => {
        before( () => {
            grid = new SensiGrid(400,300);
        });
        
        it("it should return the width as 400", () => {
            expect(grid.width).to.be.equal(400);
        });
        it("it should return the height as 300", () => {
            expect(grid.height).to.be.equal(300);
        });
    });
});