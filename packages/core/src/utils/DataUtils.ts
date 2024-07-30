export default class DataUtils {
  static hoje() {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    return hoje;
  }

  static aplicarHorario(data: Date, horario: string): Date {
    const novaData = new Date(data);
    const partes = horario.split(":");
    novaData.setHours(parseInt(partes[0]!), parseInt(partes[1]!));
    return novaData;
  }

  static formatarData(data: Date): string {
    return data.toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  static formatarDataEHora(data: Date): string {
    return data.toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  }
}
