export default interface CasoDeUso<E, S> {
  executar(entrada: E, saida?: any): Promise<S | void>;
}
