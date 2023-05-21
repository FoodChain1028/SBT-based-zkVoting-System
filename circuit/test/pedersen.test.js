const hre = require("hardhat");
const { assert } = require("chai");

describe("pedersen hash circuit", () => {
  let circuit;

  const sampleInput = {
    in: "15",
  };
  const sanityCheck = true;

  before(async () => {
    circuit = await hre.circuitTest.setup("Pedersen");
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
      "main.out[0]",
      "7658085551611948538652682681465234662996144502467591936160074911038686706989"
    );
  });

  it("has the correct output", async () => {
    const expected = { out: ["7658085551611948538652682681465234662996144502467591936160074911038686706989", "13703528276342880857486940125078519380864090981842271709928473006722237259536"] };
    const witness = await circuit.calculateWitness(sampleInput, sanityCheck);
    await circuit.assertOut(witness, expected);
  });
});
