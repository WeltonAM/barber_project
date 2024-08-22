import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AgendamentoController } from './agendamento.controller';
import { DbModule } from 'src/db/db.module';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { UsuarioMiddleware } from 'src/usuario/usuario.middleware';
import { AgendamentoPrisma } from './agendamento.prisma';

@Module({
  imports: [DbModule, UsuarioModule],
  controllers: [AgendamentoController],
  providers: [AgendamentoPrisma],
})
export class AgendamentoModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UsuarioMiddleware).forRoutes(AgendamentoController);
  }
}
