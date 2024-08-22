import { BuscarServicos } from '@barber/core';
import { Controller, Get } from '@nestjs/common';
import { ServicoPrisma } from './servico.prisma';

@Controller('servicos')
export class ServicoController {
  constructor(private readonly repo: ServicoPrisma) {}

  @Get()
  buscarTodos() {
    const casoDeUso = new BuscarServicos(this.repo);
    return casoDeUso.executar();
  }
}
