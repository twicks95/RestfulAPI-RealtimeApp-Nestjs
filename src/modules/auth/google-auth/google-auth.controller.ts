import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('google-auth')
export class GoogleAuthController {
    constructor(private readonly googleAuthService: GoogleAuthService) { }

    // Implement Google login endpoints
    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth() { }

    // @Get('google/callback')
    // @UseGuards(AuthGuard('google'))
    // googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    //     const user = req.user;
    //     // Handle user data, such as creating or updating the user in your database
    //     // Redirect or respond as needed
    //     res.send(user);
    // }
}