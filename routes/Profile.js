const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const fetchJson = require("fetch-json");

router.get("/:membershipId", async (req, res) => {
  try {

    // Find the Player ID from the Membership ID 
    let headers = {
      "X-API-KEY": process.env.TRACKER_API_KEY
    };
    let {
      membershipId
    } = req.params;
    let response = await fetch(
      `${process.env.TRACKER_API_URL2}User/GetMembershipsById/${membershipId}/-1/`, {
        headers
      }
    );
    let data1 = await response.json();
    console.log("Reponse du Server pour player ID : " + JSON.stringify(data1, undefined, 4))
    let primaryPlayerId = data1.Response.destinyMemberships[0].membershipId;
    let primaryPlayerType = data1.Response.destinyMemberships[0].membershipType;
    console.log('response de bungie membership ID : ' + primaryPlayerId + 'et membership Type: ' +
      primaryPlayerType);

    // find the ID of the different character of the player from his Player ID
    let response2 = await fetch(
      `${process.env.TRACKER_API_URL2}/Destiny2/${primaryPlayerType}/Profile/${primaryPlayerId}/?components=100`, {
        headers
      }
    );
    let data2 = await response2.json();
    let bungieAccountError = data2.ErrorCode
    console.log("detection Bungie Error : " + bungieAccountError)
    console.log("Reponse du Server pour les different character ID : " + JSON.stringify(data2, undefined, 4));

    //if the character ID is not right, function for reiterating and try the second destiny account
    if (bungieAccountError === 1601) {
      console.log("Second DEstiny account check begin");
      primaryPlayerId = data1.Response.destinyMemberships[1].membershipId;
      primaryPlayerType = data1.Response.destinyMemberships[1].membershipType;
      let response2 = await fetch(
        `${process.env.TRACKER_API_URL2}/Destiny2/${primaryPlayerType}/Profile/${primaryPlayerId}/?components=100`, {
          headers
        }
      );
      data2 = await response2.json();
      console.log("Reponse du Server pour les different character ID : " + JSON.stringify(data2, undefined, 4));
      let nbCharacter = data2.Response.profile.data.characterIds.length;
      console.log("nombre de character second destiny account: " + nbCharacter);
      console.log("Second Destiny account tested : " + JSON.stringify(data2, undefined, 4));
    } else {
      console.log("error Bungie account")
    };

    console.log("last verif DATA 2 :" + JSON.stringify(data2, undefined, 4));
    let nbCharacter = data2.Response.profile.data.characterIds.length;
    console.log("nombre de character : " + nbCharacter);
    let character = {};

    if (nbCharacter === 1) {
      console.log("fonction if demarre");
      // Gather the infos for the first Character
      let response3 = await fetch(
        `${process.env.TRACKER_API_URL2}/Destiny2/${primaryPlayerType}/Profile/${primaryPlayerId}/Character/${data2.Response.profile.data.characterIds[0]}/?components=200`, {
          headers
        }
      );
      let characterData1Raw = await response3.json();
      character = characterData1Raw.Response.character.data;
      console.log("if executer");

    } else if (nbCharacter === 2) {
      // Gather the infos for the first Character
      console.log("fonction Else-if demarre");
      let response3 = await fetch(
        `${process.env.TRACKER_API_URL2}/Destiny2/${primaryPlayerType}/Profile/${primaryPlayerId}/Character/${data2.Response.profile.data.characterIds[0]}/?components=200`, {
          headers
        }
      );
      let characterData1Raw = await response3.json();
      console.log("DEbugger : " + JSON.stringify(characterData1Raw, undefined, 4));
      let characterData1 = characterData1Raw.Response.character.data;

      // Gather the infos for the second Character
      let response4 = await fetch(
        `${process.env.TRACKER_API_URL2}/Destiny2/${primaryPlayerType}/Profile/${primaryPlayerId}/Character/${data2.Response.profile.data.characterIds[1]}/?components=200`, {
          headers
        }
      );
      let characterData2Raw = await response4.json();
      let characterData2 = characterData2Raw.Response.character.data;

      character = {
        "characterData1": {},
        "characterData2": {}
      };
      character.characterData1 = characterData1;
      character.characterData2 = characterData2;

    } else {

      console.log("function Else deamrre");
      // Gather the infos for the first Character
      let response3 = await fetch(
        `${process.env.TRACKER_API_URL2}/Destiny2/${primaryPlayerType}/Profile/${primaryPlayerId}/Character/${data2.Response.profile.data.characterIds[0]}/?components=200`, {
          headers
        }
      );
      let characterData1Raw = await response3.json();
      let characterData1 = characterData1Raw.Response.character.data;

      // Gather the infos for the second Character
      let response4 = await fetch(
        `${process.env.TRACKER_API_URL2}/Destiny2/${primaryPlayerType}/Profile/${primaryPlayerId}/Character/${data2.Response.profile.data.characterIds[1]}/?components=200`, {
          headers
        }
      );
      let characterData2Raw = await response4.json();
      let characterData2 = characterData2Raw.Response.character.data;

      // Gather the infos for the third Character
      let response5 = await fetch(
        `${process.env.TRACKER_API_URL2}/Destiny2/${primaryPlayerType}/Profile/${primaryPlayerId}/Character/${data2.Response.profile.data.characterIds[2]}/?components=200`, {
          headers
        }
      );
      let characterData3Raw = await response5.json();
      let characterData3 = characterData3Raw.Response.character.data;
      // console.log('JSon path :' + primaryPlayerId + " " + data2.Response.profile.data.characterIds[0] + " " + primaryPlayerType)


      // Create a JS Object from the different API call above adn send it back to the Front End
      character = {
        "characterData1": {},
        "characterData2": {},
        "characterData3": {}
      };
      character.characterData1 = characterData1;
      character.characterData2 = characterData2;
      character.characterData3 = characterData3;
    }
    console.log("Reponse du Server : " + JSON.stringify(character, undefined, 4));
    res.json(character);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
});



module.exports = router