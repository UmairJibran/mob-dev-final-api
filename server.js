const Express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

const app = Express();

const port = process.env.PORT || 3000;

const mongoClient = MongoClient.connect(
	`mongodb+srv://${userName}:${password}@shaoor-tech.djiac.mongodb.net/${db}?retryWrites=true&w=majority`,
	{ useUnifiedTopology: true }
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
	return res.send("200");
});

app.post("/sign-up", (req, res) => {
	const { name, email, password, cnic, mobile, address } = req.body;

	mongoClient
		.then(client =>
			client
				.db(db)
				.collection(collection)
				.findOne({ username: username })
				.then(user => {
					if (user) return false;
					else return true;
				})
		)

		.then(result => {
			console.log(result);
			if (result)
				if (
					!name ||
					!email ||
					!phone ||
					!username ||
					!password ||
					!dateOfBirth ||
					!payment ||
					!creditCard ||
					!ccv ||
					!expires ||
					!address
				)
					return res
						.status(422)
						.json({ status: "failed", reason: "missing fields" });
				else
					mongoClient
						.then(client =>
							client
								.db(db)
								.collection(collection)
								.insertOne({
									id: uuid.v4().replace(/-/g, ""),
									name: name,
									email: email,
									phone: phone,
									password: password,
									address: address,
									cart: [],
								})
								.then(user => {
									return res.status(201).json(user);
								})
								.catch(error => {
									if (error) return res.status(422).json(error);
								})
						)
						.catch(error => {
							if (error) return res.status(500).json(error);
						});
			else return res.status(406).json({ status: "failed" });
		});
	return res.status(200).send("Success");
});

app.post("/log-in", (req, res) => {
	const { email, password } = req.body;
	mongoClient
		.then(client => {
			client
				.db(db)
				.collection("users")
				.findOne({ email: email, password: password })
				.then(user => {
					return res.status(200).json(user);
				})
				.catch(err => {
					console.log(err);
					return res.status(500);
				});
		})
		.catch(err => {
			console.log(err);
			return res.status(500);
		});
	return res.status(200).send("Logged In");
});

app.listen(port, error => {
	if (error) throw console.error(error);
	console.log(`listening on ${port}`);
});
