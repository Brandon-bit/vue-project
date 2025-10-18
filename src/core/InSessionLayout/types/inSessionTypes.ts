export type DashboardType = {
    name: string,
    icon: string,
    url: string
}

export type DashboardResponseType = {
    nombre: string,
    icono: string,
    url: string
}

export type ModuleType = {
    name: string,
    icon: string,
    sections: SectionType[]
}

export type SectionType = {
    name: string,
    icon: string,
    open: boolean,
    views: ViewType[]
}

export type ViewType = {
    name: string,
    url: string
}

export type ModuleResponseType = {
    nombre: string,
    icono: string,
    secciones: SectionResponseType[]
}

export type SectionResponseType = {
    nombre: string,
    icono: string,
    vistas: ViewResponseType[]
}

export type ViewResponseType = {
    nombre: string,
    url: string
}

