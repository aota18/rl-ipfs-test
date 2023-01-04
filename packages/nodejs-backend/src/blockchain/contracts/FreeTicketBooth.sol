// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
 
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol"; 
 
contract RLEventTicket is ERC721, ERC721URIStorage, Ownable {

    event Return(uint256);

    using Counters for Counters.Counter;
    
    Counters.Counter eventCounter;
    Counters.Counter idCounter;
 
    struct Event{
        address owner;
        bool saleIsActive;
        uint256 totalTickets;
        uint256 deadline;
        uint256 ticketCounter;
        uint256 [] tickets;
    }

    mapping (uint256 => Event) public events;
 
    constructor() ERC721("RLEventTicket", "SLET") {
    }

    function createEvent(address _owner, uint256 _totalTickets, uint256 _deadline) public returns (uint256){
        uint256 count = eventCounter.current();
        events[count] = Event({owner: _owner, saleIsActive: true, totalTickets: _totalTickets, deadline: _deadline, ticketCounter: 0, tickets: new uint256 [](_totalTickets)});
        eventCounter.increment();
        return count;
    }
 
    function safeMint(address to, string memory uri, uint256 eventId) public returns (uint256) {
        require(events[eventId].totalTickets > events[eventId].ticketCounter, "No more tickets available!");
        require(events[eventId].saleIsActive, "Tickets are not on sale!");
        require(events[eventId].deadline == 0 || block.timestamp < events[eventId].deadline, "Deadline has passed!");
        
        uint256 tokenId = idCounter.current();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

        events[eventId].tickets.push(tokenId);

        idCounter.increment();
        events[eventId].ticketCounter++;

        emit Return(tokenId);

        return tokenId;
    }

    function openSale(uint256 eventId) public {
        events[eventId].saleIsActive = true;
    }

    function closeSale(uint256 eventId) public {
        events[eventId].saleIsActive = false;
    }

    function confirmOwnership(uint256 tokenId) public view returns (bool) {
        return ownerOf(tokenId) == msg.sender;
    }

    function currentCount(uint256 eventId) public view returns (uint256){
        return events[eventId].ticketCounter;
    }

    function burn(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender, "Only owner of the token can burn it");
        _burn(tokenId);
    }

    function exists(uint256 tokenId) public view returns (bool){
      return _exists(tokenId);
    }

    function getTickets(uint256 eventId) public view returns (uint256 [] memory){
        return events[eventId].tickets;
    }

    function getTicketCounter(uint256 eventId) public view returns (uint256){
        return events[eventId].ticketCounter;
    }
 
    // The following functions are overrides required by Solidity.
 
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
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
