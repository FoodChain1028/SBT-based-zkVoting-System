# circuits

The circuits used for the demo are under `./circuits/demo`

The keys generated are included in there. 

1. Generate proof with CLI:
```bash
snarkjs groth16 fullprove input.json circuit.wasm circuit_final.zkey proof.json public.json
```

2. Verify
```bash
snarkjs groth16 verify verification_key.json public.json proof.json

```
We use the this command to verify the proof, passing in the verification_key we exported earlier.

