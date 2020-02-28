const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const fetchJson = require("fetch-json");

router.get("/:membershipId", async (req, res) => {
  try {
    const headers = {
      "X-API-KEY": process.env.TRACKER_API_KEY
    };
    const {
      membershipId
    } = req.params;
    const response = await fetch(
      `${process.env.TRACKER_API_URL2}User/GetMembershipsById/${membershipId}/-1/`, {
        headers
      }
    );
    const data1 = await response.json();
    const primaryPlayerId = data1.Response.destinyMemberships[0].membershipId;
    const primaryPlayerType = data1.Response.destinyMemberships[0].membershipType;
    console.log('response de bungie membership ID : ' + primaryPlayerId + 'et membership Type: ' +
      primaryPlayerType);
    const response2 = await fetch(
      `${process.env.TRACKER_API_URL2}/Destiny2/${primaryPlayerType}/Profile/${primaryPlayerId}/?components=100`, {
        headers
      }
    );
    const data2 = await response2.json();
    console.log(data2);
    const response3 = await fetch(
      `${process.env.TRACKER_API_URL2}/Destiny2/${primaryPlayerType}/Profile/${primaryPlayerId}/Character/${data2.Response.profile.data.characterIds[0]}/?components=200`, {
        headers
      }
    );
    const characterData1 = await response3.json();
    const response4 = await fetch(
      `${process.env.TRACKER_API_URL2}/Destiny2/${primaryPlayerType}/Profile/${primaryPlayerId}/Character/${data2.Response.profile.data.characterIds[1]}/?components=200`, {
        headers
      }
    );
    const characterData2 = await response4.json();
    const response5 = await fetch(
      `${process.env.TRACKER_API_URL2}/Destiny2/${primaryPlayerType}/Profile/${primaryPlayerId}/Character/${data2.Response.profile.data.characterIds[2]}/?components=200`, {
        headers
      }
    );
    const characterData3 = await response5.json();
    console.log('JSon path :' + primaryPlayerId + " " + data2.Response.profile.data.characterIds[0] + " " + primaryPlayerType)
    const character = {
      "characterData1": {},
      "characterData2": {},
      "characterData3": {}
    };
    character.characterData1 = characterData1;
    character.characterData2 = characterData2;
    character.characterData3 = characterData3;
    console.log("test object nested :" + character.characterData1);
    res.json(character);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error"
    });
  }
});



module.exports = router