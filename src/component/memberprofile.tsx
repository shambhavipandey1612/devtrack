import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type TeamMember={
    id: number;
  name: string;
  role: string;
  email: string;
  status: "Active" | "Away";
};
function MemberProfile(){
    const { id }=useParams();
    const navigate = useNavigate();
    const[members]= useState<TeamMember[]>(()=>{
        const savedMembers= localStorage.getItem("teamMembers");
        return savedMembers ? JSON.parse(savedMembers):[];
    });
    const member = members.find((item)=> item.id=== Number(id));
    if(!member){
        return (
        <div className="rounded-xl bg-white p-8 text-center shadow-sm">
            <h2 className="text-xl font-bold text-slate-800">Member Not Found</h2>
            <button onClick={()=>navigate("/team")}
            className="mt-4 rounded-lg bg-indigo-600 px-5 py-2 text-white">Back to Team</button>
        </div>
        );
    }
    return (
        <div className="space-y-6">
         <button onClick={()=>navigate("/team")}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800"> ← Back to Team</button>   
         <div className="rounded-xl bg-white p-8 shadow-sm">
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-3xl font-bold text-indigo-600">
            {member.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              {member.name}
            </h2>
            <p className="mt-1 text-slate-500">{member.role}</p>
          </div>
        </div>

        <div className="mt-8 space-y-5 border-t border-slate-100 pt-6">
          <div>
            <p className="text-sm text-slate-500">Email Address</p>
            <p className="mt-1 font-medium text-slate-800">
              {member.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Status</p>
            <span
              className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium ${
                member.status === "Active"
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-amber-50 text-amber-600"
              }`}
            >
              {member.status}
            </span>
          </div>

          <div>
            <p className="text-sm text-slate-500">Member ID</p>
            <p className="mt-1 font-medium text-slate-800">{member.id}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberProfile;
    
