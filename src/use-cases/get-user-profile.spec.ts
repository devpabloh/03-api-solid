import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'
import { beforeEach, describe } from 'vitest'
import { GetUserProfileUseCase } from './get-user-profile.js'
import { it } from 'node:test'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('', async () => {})
})
