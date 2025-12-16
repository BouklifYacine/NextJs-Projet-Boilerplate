"use client"

import { DataTable } from "@/components/DataTable"
import { columns } from "./columns"
import { demoData } from "./data"

export default function DataTableDemoPage() {
    return (
        <div className="container mx-auto py-10">


            <div className="space-y-8">
                {/* Exemple complet */}
                <div className="space-y-4">


                    <DataTable
                        columns={columns}
                        data={demoData}
                        enableRowSelection={true}
                        enableSorting={true}
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
