pragma circom 2.0.3;

include "../node_modules/circomlib/circuits/pedersen.circom";
include "../node_modules/circomlib/circuits/bitify.circom";

template Main() {

    // Perdeson Hash
    signal input in;
    signal input publicNum;
    signal tmp;
    signal squared;
    signal cubed;
    signal output out;

    // deal with `in` x^3 + x + 12
    tmp <== (in + publicNum);
    squared <== tmp * tmp;
    cubed <== squared * tmp;
    out <== cubed + tmp + 12;
}

component main = Main();