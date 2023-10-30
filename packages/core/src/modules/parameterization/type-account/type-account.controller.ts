import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { TypeAccountService } from './type-account.service';

@Controller('type-account')
export class TypeAccountController {

    constructor(private readonly typeAccountService: TypeAccountService) { }
   @Post('upload')
   @UseInterceptors(
   FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          callback(null, file.originalname);
        },
      }),
    }),
   )

  async  uploadFile(@UploadedFile() file:Express.Multer.File){
     console.log(file)
     return  await this.typeAccountService.loadTypeAccounts('./uploads',file.originalname) 
   }
   
}
