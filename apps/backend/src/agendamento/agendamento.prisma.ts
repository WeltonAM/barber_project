import { Injectable } from '@nestjs/common';
import { Agendamento, RepositorioAgendamento } from '@barber/core';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class AgendamentoPrisma implements RepositorioAgendamento {
  constructor(private readonly prismaService: PrismaService) {}

  async criar(agendamento: Agendamento): Promise<void> {
    await this.prismaService.agendamento.create({
      data: {
        data: agendamento.data,
        usuario: { connect: { id: agendamento.usuario.id } },
        profissional: { connect: { id: agendamento.profissional.id } },
        servicos: {
          connect: agendamento.servicos.map((servico) => ({ id: servico.id })),
        },
      },
    });
  }

  async buscarPorId(id: number): Promise<Agendamento> {
    return this.prismaService.agendamento.findUnique({
      where: {
        id: id,
      },
      include: {
        servicos: {
          select: { id: true, nome: true, preco: true, qtdeSlots: true },
        },
        profissional: {
          select: { id: true, nome: true },
        },
        usuario: {
          select: { id: true, email: true, nome: true },
        },
      },
    });
  }

  async buscarPorEmail(email: string): Promise<Agendamento[]> {
    const agendamentos = await this.prismaService.agendamento.findMany({
      where: {
        usuario: {
          email: email,
        },
        data: {
          gte: new Date(),
        },
      },
      include: {
        servicos: {
          select: { id: true, nome: true, preco: true, qtdeSlots: true },
        },
        profissional: {
          select: { id: true, nome: true },
        },
        usuario: {
          select: { id: true, email: true, nome: true },
        },
      },
      orderBy: {
        data: 'desc',
      },
    });

    return agendamentos.map((agendamento) => {
      delete agendamento.usuarioId;
      delete agendamento.profissionalId;
      return agendamento;
    });
  }

  async buscarPorProfissionalEData(
    profissional: number,
    data: Date,
  ): Promise<Agendamento[]> {
    const ano = data.getFullYear();
    const mes = data.getUTCMonth();
    const dia = data.getUTCDate();

    const inicioDoDia = new Date(ano, mes, dia, 0, 0, 0);
    const fimDoDia = new Date(ano, mes, dia, 23, 59, 59);

    const resultado: any = await this.prismaService.agendamento.findMany({
      where: {
        profissionalId: profissional,
        data: {
          gte: inicioDoDia,
          lte: fimDoDia,
        },
      },
      include: {
        servicos: {
          select: { id: true, nome: true, preco: true, qtdeSlots: true },
        },
        profissional: {
          select: { id: true, nome: true },
        },
        usuario: {
          select: { id: true, email: true, nome: true },
        },
      },
    });

    return resultado;
  }

  async excluir(id: number): Promise<void> {
    await this.prismaService.agendamento.delete({
      where: {
        id: id,
      },
      include: {
        servicos: true,
      },
    });
  }
}
