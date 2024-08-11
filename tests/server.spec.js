const request = require("supertest");
const server = require("../index.js");

describe("Operaciones CRUD de cafes", () => {
 //Requerimiento 1.
 test("GET -> status 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto", async () => {
    const response = await request(server).get("/cafes");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });
  //Requerimiento 2.
  test("DELETE -> status 404 al intentar eliminar un cafe con un ID que no existe", async()=>{
    const response = await request(server).delete("/cafes/IDnone").set("Authorization","token");
    expect(response.status).toBe(404);
  });
  //Requerimiento 3.
  test("POST -> status 201 al agregar un nuevo cafe", async()=>{
    const response = await request(server).post("/cafes").send({id: 5, nombre: "Latte"});
    expect(response.status).toBe(201);
    expect(response.body.length).toBeGreaterThan(4);
  });
  //Requerimiento 4.
  test("PUT -> status 400 si intentas actualizar un cafe enviando un ID en los parametros que sea diferente ID dentro del payload", async()=>{
    const response = await request(server).put("/cafes/5").send({id: 100, nombre: "Espresso"});
    expect(response.status).toBe(400);
  });
});
