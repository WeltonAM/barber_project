import { Controller, Get } from '@nestjs/common';
import { ProfissionalPrisma } from './profissional.prisma';
import { BuscarProfissionais } from '@barber/core';

@Controller('profissionais')
export class ProfissionalController {
  constructor(private readonly repo: ProfissionalPrisma) {}

  @Get()
  buscarTodos() {
    const casoDeUso = new BuscarProfissionais(this.repo);

    return casoDeUso.executar();
  }
}
