const hre = require("hardhat");
const { assert } = require("chai");

describe("pedersen hash circuit", () => {
  let circuit;

  const sampleInput = {
    in: "15",
    publicNum: "255443"
  };
  const sanityCheck = true;

  before(async () => {
    circuit = await hre.circuitTest.setup("Polynomial");
  });

  it("produces a witness with valid constraints", async () => {
    const witness = await circuit.calculateWitness(sampleInput, sanityCheck);
    await circuit.checkConstraints(witness);
  });

  it("has expected witness values", async () => {
    const witness = await circuit.calculateLabeledWitness(
      sampleInput,
      sanityCheck
    );
    assert.propertyVal(witness, "main.in", sampleInput.in);
    // You might want to test some intermediate values in the pedersen hash
    assert.propertyVal(
      witness,
      "main.out",
      "16670879915787382"
    );
  });

  it("has the correct output", async () => {
    const expected = { out: "16670879915787382" };
    const witness = await circuit.calculateWitness(sampleInput, sanityCheck);
    await circuit.assertOut(witness, expected);
  });
});