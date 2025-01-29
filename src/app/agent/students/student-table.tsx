"use client";

import {
  TableBody,
  TableCell,
  TableColumnHeader,
  TableHead,
  TableHeader,
  TableHeaderGroup,
  TableProvider,
  TableRow,
} from "./data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import type { Student } from "@prisma/client";

const StudentTable = ({ studentData }: { studentData: Student[] }) => {
  const columns: ColumnDef<(typeof studentData)[number]>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="relative">
            <Image
              src={row.original.image ?? ""}
              alt={row.original.firstName}
              width={24}
              height={24}
              unoptimized
              className="h-6 w-6 rounded-full"
            />
          </div>
          <div>
            <span className="font-medium">
              {row.original.firstName} {row.original.lastName}
            </span>
            <div className="flex items-center gap-1 text-muted-foreground text-xs">
              <span>Nationality: {row.original.country}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => (
        <Badge
          variant={row.original.status ? "success" : "destructive"}
          className="text-xs"
        >
          {row.original.status ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Email" />
      ),
      cell: ({ row }) => row.original.email,
    },
    {
      id: "phone",
      accessorFn: (row) => row.phone,
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Phone" />
      ),
      cell: ({ row }) => row.original.phone,
    },
    {
      id: "actions",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Actions" />
      ),
      cell: ({ row }) => (
        <Link href={`/agent/students/${row.original.studentId}`}>
          <Badge variant="success" size={"small"}>
            View Student <ChevronRightIcon className="w-5 h-5" />
          </Badge>
        </Link>
      ),
    },
  ];

  return (
    <TableProvider
      columns={columns}
      data={studentData}
      className="border rounded-lg"
    >
      <TableHeader>
        {({ headerGroup }) => (
          <TableHeaderGroup key={headerGroup.id} headerGroup={headerGroup}>
            {({ header }) => <TableHead key={header.id} header={header} />}
          </TableHeaderGroup>
        )}
      </TableHeader>
      <TableBody>
        {({ row }) => (
          <TableRow key={row.id} row={row}>
            {({ cell }) => <TableCell key={cell.id} cell={cell} />}
          </TableRow>
        )}
      </TableBody>
    </TableProvider>
  );
};

export default StudentTable;
