import {Injectable, UnauthorizedException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/auth-credentials-dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {JwtPayload} from "./dto/jwt-payload.interface";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private readonly userRepository: UsersRepository,
        private readonly jwtService: JwtService
    ) { }

    async signUp(authCredentialsDto: AuthCredentialsDto) : Promise<void> {
        return this.userRepository.createUser(authCredentialsDto);

    }

    async signIn(authCredentialsDto: AuthCredentialsDto) : Promise<{ accessToken: string }> {
        const { username, password } = authCredentialsDto;
        const user = await  this.userRepository.findOne({ where: { username } });

        if (user && (await bcrypt.compare(password, user.password))) {
            const payload: JwtPayload = { username };
            const accessToken: string = await this.jwtService.sign(payload);
            return { accessToken };
        } else {
            throw new UnauthorizedException('Please check your login credentials');
        }
    }
}
