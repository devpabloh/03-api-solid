import { UsersRepository } from '@/repositories/users-repository.js'
import { InvalidCredentialsError } from './errors/invalid-credentials-error.js'
import { compare } from 'bcryptjs'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

type AuthenticateUseCaseResponse = void

export class AuthenticateUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }
  }
}
