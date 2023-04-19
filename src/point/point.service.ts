import {Injectable, NotFoundException} from '@nestjs/common';
import {UpdatePointDto} from './dto/update-point.dto';
import {PrismaService} from "../dabatase/PrismaService";

interface Registro {
    id: number;
    userId: number;
    timestamp: string;
}

interface DadosPorData {
    [data: string]: Date[];
}

interface HorariosPorData {
    date: string;
    hour: string[];
}

@Injectable()
export class PointService {



  constructor(private prisma: PrismaService) {
  }

  async create(data: any) {
    return await this.prisma.point.create({data})
  }

  async findAll() {
    return await this.prisma.point.findMany();
  }

  async findUserPoints(userId: string, startDate: string, endDate: string ) {
    const points = await this.prisma.point.findMany({
      where: {
        userId: parseInt(userId),
          timestamp: {
              gte : new Date(startDate),
              lte: new Date(endDate),
          }
      }
    })
    const dadosPorData: DadosPorData = points.reduce((result, registro) => {
      const data = new Date(registro.timestamp);
      const dataString = data.toISOString().substr(0, 10);
      if (!result[dataString]) {
        result[dataString] = [];
      }
      result[dataString].push(data);
      return result;
    }, {});

    return Object.entries(dadosPorData).map(
        ([data, horarios]) => {
          const horariosString = horarios.map(
              (horario) => horario.toISOString().substr(11, 5)
          );
          return { date: data, hours: horariosString };
        }
    );
  }
    async findRegisterPoint(register: string){
        const user = await this.prisma.user.findUnique({
            where: {
               register : register
            }
        })
        if (!user ){
            throw new NotFoundException('Usuario nao encontrado');
            return;
        }

        const points = await this.prisma.point.findMany({
            where: {
                userId: user.id
            }
        })
        const dadosPorData: DadosPorData = points.reduce((result, registro) => {
            const data = new Date(registro.timestamp);
            const dataString = data.toISOString().substr(0, 10);
            if (!result[dataString]) {
                result[dataString] = [];
            }
            result[dataString].push(data);
            return result;
        }, {});

        return Object.entries(dadosPorData).map(
            ([data, horarios]) => {
                const horariosString = horarios.map(
                    (horario) => horario.toISOString().substr(11, 5)
                );
                return { date: data, hours: horariosString };
            }
        );
    }



}
