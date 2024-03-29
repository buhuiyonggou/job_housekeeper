// "use client";

// import React from 'react'
// import { Status } from '@prisma/client'
// import { useRouter, useSearchParams } from 'next/navigation';
// import Selector from '@/app/components/Selector';

// const ApplicationStatusFilter = () => {

//     const statusOptions: { label: string; value?: Status }[] = [
//         { label: "All" },
//         { label: "Applied", value: "Applied" },
//         { label: "Interview", value: "Interview" },
//         { label: "Offer", value: "Offer" },
//         { label: "Rejected", value: "Rejected" },
//     ];
    
//     const router = useRouter();
//     const searchParams = useSearchParams();

    
//     return (
//         <Selector type={''} items={undefined} defaultValue={searchParams.get("status") || ""} onValueChange={function (value: string): void {
//             throw new Error('Function not implemented.');
//         } }></Selector>
//         // <Select.Root
//         //   defaultValue={searchParams.get("status") || ""}
//         //   onValueChange={(status) => {
//         //     // use searchParams to get the current query params
//         //     // use URLSearchParams to update the url
//         //     const params = new URLSearchParams();
//         //     if (status) params.append("status", status);
    
//         //     if (searchParams.get("orderBy"))
//         //       params.append("orderBy", searchParams.get("orderBy")!);
    
//         //     const query = params.size ? "?" + params.toString() : "";
    
//         //     router.push(`/issues/list/${query}`);
//         //   }}
//         // >
//         //   <Select.Trigger />
//         //   <Select.Content>
//         //     <Select.Group>
//         //       {statusOptions.map((option) => (
//         //         <Select.Item key={option.label} value={option.value || ""}>
//         //           {option.label}
//         //         </Select.Item>
//         //       ))}
//         //     </Select.Group>
//         //   </Select.Content>
//         // </Select.Root>
//       );
//     };

// export default ApplicationStatusFilter