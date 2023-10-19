import {Injectable, UnauthorizedException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/auth-credentials-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private readonly userRepository: UsersRepository,
    ) { }

    async signUp(authCredentialsDto: AuthCredentialsDto) : Promise<void> {
        return this.userRepository.createUser(authCredentialsDto);

    }

    async signIn(authCredentialsDto: AuthCredentialsDto) : Promise<string> {
        const { username, password } = authCredentialsDto;
        const user = await  this.userRepository.findOne({ where: { username } });

        if (user && (await bcrypt.compare(password, user.password))) {
            return 'success';
        } else {
            throw new UnauthorizedException('Please check your login credentials');
        }
    }
}