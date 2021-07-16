// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
/// @title Voting with delegation.

import "hardhat/console.sol";

contract Ballot {
    // This declares a new complex type which will
    // be used for variables later.
    // It will represent a single voter.

      uint public balance = 0;

    struct Voter {
        bool voted;  // if true, that person already voted
        uint up;
        uint down;
        uint vote;   // index of the voted proposal
    }

    // This is a type for a single proposal.
    struct Proposal {
        string name;   // short name (up to 32 bytes)
        uint upVote; // number of accumulated votes
        uint downVote; // number of accumulated votes

    }

    address public chairperson;

    // This declares a state variable that
    // stores a `Voter` struct for each possible address.
    mapping(address => Voter) public voters;

    // A dynamically-sized array of `Proposal` structs.
    Proposal[] public proposals;

    // map all the proposal created to map
    mapping(address => Proposal[]) public allProporsals;


    /// Create a new ballot to choose one of `proposalNames`.
    constructor(string[] memory proposalNames) {
        chairperson = msg.sender;

        // For each of the provided proposal names,
        // create a new proposal object and add it
        // to the end of the array.
        for (uint i = 0; i < proposalNames.length; i++) {
            // `Proposal({...})` creates a temporary
            // Proposal object and `proposals.push(...)`
            // appends it to the end of `proposals`.
            proposals.push(Proposal({
                name: proposalNames[i],
                upVote: 0,
                downVote: 0
            }));
        }
        allProporsals[chairperson] = proposals;
    }

    function g() external payable {}


    /// Give your vote (including votes delegated to you)
    /// to proposal `proposals[proposal].name`.
    function vote(uint proposal, uint up, uint down) public payable {
        console.log(proposal, up, down, "uint");
        Voter storage sender = voters[msg.sender];

        // voting more than once
        // require(!sender.voted, "Already voted.");
    
        this.g{gas: 50000}();
        sender.voted = true;
        sender.vote = proposal;

        // If `proposal` is out of the range of the array,
        // this will throw automatically and revert all
        // changes.

        allProporsals[chairperson][proposal].upVote += up;
        allProporsals[chairperson][proposal].downVote += down;

        // if(up) proposals[proposal].upVote += 1;
        // if(down) proposals[proposal].downVote += 1;

    }

    /// @dev Computes the winning proposal taking all

    // Calls winningProposal() function to get the index
    // of the winner contained in the proposals array and then
    // returns the name of the winner

      function fetchProposals() public view returns (Proposal[] memory) {
    return allProporsals[chairperson];
  }

}