import CasoDeUso from "../../shared/CasoDeUso";
import { Usuario } from "../../usuario";
import Agendamento from "../model/Agendamento";
import RepositorioAgendamento from "../provider/RepositorioAgendamento";

export default class BuscarAgendamentoCliente
  implements CasoDeUso<Usuario, Agendamento[]>
{
  constructor(private readonly repo: RepositorioAgendamento) {}

  async executar(usuario: Usuario): Promise<Agendamento[]> {
    const { email } = usuario;

    return this.repo.buscarPorEmail(email);
  }
}
