import chai from "chai";
import request from "supertest";
import api from "../../../../index";  // Express API application 

const expect = chai.expect;

describe('Movies endpoint',  function (){
    this.timeout(5000)
    before((done)=>{
        setTimeout(()=>{
           done();
        },4500)
    })
    describe("GET /movies ", () => {
        it("should check token and return the 20 movies", (done) => {
           request(api)
          .post("/api/users")
          .send({
            "username":"user1",
            "password":"test1"
          })
          .end((err,res)=>{
            var token = res.body.token;
            console.log(token);
            request(api)
            .get("/api/movies")
            .set("Accept", "application/json")
            .set("Authorization", token)
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.body).to.be.a("array");
                expect(res.body.length).to.equal(20);
              done();
            });
          });
        })
      });
});
