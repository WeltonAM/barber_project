import { useState } from 'react';
import { cn } from '@/lib/utils';
import { IconX } from '@tabler/icons-react';
import { AgendaUtils, DataUtils } from '@barber/core';
import useAgendamento from '@/data/hooks/useAgendamento';

export interface HorariosInputProps {
    data: Date;
    qtdeHorarios: number;
    dataMudou(data: Date): void;
}

export default function HorariosInput(props: HorariosInputProps) {
    const [horaHover, setHoraHover] = useState<string | null>(null);
    const { horariosOcupados } = useAgendamento();
    const { manha, tardeNoite } = AgendaUtils.horariosDoDia();

    const horaSelecionada = props.data.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
    });

    function isHorarioPassado(horario: string): boolean {
        const [hora, minutos] = horario.split(':').map(Number);
        const agora = new Date();
        const horarioDate = new Date(props.data);

        horarioDate.setHours(hora, minutos, 0);

        return horarioDate < agora;
    }

    function obterPeriodo(horario: string | null, qtde: number) {
        if (!horario) return [];
        const horarios = manha.includes(horario) ? manha : tardeNoite;
        const indice = horarios.findIndex((h) => horario == h);
        return horarios.slice(indice, indice + qtde);
    }

    function renderizarHorario(horario: string) {
        const periodo = obterPeriodo(horaHover, props.qtdeHorarios);
        const temHorarios = periodo.length === props.qtdeHorarios;
        const destacarHora = temHorarios && periodo.includes(horario);
        const periodoSelecionado = obterPeriodo(horaSelecionada, props.qtdeHorarios);
        const selecionado =
            periodoSelecionado.length === props.qtdeHorarios && periodoSelecionado.includes(horario);
        const naoSelecionavel = !temHorarios && periodo.includes(horario);
        const periodoBloqueado =
            periodo.includes(horario) &&
            periodo.some((h) => Array.isArray(horariosOcupados) && horariosOcupados.includes(h));
        const horarioPassado = isHorarioPassado(horario);
        const ocupado =
            (Array.isArray(horariosOcupados) && horariosOcupados.includes(horario)) || horarioPassado;

        return (
            <div
                key={horario}
                className={cn(
                    'flex justify-center items-center cursor-pointer h-8 border border-zinc-800 rounded select-none',
                    {
                        'text-white bg-green-500': selecionado,
                        'bg-yellow-400': destacarHora,
                        'bg-red-500 hover:cursor-not-allowed': naoSelecionavel || periodoBloqueado,
                        'cursor-not-allowed bg-zinc-800': ocupado,
                    }
                )}
                onMouseEnter={() => setHoraHover(horario)}
                onMouseLeave={() => setHoraHover(null)}
                onClick={() => {
                    if (naoSelecionavel || horarioPassado) return;
                    if (ocupado || periodoBloqueado) return;
                    props.dataMudou(DataUtils.aplicarHorario(props.data, horario));
                }}
            >
                <span
                    className={cn('text-sm max-sm:text-xs text-zinc-400', {
                        'text-black font-semibold': destacarHora,
                        'text-white font-semibold': selecionado,
                        'text-zinc-400 font-semibold': ocupado,
                    })}
                >
                    {naoSelecionavel || periodoBloqueado || ocupado ? (
                        <IconX size={18} className="text-white" />
                    ) : (
                        horario
                    )}
                </span>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-5">
            <span className="text-sm uppercase text-zinc-400">Horários Disponíveis</span>
            <div className="flex flex-col gap-3 select-none">
                <span className="text-xs uppercase text-zinc-400">Manhã</span>
                <div className="grid grid-cols-8 gap-1">{manha.map(renderizarHorario)}</div>

                <span className="text-xs uppercase text-zinc-400">Tarde & Noite</span>
                <div className="grid grid-cols-8 gap-1">{tardeNoite.map(renderizarHorario)}</div>
            </div>
        </div>
    );
}
