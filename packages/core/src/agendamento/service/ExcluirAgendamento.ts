import CasoDeUso from "../../shared/CasoDeUso";
import { Usuario } from "../../usuario";
import RepositorioAgendamento from "../provider/RepositorioAgendamento";

type Entrada = {
  usuario: Usuario;
  id: number;
};

export default class ExcluirAgendamento implements CasoDeUso<Entrada, void> {
  constructor(private readonly repo: RepositorioAgendamento) {}

  async executar(entrada: Entrada, saida?: any): Promise<void> {
    const { usuario, id } = entrada;
    const { email } = usuario;

    const agendamento = await this.repo.buscarPorId(id);

    if (!agendamento) {
      throw new Error("Agendamento não encontrado");
    }

    const cliente = agendamento.usuario.email === email;
    const profissional = usuario.barbeiro;

    if (!cliente && !profissional) {
      throw new Error("Não é possível excluir agendamento de outro usuário");
    }

    await this.repo.excluir(agendamento.id);
  }
}
