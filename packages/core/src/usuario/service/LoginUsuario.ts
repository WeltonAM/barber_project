import Usuario from "../model/Usuario";
import RepositorioUsuario from "../provider/RepositorioUsuario";
import ProvedorCriptografia from "../provider/ProvedorCriptografia";
import CasoDeUso from "../../shared/CasoDeUso";

export default class LoginUsuario implements CasoDeUso<string, Usuario> {
  constructor(
    private readonly repo: RepositorioUsuario,
    private readonly cripto: ProvedorCriptografia
  ) {}

  async executar(email: string, senha: string): Promise<Usuario | null> {
    const usuario = await this.repo.buscarPorEmail(email);
    if (!usuario) throw new Error("Usuário não encontrado");

    const senhaCorreta = await this.cripto.comparar(senha, usuario.senha);
    if (!senhaCorreta) throw new Error("Senha incorreta");

    delete usuario.senha;
    return usuario;
  }
}
