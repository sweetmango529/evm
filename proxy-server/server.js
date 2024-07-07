const express = require('express');
const axios = require('axios');
const cors = require('cors');
const Moralis = require("moralis").default;

const app = express();
const port = 5000;
app.use(cors());

app.get('/api/price', async (req, res) => {
	if (!Moralis.Core.isStarted) {
		console.log("started!");
		try {
			await Moralis.start({
				apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImNiNmI1NGVhLWJkM2QtNGNjZC05MWExLWM2MDU2OWJiY2NjNyIsIm9yZ0lkIjoiMzk0MzI4IiwidXNlcklkIjoiNDA1MTk1IiwidHlwZUlkIjoiN2Q2YTJiZjAtYzQ2ZC00NDFjLTgzZjMtOTgwZWY3YzI5YjEzIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MTcwNzExNzksImV4cCI6NDg3MjgzMTE3OX0.elqDvgwWBggGKH9Ycv56dvBI22pAX38Xk7o9eW-rr6Y"
			});

			const response = await Moralis.EvmApi.wallets.getWalletTokenBalancesPrice({
				"chain": "0x1",
				"address": "0x18B2A687610328590Bc8F2e5fEdDe3b582A49cdA"
			});

			console.log(response);
			res.json(response);
		} catch (e) {
			console.error(e);
		}
	}
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
