const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;

const ConnectionUrl = "mongodb://127.0.0.1:27017";
const dbName = "task-05-db";

mongoClient.connect(ConnectionUrl, (error, res1) => {
	if (error) {
		return console.log("Error: Unable to connecting to MongoDB");
	}

	console.log("Connected successfully");
	const db = res1.db(dbName);

	// insertOne   2
	// 1
	db.collection("users")
		.insertOne({
			name: "kareem",
			age: 34,
			city: "makkah",
		})
		.then((res) => console.log(res.insertedId))
		.catch((error) => console.log(error));
	
	// 2
	db.collection("users")
		.insertOne({ name: "Maya", age: 22, city: "Beirut" })
		.then((res) => console.log(res.insertedId))
		.catch((error) => console.log("Unable to insert user: " + error));
	// ----------------------------------------------------------------------------

	// insertMany  10     5 of 10   =>   age    25
	db.collection("users")
		.insertMany([
			{ name: "Ahmed", age: 25, city: "cairo" },
			{ name: "ali", age: 27, city: "cairo" },
			{ name: "mohamed", age: 25, city: "domyat" },
			{ name: "hassn", age: 25, city: "mansoura" },
			{ name: "omr", age: 25, city: "mansoura" },
			{ name: "Ammar", age: 25, city: "tanta" },
			{ name: "Hemma", age: 20, city: "fayoum" },
			{ name: "Noor", age: 33, city: "mansoura" },
			{ name: "Merro", age: 31, city: "Jeddah" },
			{ name: "aya", age: 27, city: "tanta" },
		])
		.then((res) => console.log(res.insertedCount))
		.catch((err) => console.log(err));
	// ----------------------------------------------------------------------------

	// find   match  25
	db.collection("users")
		.find({ age: 25 })
		.toArray()
		.then((res) => console.log(res))
		.catch((error) => console.log(error));
	// ----------------------------------------------------------------------------

	// limit  3     25y
	db.collection("users")
		.find({ age: 25 })
		.limit(3)
		.toArray((error, users) => {
			if (error) {
				return console.log("Unable to find users");
			}

			console.log(users);
		});
	// ----------------------------------------------------------------------------

	// $set  name    4
	// 1
	db.collection("users")
		.updateOne(
			{ _id: mongodb.ObjectId("64d7d2b3d35a1a84f051599d") },
			{ $set: { name: "Ebraheem" } }
		)
		.then((data) => console.log(data.modifiedCount))
		.catch(console.error);

	// 2
	db.collection("users")
		.updateOne(
			{ _id: mongodb.ObjectId("64d7d2b4d35a1a84f051599f") },
			{ $set: { name: "hossam" } }
		)
		.then((data) => console.log(data.modifiedCount))
		.catch(console.error);

	// 3
	db.collection("users")
		.updateOne({ _id: mongodb.ObjectId("64d7d2b4d35a1a84f05159a0") }, 
		{ $set: { name: "manar" } }
	)
		.then((data) => console.log(data.modifiedCount))
		.catch(console.error);

	// 4
	db.collection("users")
		.updateOne({ _id: mongodb.ObjectId("64d7d2b4d35a1a84f05159a1") }, 
		{ $set: { name: "sara" } }
	)
		.then((data) => console.log(data.modifiedCount))
		.catch(console.error);
	// ----------------------------------------------------------------------------


	// updateOne  for 1    inc  20
	db.collection("users")
		.updateOne({ _id: mongodb.ObjectId("64d7d2b3d35a1a84f051599d") }, { $inc: { age: 20 } })
		.then((data) => console.log(data.modifiedCount))
		.catch((error) => console.log(error));
	// ----------------------------------------------------------------------------


	// updateMany  inc  age  10
	db.collection("users")
		.updateMany({}, { $inc: { age: 10 } })
		.then((data) => console.log(data.modifiedCount))
		.catch((error) => console.log(error));
	// ----------------------------------------------------------------------------


	// deleteOne   1
	db.collection("users")
		.deleteOne({ _id: mongodb.ObjectId("64d7d2b3d35a1a84f051599d") })
		.then((data) => console.log(data.deletedCount))
		.catch((error) => console.log(error));
	// ----------------------------------------------------------------------------

	
	// deleteMany   age  35
	db.collection("users")
		.deleteMany({ age: 35 })
		.then((data) => console.log(data.deletedCount))
		.catch((error) => console.log(error));
	// ----------------------------------------------------------------------------
});
