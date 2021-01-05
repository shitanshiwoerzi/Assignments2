import chai from "chai";
import request from "supertest";
const mongoose = require("mongoose");
import User from "../../../../api/users/userModel";

const expect = chai.expect;

let db;
let api;

const users = [
    {
      username: "user1",
      password: "test1",
    }
]

describe("Users endpoint", () => {
  before(() => {
    mongoose.connect(process.env.mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = mongoose.connection;
  });

  after(async () => {
    try {
      await db.dropDatabase();
    } catch (error) {
      console.log(error);
    }
  });
  beforeEach(async () => {
    try {
      api = require("../../../../index");
      await User.deleteMany({});
      await User.collection.insertMany(users);
    } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
    }
  });
  afterEach(() => {
    api.close();
    delete require.cache[require.resolve("../../../../index")];
  });
  describe("GET /users ", () => {
    it("should return the 1 users and a status 200", (done) => {
      request(api)
        .get("/api/users")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(1);
          let result = res.body.map((user) => user.username);
          expect(result).to.have.members(["user1"]);
          done();
        });
    });
  });

  describe("POST / ", () => {
    it("should return a 200 status and the confirmation message", () => {
      return request(api)
        .post("/api/users?action=register")
        .send({
          username: "user3",
          password: "test3",
        })
        .expect(201)
        .expect({ code: 201, msg: 'Successful created new user.' });
    });
    after(() => {
      return request(api)
        .get("/api/users")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(2);
          let result = res.body.map((user) => user.username);
          expect(result).to.have.members(["user1", "user3"]);
        });
    });
  });

  describe("POST / Movie favourites ", function() {
    this.timeout(5000);
    it("should return a 201 status and user message", (done) =>{
        request(api)
        .post("/api/users/user1/favourites")
        .send({
          id: 671583
        })
        .expect(201)
        .end((err,res)=> {
          expect(res.body).to.be.a("Object");
          done();
        })
          request(api)
          .get("api/users/user1/favourites")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .end((err,res)=> {
            expect(res.body).to.be.a("array");
            let result = res.body.map((favourite) => favourite.id);
            expect(result).to.have.members([671583]);
            done();
          });
    });
  });
});