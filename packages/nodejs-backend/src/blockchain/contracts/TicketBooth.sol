// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
 
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol"; 
 
contract RLEventTicket is ERC721, ERC721URIStorage, Ownable {

    event Return(uint256);

    using Counters for Counters.Counter;
 
    Counters.Counter private _tokenIdCounter;
    bool public saleIsActive = false;
    uint256 public totalTickets;
    uint256 public mintPrice;
    uint256 public deadline;
    mapping (uint256 => bool) public refunded;
    uint256 public countRefunded = 0;
 
    constructor(uint256 _totalTickets, uint256 _mintPrice, uint _deadline) ERC721("RLEventTicket", "SLET") {
        totalTickets = _totalTickets;
        mintPrice = _mintPrice;
        deadline = _deadline; //if no deadline, set to 0
        openSale();
    }
 
    function safeMint(address to, string memory uri) public payable returns (uint256) {
        require(totalTickets > _tokenIdCounter.current(), "Not enough tickets!");
        require(msg.value >= mintPrice, "Not enough to pay for ticket!");
        require(saleIsActive, "Tickets are not on sale!");
        require(deadline == 0 || block.timestamp < deadline, "Deadline has passed!");
        
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        
        //payable(owner()).transfer(msg.value);

        emit Return(tokenId);

        return tokenId;
    }

    function openSale() public onlyOwner {
        saleIsActive = true;
    }

    function closeSale() public onlyOwner {
        saleIsActive = false;
    }

    function confirmOwnership(uint256 tokenId) public view returns (bool) {
        return ownerOf(tokenId) == msg.sender;
    }

    function currentCount() public view returns (uint256){
        return _tokenIdCounter.current();
    }

    function countRefundable() public view returns (uint256){
        uint256 count = 0;
        for(uint256 i = 0; i < _tokenIdCounter.current(); i++){
            if (refunded[i] == false && _exists(i)){
                count ++;
            }
        }
        return count;
    }

    function issueAllRefunds() public onlyOwner{
        require (address(this).balance >= countRefundable()*mintPrice, "Not enough to refund.");
        for(uint256 i = 0; i < _tokenIdCounter.current(); i++){
            if (refunded[i] == false && _exists(i)){
                payable(ownerOf(i)).transfer(mintPrice);
                refunded[i] = true;
            }
        }
    }

    function issueRefund(uint256 tokenId) public onlyOwner{
        require (address(this).balance >= mintPrice, "Not enough to refund.");
        require (refunded[tokenId] == false, "Already refunded.");
        payable(ownerOf(tokenId)).transfer(mintPrice);
        refunded[tokenId] = true;
    }

    function withdrawl () public onlyOwner{
        payable(owner()).transfer(address(this).balance);
    }

    function burn(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender, "Only owner of the token can burn it");
        _burn(tokenId);
    }

    function exists(uint256 tokenId) public view returns (bool){
      return _exists(tokenId);
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
 