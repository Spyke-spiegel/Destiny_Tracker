const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const fetchJson = require("fetch-json");

router.get("/:membershipId", async (req, res) => {
  try {
    const headers = {
      "X-API-KEY": process.env.TRACKER_API_KEY
    };
    const  membershipID  = req.params;
    const asdf = membershipId.merbershipId;
    console.log("req params : " + asdf);
  
    // const response = await fetch(;
    //   `${process.env.TRACKER_API_URL2}/3/Profile/${membershipID}/?components=100`,
    //   {
    //     headers
    //   }
    // );
    // const data = await response.json();
    // console.log(data);
    // res.json(data);
  } catch (error) {
    console.error(err);
    res.status(500).json({
      message: "Server Error"
    });
  }
});



module.exports = router