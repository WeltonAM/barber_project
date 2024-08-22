import { Module } from '@nestjs/common';
import { ServicoController } from './servico.controller';
import { DbModule } from 'src/db/db.module';
import { ServicoPrisma } from './servico.prisma';

@Module({
  imports: [DbModule],
  controllers: [ServicoController],
  providers: [ServicoPrisma],
})
export class ServicoModule {}
