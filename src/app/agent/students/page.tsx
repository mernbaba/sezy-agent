import prisma from "@/lib/prisma";
import { SidebarTrigger } from "@/components/ui/sidebar";
import StudentTable from "./student-table";
import { cookies } from "next/headers";
import { getCookie } from "cookies-next";
import { Agent } from "@prisma/client";


export const revalidate = 3600;
export const dynamicParams = true;


const Page = async () => {
  const agent = (await getCookie("sezy", { cookies })) as Agent | undefined;

  const students = await prisma.student.findMany({
    where: {
      agentId: {
        equals: agent?.agentId,
      },
    },
  });

  console.log(students);

  return (
    <div>
      <div className="sticky top-0 z-10 flex gap-4 items-center bg-white p-3">
        <SidebarTrigger className="aspect-square p-2 hover:bg-stone-100" />
        <h1 className="text-xl">All Students</h1>
      </div>

      <div className="bg-white m-4 overflow-auto rounded-lg">
        <StudentTable studentData={students} />
      </div>
    </div>
  );
};

export default Page;
