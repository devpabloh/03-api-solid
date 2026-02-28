import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository.js'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from './check-in.js'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository.js'
import { Decimal } from '@prisma/client/runtime/client'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    gymsRepository.items.push({
      id: 'gym-01',
      title: 'My Gym',
      description: 'Projeto criando um backend para uma academia',
      phone: '11999999999',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2026, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: 0,
        userLongitude: 0,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to ckeck in twice in diferrent days', async () => {
    vi.setSystemTime(new Date(2026, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    vi.setSystemTime(new Date(2026, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'My Gym Two',
      description: 'My second gym',
      phone: '11999999999',
      latitude: new Decimal(-7.9787024),
      longitude: new Decimal(-34.8293001),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -7.9105512,
        userLongitude: -34.8267953,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
