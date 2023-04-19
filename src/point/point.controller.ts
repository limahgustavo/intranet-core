import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {PointService} from './point.service';
import {CreatePointDto} from './dto/create-point.dto';

@Controller('point')
export class PointController {
    constructor(private readonly pointService: PointService) {
    }

    @Post()
    create(@Body() createPointDto: CreatePointDto) {
        return this.pointService.create(createPointDto);
    }

    @Get(':id')
    findUserPoints(
        @Param('id') id: string,
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
    ) {
        return this.pointService.findUserPoints(id, startDate, endDate)
    }
    @Get('register/:register')
    findRegisterPoints(@Param('register') register: string) {
        return this.pointService.findRegisterPoint(register)
    }


}
