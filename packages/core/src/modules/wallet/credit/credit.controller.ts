import {
  Controller,
  Get,
  Header,
  Param,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreditDownloadService } from './credit-download.service';
import { Response } from 'express';

@Controller('credit')
export class CreditController {
  constructor(private readonly creditDownloadService: CreditDownloadService) {}
  @Get('/download-pdf/:id')
  async downloadCreditPdf(@Param('id') id: number, @Res() res: Response) {
    const buffer = await this.creditDownloadService.downloadCreditPdf(id);
    const stream = this.creditDownloadService.getReadableStream(buffer);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Length': buffer.length,
    });
    stream.pipe(res);
  }

  @Get('/download-xlsx/:id')
  async downloadCreditXlsx(@Param('id') id: number, @Res() res: Response) {
    const buffer = await this.creditDownloadService.downloadCreditXlsx(id);
    const stream = this.creditDownloadService.getReadableStream(buffer);
    res.set({
      'Content-Type': 'application/xlsx',
      'Content-Length': buffer.length,
    });
    stream.pipe(res);
  }
}
