// const express = require("express");
// const router = express.Router();
// const fetch = require("node-fetch");

// router.get("/:gamertag", async (req, res) => {
//   try {
//     const headers = {
//       "X-API-KEY": process.env.TRACKER_API_KEY
//     };

//     const { gamertag } = req.params;
//     const response = await fetch(
//       `${process.env.TRACKER_API_URL}/SearchDestinyPlayer/-1/${gamertag}`,
//       {
//         headers
//       }
//     );
//     const data = await response.json();
//     console.log(data);
//     res.json(data);
//   } catch (error) {
//     console.error(err);
//     res.status(500).json({
//       message: "Server Error"
//     });
//   }
// });

// module.exports = router;
