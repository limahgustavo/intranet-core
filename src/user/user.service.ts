import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../dabatase/PrismaService";
import {UserLogin} from "./dto/user-login";

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) {
    }

    async create(data: any) {
        return await this.prisma.user.create({data})
    }

    async findAll() {
        return await this.prisma.user.findMany();
    }

    findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    async login(user: UserLogin) {

        const data = await this.prisma.user.findUnique({
            where: {
                login: user.login
            }
        })


        if (!data) {
            throw new NotFoundException('Usuario nao encontrado');
        }

        if (data.password != user.password) {
            throw new NotFoundException('Senha incorreta');
        }

        return data

    }
}

