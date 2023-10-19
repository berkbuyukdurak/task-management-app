import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/auth-credentials-dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private readonly userRepository: UsersRepository,
    ) { }

    async signUp(authCredentialsDto: AuthCredentialsDto) : Promise<void> {
        return this.userRepository.createUser(authCredentialsDto);

    }
}
