import CasoDeUso from "../../shared/CasoDeUso";
import { Usuario } from "../../usuario";
import Agendamento from "../model/Agendamento";
import RepositorioAgendamento from "../provider/RepositorioAgendamento";

type NovoAgendamentoParams = {
  agendamento: Agendamento;
  usuario: Usuario;
};

export default class CriarAgendamento
  implements CasoDeUso<NovoAgendamentoParams, void>
{
  constructor(private readonly repo: RepositorioAgendamento) {}

  async executar(entrada: NovoAgendamentoParams): Promise<void> {
    const { agendamento, usuario } = entrada;

    if (usuario.id !== agendamento.usuario.id) {
      throw new Error("Não é possível fazer agendamento para outro usuário");
    }

    await this.repo.criar(agendamento);
  }
}
