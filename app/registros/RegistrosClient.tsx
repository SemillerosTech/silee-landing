"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { format, isWithinInterval, parseISO, startOfDay, endOfDay } from "date-fns";
import { es } from "date-fns/locale";
import { 
  Search, 
  X, 
  Calendar as CalendarIcon, 
  Filter, 
  ArrowUpDown, 
  ChevronUp, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type Registro = {
  id: number;
  nombre: string;
  correo: string;
  telefono: string | null;
  mensaje: string | null;
  origen: string | null;
  como_te_describes: string | null;
  creado_en: string;
};

interface RegistrosClientProps {
  initialRegistros: Registro[];
}

export function RegistrosClient({ initialRegistros }: RegistrosClientProps) {
  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [userType, setUserType] = useState("all");
  
  // Sort State
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Registro;
    direction: "asc" | "desc";
  }>({
    key: "creado_en",
    direction: "desc",
  });
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  // Filter Logic
  const filteredRegistros = useMemo(() => {
    return initialRegistros.filter((r) => {
      // Search filter
      const matchesSearch =
        r.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.correo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (r.mensaje?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);

      // User type filter
      const matchesUserType =
        userType === "all" || r.como_te_describes === userType;

      // Date range filter
      let matchesDate = true;
      if (startDate || endDate) {
        const registroDate = parseISO(r.creado_en);
        const start = startDate ? startOfDay(parseISO(startDate)) : null;
        const end = endDate ? endOfDay(parseISO(endDate)) : null;

        if (start && end) {
          matchesDate = isWithinInterval(registroDate, { start, end });
        } else if (start) {
          matchesDate = registroDate >= start;
        } else if (end) {
          matchesDate = registroDate <= end;
        }
      }

      return matchesSearch && matchesUserType && matchesDate;
    });
  }, [initialRegistros, searchTerm, userType, startDate, endDate]);

  // Sort Logic
  const sortedRegistros = useMemo(() => {
    return [...filteredRegistros].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue === null) return 1;
      if (bValue === null) return -1;

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredRegistros, sortConfig]);

  // Pagination Logic
  const totalPages = Math.ceil(sortedRegistros.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedRegistros = sortedRegistros.slice(startIndex, startIndex + pageSize);

  const handleSort = (key: keyof Registro) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      const defaultDirection = key === "creado_en" || key === "id" ? "desc" : "asc";
      return { key, direction: defaultDirection };
    });
    setCurrentPage(1); // Reset to first page on sort
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStartDate("");
    setEndDate("");
    setUserType("all");
    setSortConfig({ key: "creado_en", direction: "desc" });
    setCurrentPage(1);
  };

  const hasFilters = searchTerm !== "" || startDate !== "" || endDate !== "" || userType !== "all";

  const FilterInputs = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className={isMobile ? "space-y-6" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end"}>
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Buscar
        </label>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Nombre, correo o mensaje..."
            className="pl-9 bg-background focus:ring-primary/20"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Desde
        </label>
        <Input
          type="date"
          className="bg-background focus:ring-primary/20"
          value={startDate}
          onChange={(e) => {
            setStartDate(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Hasta
        </label>
        <Input
          type="date"
          className="bg-background focus:ring-primary/20"
          value={endDate}
          onChange={(e) => {
            setEndDate(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Perfil
        </label>
        <div className="flex gap-2">
          <Select value={userType} onValueChange={(v) => {
            setUserType(v);
            setCurrentPage(1);
          }}>
            <SelectTrigger className="bg-background focus:ring-primary/20">
              <SelectValue placeholder="Tipo de usuario" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="Estudiante">Estudiante</SelectItem>
              <SelectItem value="Comprador directo">Comprador directo</SelectItem>
            </SelectContent>
          </Select>
          {!isMobile && hasFilters && (
            <Button
              variant="ghost"
              size="icon"
              onClick={clearFilters}
              title="Limpiar filtros"
              className="shrink-0 hover:bg-background/80"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      
      {isMobile && hasFilters && (
        <Button 
          variant="outline" 
          className="w-full mt-4 text-destructive border-destructive/20 hover:bg-destructive/5"
          onClick={clearFilters}
        >
          <X className="mr-2 h-4 w-4" />
          Limpiar todos los filtros
        </Button>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Mobile Filters Toggle */}
      <div className="flex lg:hidden items-center gap-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex-1 shadow-sm border-primary/20">
              <Filter className="mr-2 h-4 w-4 text-primary" />
              Filtrar registros
              {hasFilters && (
                <span className="ml-2 bg-primary text-primary-foreground text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                  !
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl border-t-2">
            <SheetHeader className="mb-6">
              <SheetTitle className="text-2xl">Filtros Avanzados</SheetTitle>
              <SheetDescription>
                Ajusta los criterios para encontrar registros específicos.
              </SheetDescription>
            </SheetHeader>
            <div className="px-1">
              <FilterInputs isMobile />
            </div>
          </SheetContent>
        </Sheet>
        
        {hasFilters && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={clearFilters}
            className="text-destructive h-10 w-10 shrink-0"
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Desktop Filters Grid */}
      <Card className="hidden lg:block border-none shadow-sm bg-muted/30">
        <CardContent className="p-4">
          <FilterInputs />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead onClick={() => handleSort("id")} className="w-[80px] cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-2">
                    ID {sortConfig.key === "id" ? (sortConfig.direction === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />) : <ArrowUpDown className="h-3 w-3 opacity-30" />}
                  </div>
                </TableHead>
                <TableHead onClick={() => handleSort("nombre")} className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-2">
                    Nombre {sortConfig.key === "nombre" ? (sortConfig.direction === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />) : <ArrowUpDown className="h-3 w-3 opacity-30" />}
                  </div>
                </TableHead>
                <TableHead onClick={() => handleSort("correo")} className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-2">
                    Correo {sortConfig.key === "correo" ? (sortConfig.direction === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />) : <ArrowUpDown className="h-3 w-3 opacity-30" />}
                  </div>
                </TableHead>
                <TableHead onClick={() => handleSort("telefono")} className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-2">
                    Teléfono {sortConfig.key === "telefono" ? (sortConfig.direction === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />) : <ArrowUpDown className="h-3 w-3 opacity-30" />}
                  </div>
                </TableHead>
                <TableHead onClick={() => handleSort("mensaje")} className="max-w-[300px] cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-2">
                    Mensaje {sortConfig.key === "mensaje" ? (sortConfig.direction === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />) : <ArrowUpDown className="h-3 w-3 opacity-30" />}
                  </div>
                </TableHead>
                <TableHead onClick={() => handleSort("origen")} className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-2">
                    Origen {sortConfig.key === "origen" ? (sortConfig.direction === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />) : <ArrowUpDown className="h-3 w-3 opacity-30" />}
                  </div>
                </TableHead>
                <TableHead onClick={() => handleSort("como_te_describes")} className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-2">
                    Perfil {sortConfig.key === "como_te_describes" ? (sortConfig.direction === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />) : <ArrowUpDown className="h-3 w-3 opacity-30" />}
                  </div>
                </TableHead>
                <TableHead onClick={() => handleSort("creado_en")} className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-2">
                    Fecha {sortConfig.key === "creado_en" ? (sortConfig.direction === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />) : <ArrowUpDown className="h-3 w-3 opacity-30" />}
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedRegistros.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.id}</TableCell>
                  <TableCell className="whitespace-nowrap font-medium">{r.nombre}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    <a 
                      href={`mailto:${r.correo}`} 
                      className="text-primary hover:underline font-medium transition-colors"
                      title={`Enviar correo a ${r.correo}`}
                    >
                      {r.correo}
                    </a>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{r.telefono ?? "—"}</TableCell>
                  <TableCell className="max-w-[300px] truncate" title={r.mensaje ?? ""}>
                    {r.mensaje ?? "—"}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{r.origen ?? "—"}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                      r.como_te_describes === 'Estudiante' 
                        ? 'bg-blue-100 text-blue-700' 
                        : r.como_te_describes === 'Comprador directo'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {r.como_te_describes ?? "—"}
                    </span>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground py-4">
                    <div className="flex flex-col">
                      <span className="text-foreground font-medium capitalize">
                        {format(parseISO(r.creado_en), "d 'de' MMMM", { locale: es })}
                      </span>
                      <span className="text-[11px] uppercase tracking-tighter opacity-70">
                        {format(parseISO(r.creado_en), "yyyy • HH:mm 'hrs'", { locale: es })}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {paginatedRegistros.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Filter className="h-12 w-12 text-muted-foreground/20 mb-4" />
              <p className="text-lg font-medium">No se encontraron registros</p>
              <p className="text-sm text-muted-foreground">
                Prueba ajustando los filtros o el término de búsqueda.
              </p>
            </div>
          ) : null}
        </CardContent>
      </Card>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-background p-2 rounded-lg border shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-4 order-2 md:order-1 px-2">
          <div className="text-sm text-muted-foreground font-medium">
            Mostrando <span className="text-foreground">{filteredRegistros.length > 0 ? startIndex + 1 : 0}</span>-
            <span className="text-foreground">{Math.min(startIndex + pageSize, filteredRegistros.length)}</span> de 
            <span className="text-foreground"> {filteredRegistros.length}</span> registros
            {filteredRegistros.length !== initialRegistros.length && (
              <span> (filtro de {initialRegistros.length} totales)</span>
            )}
          </div>

          <div className="hidden md:block h-4 w-[1px] bg-border" />

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            Ver
            <Select value={pageSize.toString()} onValueChange={(v) => {
              setPageSize(Number(v));
              setCurrentPage(1);
            }}>
              <SelectTrigger className="h-8 w-[70px] bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="15">15</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {totalPages > 1 && (
          <div className="order-1 md:order-2">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="gap-1 pl-2.5"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Anterior</span>
                  </Button>
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(page => {
                    if (totalPages <= 7) return true;
                    return page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1;
                  })
                  .map((page, index, array) => (
                    <React.Fragment key={page}>
                      {index > 0 && array[index - 1] !== page - 1 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}
                      <PaginationItem>
                        <Button
                          variant={currentPage === page ? "outline" : "ghost"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className={`w-9 h-9 ${currentPage === page ? "bg-muted font-bold" : ""}`}
                        >
                          {page}
                        </Button>
                      </PaginationItem>
                    </React.Fragment>
                  ))}

                <PaginationItem>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="gap-1 pr-2.5"
                  >
                    <span>Siguiente</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
}
