const request = require("supertest");
const { assert } = require("chai");

const app = require("../app");

describe("/api/user/{id} TEST", () => {
  it("Should return 404 if user id is not exist", async () => {
    await request(app)
      .get(`/api/user/${9999999}`)
      .expect((res) => {
        assert.equal(res.status, 404);
      });
  });
});

describe("/api/user/list", () => {
  it("Should return empty array if passed page more than items exist", async () => {
    await request(app)
      .get(`/api/user/list`)
      .query({ page: 999999, limit: 10 })
      .expect((res) => {
        assert.equal(res.status, 200);
        assert.isEmpty(res.body.users);
      });
  });
});

describe("Task tests", () => {
  it ("Should return Unauthorized if Bearer token isn`t passed", async () => {
    await request(app)
      .get('/api/task/list')
      .expect((res) => {
        assert.equal(res.status, 401);  
      })  
  })  
})
