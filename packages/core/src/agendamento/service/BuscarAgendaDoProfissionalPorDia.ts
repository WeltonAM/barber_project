import { RepositorioAgendamento } from "../../../dist";
import Agendamento from "../model/Agendamento";
import CasoDeUso from "../../shared/CasoDeUso";

type Entrada = {
  profissional: number;
  data: Date;
};

export default class BuscarAgendaDoProfissionalPorDia
  implements CasoDeUso<Entrada, Agendamento[]>
{
  constructor(private readonly repo: RepositorioAgendamento) {}
  async executar({ profissional, data }: Entrada): Promise<Agendamento[]> {
    return this.repo.buscarPorProfissionalEData(profissional, data);
  }
}
