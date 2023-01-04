// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
 
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol"; 
import "./FreeTicketBooth.sol";

contract SoulBoundToken is ERC721, ERC721URIStorage, Ownable {

    using Counters for Counters.Counter;

    Counters.Counter private tokenCounter;
    address public ticketAddress;

    struct SBToken{
        address owner;
        uint256 eventId;
        uint256 deadline;
        string uri;
    }

    mapping (uint256 => SBToken) public tokens;
 
    constructor(address _ticketAddress) ERC721("SoulBoundToken", "SBT") {
        ticketAddress = _ticketAddress;
    }

    function createSBT (address _owner, uint256 _eventId, uint _deadline, string memory _uri) public onlyOwner{
        tokens[tokenCounter.current()] = SBToken({owner: _owner, eventId: _eventId, deadline: _deadline, uri: _uri});
        tokenCounter.increment();
    }
 
    function safeMint(address to, uint256 sbtId, uint256 tokenId) public onlyOwner returns (uint256) {
        require(RLEventTicket(ticketAddress).exists(tokenId) == false, "Token Exists.");
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokens[sbtId].uri);

        return tokenId;
    }

    function mintAll(uint256 sbtId) public onlyOwner{
        uint256 eventId = tokens[sbtId].eventId;
        RLEventTicket eventTicket = RLEventTicket(ticketAddress);
        uint256[] memory ticketList = eventTicket.getTickets(eventId);
        uint256 ticketCount = eventTicket.getTicketCounter(eventId);
        for (uint256 i = 0; i < ticketCount; i++){
            if (eventTicket.exists(ticketList[i])){
                safeMint(eventTicket.ownerOf(i), sbtId, ticketList[i]);
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
