import {
  Agendamento,
  BuscarAgendaDoProfissionalPorDia,
  BuscarAgendamentoCliente,
  CriarAgendamento,
  ExcluirAgendamento,
  // ObterHorariosOcupados,
  Usuario,
} from '@barber/core';
import { AgendamentoPrisma } from './agendamento.prisma';
import {
  Body,
  Controller,
  Delete,
  Get,
  // HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { UsuarioLogado } from 'src/usuario/usuario.decorator';

@Controller('agendamentos')
export class AgendamentoController {
  constructor(private readonly repo: AgendamentoPrisma) {}

  @Post()
  async criar(@Body() dados: Agendamento, @UsuarioLogado() usuario: Usuario) {
    const agendamento: Agendamento = { ...dados, data: new Date(dados.data) };
    const casoDeUso = new CriarAgendamento(this.repo);
    await casoDeUso.executar({ agendamento, usuario });
  }

  @Get()
  buscarPorCliente(@UsuarioLogado() usuario: Usuario) {
    const casoDeUso = new BuscarAgendamentoCliente(this.repo);
    return casoDeUso.executar(usuario);
  }

  @Get(':profissional/:data')
  buscarOcupacaoPorProfissionalEData(
    @Param('profissional') profissional: string,
    @Param('data') dataParam: string,
  ) {
    const casoDeUso = new BuscarAgendaDoProfissionalPorDia(this.repo);
    return casoDeUso.executar({
      profissional: +profissional,
      data: new Date(dataParam),
    });
  }

  @Delete(':id')
  async excluir(
    @Param('id') id: string,
    @UsuarioLogado() usuarioLogado: Usuario,
  ) {
    const casoDeUso = new ExcluirAgendamento(this.repo);
    await casoDeUso.executar({
      usuario: usuarioLogado,
      id: +id,
    });
  }
}
