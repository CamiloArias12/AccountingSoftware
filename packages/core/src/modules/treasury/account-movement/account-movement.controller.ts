import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { AccountMovementDownloadService } from './account-movement-download.service';
import { BookAuxiliary } from './dto/types';
import { AccountMovementService } from './account-movement.service';

@Controller('accountMovement')
export class AccountMovementController {
  constructor(
    private readonly accountMovementDownloadService: AccountMovementDownloadService,
    private readonly accountMovementService: AccountMovementService,

  ) {}
  @Get('/download-pdf/:id')
  async downloadCreditPdf(@Param('id') id: string, @Res() res: Response) {
    const buffer =
      await this.accountMovementDownloadService.downloadCreditPdf(id);
    const stream =
      this.accountMovementDownloadService.getReadableStream(buffer);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Length': buffer.length,
    });
    stream.pipe(res);
  }

  @Post('/download-book/')
  async downloadBook(@Body() data:BookAuxiliary) {
     return await  this.accountMovementService.generateBook({endDate:new Date(data.endDate),startDate:new Date(data.startDate),user:data.user,company:data.company})
   
  }
}
