const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server.js");

chai.use(chaiHttp);

let Translator = require("../components/translator.js");

suite("Functional Tests", () => {
  // Translation with text and locale fields: POST request to /api/translate
  test("Translation with text and locale fields: POST request to /api/translate", (done) => {
    chai
      .request(server)
      .post("/api/translate")
      .send({
        text: "Mangoes are my favorite fruit.",
        locale: "american-to-british",
      })
      .end((_, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.text, "Mangoes are my favorite fruit.");
        assert.equal(
          res.body.translation,
          'Mangoes are my <span class="highlight">favourite</span> fruit.'
        );
        done();
      });

    //Translation with text and invalid locale field: POST request to /api/translate
    test("Translation with text and invalid locale field: POST request to /api/translate", (done) => {
      chai
        .request(server)
        .post("/api/translate")
        .send({
          text: "Mangoes are my favorite fruit.",
          locale: "british-to-american",
        })
        .end((_, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.text, "Mangoes are my favorite fruit.");
          assert.equal(
            res.body.translation,
            "I can't translate it to that language, so sorry!"
          );
          done();
        });
    });
  });
});
