const request = require("supertest");
const { assert } = require("chai");

const app = require("../app");

describe("User tests", () => {
  describe("Create user", () => {
    it("Should return 400 if passed data isn`t valid", async () => {
      const createUserRequest = {
        firstname: "invalid",
        email: "abcabc",
        age: -12,
        password: "12345",
      };

      await request(app)
        .post("/api/user")
        .send(createUserRequest)
        .expect((res) => {
          assert.equal(res.status, 400);
        });
    });
  });

  describe("Get user list", () => {
    it("Should return empty array if passed page more than items exist", async () => {
      await request(app)
        .get("/api/user/list")
        .query({ page: 999999, limit: 10 })
        .expect((res) => {
          assert.equal(res.status, 200);
          assert.isEmpty(res.body.users);
        });
    });

    it("Should limit to equal users count", async () => {
      const getUsersRequest = { page: 1, limit: 10 };
      await request(app)
        .get("/api/user/list")
        .query(getUsersRequest)
        .expect((res) => {
          assert.equal(res.status, 200);
          const { users } = res.body;
          assert.equal(users.length, getUsersRequest.limit);
        });
    });
  });

  describe("Get user by id", () => {
    it("Should return 404 response if passed userId isn`t found", async () => {
      await request(app)
        .get(`/api/user/${99999999}`)
        .expect((res) => {
          assert.equal(res.status, 404);
        });
    });

    it("Should return 400 response if passed userId isn`t valid", async () => {
        await request(app)
          .get(`/api/user/${-99999}`)
          .expect((res) => {
            assert.equal(res.status, 400);
          });
      });

    it("Should return user object with valid structure", async () => {
      await request(app)
        .get(`/api/user/${1}`)
        .expect((res) => {
          const { user } = res.body;
          assert.equal(res.status, 200);
          assert.hasAllKeys(user, [
            "id",
            "firstname",
            "lastname",
            "email",
            "age",
            "password",
            "createdAt",
          ]);
        });
    });
  });
});
