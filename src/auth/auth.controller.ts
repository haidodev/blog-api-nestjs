import { Body, Controller, Get, Post, Request, Response, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDTO } from 'src/users/dto/user.dto';
import { DoesUserExist } from 'src/guards/doesUserExist.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return await this.authService.login(req.user);
    }
    @UseGuards(DoesUserExist)
    @Post('signup')
    async signUp(@Body() user : UserDTO){
        return await this.authService.create(user);
    }
    @Get()
    async getAuthRespose(@Response() res) {
        return res.json({
            message: "OK"
        });
    }
}
