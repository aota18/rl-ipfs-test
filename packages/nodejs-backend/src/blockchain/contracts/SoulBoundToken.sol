// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
 
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol"; 
import "./TicketBooth.sol";
 
contract SoulBoundToken is ERC721, ERC721URIStorage, Ownable {

    using Counters for Counters.Counter;
 
    Counters.Counter private _tokenIdCounter;
    address public ticketAddress;
    uint256 public deadline;
    string uri;

 
    constructor(address _ticketAddress, uint _deadline, string memory _uri) ERC721("SoulBoundToken", "SBT") {
        ticketAddress = _ticketAddress;
        deadline = _deadline;
        uri = _uri;
    }
 
    function safeMint(address to, uint256 tokenId) public returns (uint256) {
        require(RLEventTicket(ticketAddress).exists(tokenId) == false, "Token Exists.");
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

        return tokenId;
    }

    function mintAll() public onlyOwner{
        for (uint256 i = 0; i < RLEventTicket(ticketAddress).currentCount(); i++){
            if (RLEventTicket(ticketAddress).exists(i)){
                safeMint(RLEventTicket(ticketAddress).ownerOf(i), i);
            }
        }
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function burn(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender, "Only owner of the token can burn it");
        _burn(tokenId);
    }
 
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

}