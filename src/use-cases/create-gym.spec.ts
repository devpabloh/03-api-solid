import type { GymsRepository } from "@/repositories/gyms-repository.js";
import { beforeEach, describe, it } from "vitest";
import { CreateGymUseCase } from "./create-gym.js";


let gymsRepository: GymsRepository
let sut: CreateGymUseCase


describe("Create Gym Use Case", () => {
  beforeEach(()=>{
    gymsRepository = new gymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })
  it("should be able to create a gym", async () => {

  }
})