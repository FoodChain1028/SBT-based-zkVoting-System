// SPDX-License-Identifier: MIT
// SpartanLabs Contracts (SBT)
// Modified Version of BasicSBT by SpartanLabs @ https://github.com/SpartanLabsXyz/spartanlabs-contracts/blob/main/contracts/SoulBoundToken/BasicSBT.sol

pragma solidity >=0.6.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

/// @dev Import Verifier.Sol for zkSNARK verification
interface IVerifier {
    function verifyProof(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[2] memory input
    ) external view returns (bool);
}

/**
 * @dev Implementation of Soul Bound Token (SBT)
 * Following Vitalik's co-authored whitepaper at: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4105763
 *
 * Contract provides a basic Soul Bound Token mechanism, where address can mint SBT with their private data.
 *
 * By default, the owner account will be the one that deploys the contract. This
 * can later be changed with {transferOwnership}.
 */
contract zkSBT is Ownable {
    // Name for the SBT
    string public _name;

    // Symbol for the SBT
    string public _symbol;

    // Total count of SBT
    uint256 public _totalSBT;

    // Mapping between address and the soul
    mapping(address => Proof) private souls;

    // Events
    event Mint(address _soul);
    event Burn(address _soul);
    event Update(address _soul);

    /** @dev Struct that contains call data generated from proof and public signals in snarkjs */ 
    struct Proof {
        uint256[2] a;
        uint256[2][2] b;
        uint256[2] c;
        uint[2] input;
    }

    /**
     * @dev This modifier checks that the address passed in is not the zero address.
     */
    modifier validAddress(address _addr) {
        require(_addr != address(0), "Not valid address");
        _;
    }

    /**
     * @dev Initializes the contract by setting a `name` and a `symbol` to the SBT.
     * The `totalSBT` is set to zero.
     */
    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
        _totalSBT = 0;
    }

    /**
     * @dev Mints `SBT` and transfers it to `sender`.
     *
     * Emits a {Mint} event.
     */
    function mint(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint[2] memory input
    ) external virtual {
        require(!hasSoul(msg.sender), "Soul already exists");
        Proof memory _soulData = Proof(a, b, c, input);
        souls[msg.sender] = _soulData;
        _totalSBT++;
        emit Mint(msg.sender);
    }

    /**
     * @dev Destroys SBT for a given address.
     *
     * Requirements:
     * Only the owner of the SBT can destroy it.
     * Emits a {Burn} event.
     *
     * However, projects can have it such that users can propose changes for the contract owner to update.
     */
    function burn(address _soul)
        external
        virtual
        onlyOwner
        validAddress(_soul)
    {
        require(hasSoul(_soul), "Soul does not exists");
        delete souls[_soul];
        _totalSBT--;
        emit Burn(_soul);
    }

    /**
     * @dev Updates the mapping of address to attribute.
     * Only the owner address is able to update the information.
     *
     * However, projects can have it such that users can propose changes for the contract owner to update.
     */
    function updateSBT(address _soul, Proof memory _soulData)
        public
        validAddress(_soul)
        returns (bool)
    {
        require(hasSoul(_soul), "Soul does not exist");
        souls[_soul] = _soulData;
        emit Update(_soul);
        return true;
    }

    /**
     * @dev Returns the soul data of `identity, uri` for the given address
     */
    function getSBTData(address _soul)
        public
        view
        virtual
        validAddress(_soul)
        returns (
            uint256[2] memory,
            uint256[2][2] memory,
            uint256[2] memory,
            uint[2] memory
        )
    {
        return (
            souls[_soul].a,
            souls[_soul].b,
            souls[_soul].c,
            souls[_soul].input
        );
    }

    /**
     * @dev Validates if the _soul is associated with the valid data in the corresponding address.
     * By checking if the `_soulData` given in parameter is the same as the data in the struct of mapping.
     *
     * This uses the Verification.sol contract to verify the data.
     * @param _soul is the address of the soul
     * @param verifierAddress is the address deployed for the Verifier.sol contract
     *
     * @return true if the proof is valid, false otherwise
     */
    function validateAttribute(address _soul, address verifierAddress)
        public
        view
        returns (bool)
    {
        require(hasSoul(_soul), "Soul does not exist");

        Proof memory _soulData = souls[_soul];
        IVerifier verifier = IVerifier(verifierAddress);
        return
            verifier.verifyProof(
                _soulData.a,
                _soulData.b,
                _soulData.c,
                _soulData.input
            ); // Using zkSNARK verification
    }

    /**
     * @dev Gets the total count of SBT.
     */
    function totalSBT() public view virtual returns (uint256) {
        return _totalSBT;
    }

    /**
     * @dev Returns if two strings are equalx
     */
    function compareString(string memory a, string memory b)
        internal
        pure
        virtual
        returns (bool)
    {
        return compareMemory(bytes(a), bytes(b));
    }

    /**
     * @dev Returns if two memory arrays are equal
     */
    function compareMemory(bytes memory a, bytes memory b)
        internal
        pure
        virtual
        returns (bool)
    {
        return (a.length == b.length) && (keccak256(a) == keccak256(b));
    }

    /**
     * @dev Returns whether SBT exists for a given address.
     *
     * SBT start existing when they are minted (`mint`),
     * and stop existing when they are burned (`burn`).
     */
    function hasSoul(address _soul)
        public
        view
        virtual
        validAddress(_soul)
        returns (bool)
    {
        return souls[_soul].input[0] != 0;
        // return bytes(soulData).length > 0;
    }

    /**
     * @dev Returns the name of SBT.
     */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @dev Returns the symbol ticker of SBT.
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }
}
