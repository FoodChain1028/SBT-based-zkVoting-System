pragma circom 2.0.3;

include "../node_modules/circomlib/circuits/pedersen.circom";
include "../node_modules/circomlib/circuits/bitify.circom";

template Main() {
    // signal input preimage;
    // signal output hash;
    
    // component hasher = Pedersen(256);
    
    // hasher.in <== preimage;
    // hash <== hasher.out;

    // Perdeson Hash Test
    signal input in;
    signal output out[2];
    signal squared;
    signal cubed;
    signal final;

    // deal with `in` x^3 + x + 12
    squared <== in * in;
    cubed <== squared * in;
    final <== cubed + in + 12;

    component pedersen = Pedersen(256);
    component n2b;
    n2b = Num2Bits(253);

    var i;

    final ==> n2b.in;

    for  (i=0; i<253; i++) {
        pedersen.in[i] <== n2b.out[i];
    }

    for (i=253; i<256; i++) {
        pedersen.in[i] <== 0;
    }

    pedersen.out[0] ==> out[0];
    pedersen.out[1] ==> out[1];
}

component main = Main();

// pragma circom 2.0.0;

// include "../../circuits/pedersen.circom";
// include "../../circuits/bitify.circom";


// template Main() {
//     signal input in;
//     signal output out[2];

//     component pedersen = Pedersen(256);

//     component n2b;
//     n2b = Num2Bits(253);

//     var i;

//     in ==> n2b.in;

//     for  (i=0; i<253; i++) {
//         pedersen.in[i] <== n2b.out[i];
//     }

//     for (i=253; i<256; i++) {
//         pedersen.in[i] <== 0;
//     }

//     pedersen.out[0] ==> out[0];
//     pedersen.out[1] ==> out[1];
// }

// component main = Main();

