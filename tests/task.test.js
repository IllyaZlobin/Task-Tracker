const request = require("supertest");
const { assert } = require("chai");
const taskService = require("../services/task.service");
const { orderTask } = require("../utils/orderTask");

const app = require("../app");

describe("Task tests", () => {
  let token;
  before(async () => {
    await request(app)
      .post("/api/auth/login")
      .send({ email: "illiazlobin@gmail.com", password: "123456" })
      .expect((res) => {
        const { accessToken } = res.body.token;
        token = accessToken;
      });
  });

  describe("Create task", () => {
    let taskId;
    it("Should return 400 if passed data isn`t valid", async () => {
      const createTaskRequest = {
        title: "",
        status: "Wrong-status",
      };

      await request(app)
        .post("/api/task")
        .send(createTaskRequest)
        .auth(token, { type: "bearer" })
        .expect("Content-Type", /json/)
        .expect((res) => {
          assert.equal(res.status, 400);
        });
    });

    it("Should return 401 if auth token isn`t passed", async () => {
      await request(app)
        .post("/api/task")
        .expect("Content-Type", /json/)
        .expect((res) => {
          assert.equal(res.status, 401);
        });
    });

    it("Should return task object with valid structure", async () => {
      const createTaskRequest = {
        title: "task for test",
        description: "test",
        status: "VIEW",
      };
      await request(app)
        .post("/api/task")
        .send(createTaskRequest)
        .expect("Content-Type", /json/)
        .auth(token, { type: "bearer" })
        .expect((res) => {
          const { task } = res.body;
          taskId = task.id;

          assert.equal(res.status, 200);

          assert.hasAllKeys(task, [
            "id",
            "title",
            "description",
            "status",
            "userId",
          ]);
        });
    });

    after(async () => {
      await taskService.delete(taskId);
    });
  });

  describe("Update task", () => {
    it("Should return 404 if passed taskId isn`t found", async () => {
      const updateTaskRequest = {
        title: "test task",
        description: "test",
        status: "VIEW",
        userId: 1,
      };
      await request(app)
        .put(`/api/task/${99999999999}`)
        .send(updateTaskRequest)
        .auth(token, { type: "bearer" })
        .expect("Content-Type", /json/)
        .expect((res) => { 
          assert.equal(res.status, 404);
        });
    });

    it("Should return 400 if passed values is invalid", async () => {
      const updateTaskRequest = {
        status: "VIEW",
        userId: 1,
      };
      await request(app)
        .put(`/api/task/${3}`)
        .send(updateTaskRequest)
        .auth(token, { type: "bearer" })
        .expect("Content-Type", /json/)
        .expect((res) => {
          assert.equal(res.status, 400);
        });
    });
  });
});
