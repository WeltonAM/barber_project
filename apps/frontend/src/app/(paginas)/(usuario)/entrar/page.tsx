'use client'
import { Suspense } from 'react'
import FormUsuario from '@/components/usuario/FormUsuario'
import Processando from '@/components/shared/Processando'

export default function Page() {
    return (
        <Suspense fallback={<Processando />}>
            <FormUsuario />
        </Suspense>
    )
}
