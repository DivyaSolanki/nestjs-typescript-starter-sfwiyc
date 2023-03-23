import { Controller, Get, Query, UseGuards, BadRequestException } from '@nestjs/common';
import { AppService } from './app.service';
import { JWTAuthGuard } from './jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JWTAuthGuard)
  @Get('userclaims')
  getUserClaims(@Query() query: any): Array<Object> {
    const userId = query.userId;
    if(userId){
      return this.appService.getUserClaims();
    } else {
      throw new BadRequestException();
    }
  }

  @UseGuards(JWTAuthGuard)
  @Get('claimdocuments')
  getClaimDocuments(@Query() query: any): Array<Object> {
    const claimNumber = query.claimNumber;
    if(claimNumber){
      return this.appService.getClaimDocuments();
    } else {
      throw new BadRequestException();
    }
  }
}

/**
 * Pending Work
 * Set http Status BadRequest 400 in case of empty or undefined query
 * Add Authentication 
 */