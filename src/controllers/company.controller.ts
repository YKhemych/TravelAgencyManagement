import { BadRequestException, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import {ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags} from '@nestjs/swagger';
import { UserId } from '../config/user.decorator';
import { AuthenticateGuard } from '../guards/auth.guard';
import { CompanyDataDto } from '../dto/company.dto';
import { Body } from '@nestjs/common';
import { CompanyService } from '../services/company.service';
import { InstanceAlreadyExist, ModelWithFieldAlreadyExist } from '../classes/errors.class';
import { errorMessages } from '../enums/errorMessages.enum';

@ApiBearerAuth()
@UseGuards(AuthenticateGuard)
@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post('')
  @ApiCreatedResponse({
    type: CompanyDataDto,
    description: 'Company successfully created'
  })
  async createCompany(
    @Body() companyDataDto: CompanyDataDto,
    @UserId() userId: number
  ): Promise<CompanyDataDto> {
    try {
      const company = await this.companyService.createCompany(companyDataDto.data, userId);

      return { data: company };
    } catch (err) {
      switch (err.constructor) {
        case InstanceAlreadyExist:
          throw new BadRequestException(errorMessages.INSTANCE_ALREADY_EXIST);
        case ModelWithFieldAlreadyExist:
          throw new BadRequestException(errorMessages.MODEL_WITH_FIELD_ALREADY_EXIST);
        default:
          throw err;
      }
    }
  }

  @Get()
  @ApiOkResponse({
    type: CompanyDataDto,
    description: 'Get company information'
  })
  async getUser(@UserId() userId: number): Promise<CompanyDataDto> {
    const company = await this.companyService.getCompany(userId);

    return { data: company };
  }
}
