"use client"

import { DataTable } from "@/components/DataTable"
import { columns } from "./columns"
import { demoData } from "./data"

export default function DataTableDemoPage() {
    return (
        <div className="container mx-auto py-10">
            <div className="space-y-12">

                {/* Exemple basique - juste columns et data */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Table Basique</h2>
                    <p className="text-muted-foreground">
                        Seulement columns et data - pas de toolbar ni pagination
                    </p>
                    <DataTable
                        columns={columns}
                        data={demoData.slice(0, 5)}
                    />
                </div>

                {/* Exemple avec toutes les fonctionnalités */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Table Complète</h2>
                    <p className="text-muted-foreground">
                        Avec recherche, tri, pagination et sélection
                    </p>
                    <DataTable
                        columns={columns}
                        data={demoData}
                        enableRowSelection={true}
                        enableFiltering={true}
                        pagination={true}
                        pageSize={5}
                        searchPlaceholder="Rechercher un utilisateur..."
                        onRowSelectionChange={(selectedRows) => {
                            console.log("Lignes sélectionnées:", selectedRows)
                        }}
                    />
                </div>

            </div>
        </div>
    )
}
